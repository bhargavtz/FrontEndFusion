import { AIError, type AIProvider } from "../types";

/**
 * Anthropic provider using the official SDK, loaded lazily so it only ships
 * to learners who open the assistant and send a message.
 *
 * Browser use requires `dangerouslyAllowBrowser`: the learner's own API key is
 * sent straight from their browser to Anthropic. It is held in sessionStorage
 * by default and never goes through this site's servers (there are none).
 */
export const anthropicProvider: AIProvider = {
  id: "anthropic",
  label: "Anthropic Claude",
  description: "Uses your own Anthropic API key, called directly from your browser.",
  defaultModel: "claude-opus-5-5",
  needsBaseUrl: false,

  async *stream(request, settings, signal) {
    if (!settings.apiKey) throw new AIError("Add your Anthropic API key in the assistant settings.", "config");

    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: settings.apiKey, dangerouslyAllowBrowser: true });

    try {
      const stream = client.beta.messages.stream(
        {
          model: settings.model || this.defaultModel,
          max_tokens: 8000,
          system: request.system,
          messages: request.messages,
          // Server-side refusal fallback: if a safety classifier declines, the API retries on a fallback model.
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
        },
        { signal },
      );

      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          yield event.delta.text;
        }
      }

      const final = await stream.finalMessage();
      if (final.stop_reason === "refusal") {
        throw new AIError("The model declined to answer this request. Try rephrasing it.", "refusal");
      }
      if (final.stop_reason === "max_tokens") {
        yield "\n\n*(Response cut off at the length limit. Ask me to continue.)*";
      }
    } catch (error) {
      if (error instanceof AIError) throw error;
      if (signal.aborted) return;
      throw toAIError(error, Anthropic);
    }
  },
};

function toAIError(error: unknown, Anthropic: typeof import("@anthropic-ai/sdk").default): AIError {
  if (error instanceof Anthropic.AuthenticationError) return new AIError("The API key was rejected. Check it in settings.", "auth");
  if (error instanceof Anthropic.RateLimitError) return new AIError("Rate limited by the provider. Wait a moment and retry.", "rate-limit");
  if (error instanceof Anthropic.APIConnectionError) return new AIError("Could not reach the API. Check your connection.", "network");
  if (error instanceof Anthropic.APIError) return new AIError(`API error ${error.status ?? ""}: ${error.message}`, "unknown");
  return new AIError(error instanceof Error ? error.message : "Unknown error", "unknown");
}
