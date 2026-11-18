import { AIError, type AIProvider } from "../types";

/**
 * Any server that speaks the OpenAI-style `/chat/completions` streaming
 * protocol: hosted gateways, OpenRouter, or a local model such as Ollama
 * (http://localhost:11434/v1). Demonstrates that the UI is provider-neutral.
 */
export const openAICompatibleProvider: AIProvider = {
  id: "openai-compatible",
  label: "OpenAI-compatible endpoint",
  description: "Any /chat/completions-compatible API, including local models.",
  defaultModel: "",
  defaultBaseUrl: "http://localhost:11434/v1",
  needsBaseUrl: true,

  async *stream(request, settings, signal) {
    if (!settings.baseUrl) throw new AIError("Set a base URL in the assistant settings.", "config");
    if (!settings.model) throw new AIError("Set a model name in the assistant settings.", "config");

    let response: Response;
    try {
      response = await fetch(`${settings.baseUrl.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        signal,
        headers: {
          "content-type": "application/json",
          ...(settings.apiKey ? { authorization: `Bearer ${settings.apiKey}` } : {}),
        },
        body: JSON.stringify({
          model: settings.model,
          stream: true,
          messages: [{ role: "system", content: request.system }, ...request.messages],
        }),
      });
    } catch (error) {
      if (signal.aborted) return;
      throw new AIError(
        `Could not reach ${settings.baseUrl}. ${error instanceof Error ? error.message : ""} (CORS or the server may be blocking the browser.)`,
        "network",
      );
    }

    if (response.status === 401 || response.status === 403) throw new AIError("The API key was rejected.", "auth");
    if (response.status === 429) throw new AIError("Rate limited. Wait a moment and retry.", "rate-limit");
    if (!response.ok || !response.body) throw new AIError(`Request failed with status ${response.status}.`, "unknown");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") return;
          try {
            const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta) yield delta;
          } catch {
            /* ignore keep-alives and partial lines */
          }
        }
      }
    } catch (error) {
      if (!signal.aborted) throw new AIError(error instanceof Error ? error.message : "Stream interrupted.", "network");
    }
  },
};
