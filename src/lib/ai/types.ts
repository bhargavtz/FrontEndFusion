/**
 * Provider-independent contracts for the learning assistant.
 *
 * The UI only knows about `AIProvider`. Adding a new model vendor means
 * implementing `stream()` and registering it in `providers/index.ts`.
 */

export type ChatRole = "user" | "assistant";

export type ChatMessage = { role: ChatRole; content: string };

export type CompletionRequest = {
  system: string;
  messages: ChatMessage[];
};

export type ProviderSettings = {
  /** Which registered provider to use. */
  providerId: string;
  apiKey: string;
  model: string;
  /** Only used by providers with a configurable endpoint (OpenAI-compatible). */
  baseUrl: string;
};

export type AIProvider = {
  id: string;
  label: string;
  description: string;
  defaultModel: string;
  defaultBaseUrl?: string;
  needsBaseUrl: boolean;
  /** Streams text deltas. Must reject with an `AIError` on failure and honour `signal`. */
  stream(
    request: CompletionRequest,
    settings: ProviderSettings,
    signal: AbortSignal,
  ): AsyncGenerator<string, void, void>;
};

export class AIError extends Error {
  constructor(
    message: string,
    readonly kind: "auth" | "rate-limit" | "network" | "refusal" | "config" | "unknown" = "unknown",
  ) {
    super(message);
    this.name = "AIError";
  }
}

/** What the learner is currently looking at; attached to every request. */
export type LearningContext = {
  /** e.g. "React", "Promises" */
  topic: string;
  /** Page or section the context came from. */
  location: string;
  language: string;
  /** Whole code example (editor contents). */
  code: string;
  /** Text the learner has selected in the editor, if any. */
  selection: string;
};
