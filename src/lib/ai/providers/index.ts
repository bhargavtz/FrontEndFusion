import type { AIProvider } from "../types";
import { anthropicProvider } from "./anthropic";
import { openAICompatibleProvider } from "./openai-compatible";

/** Register new providers here; the assistant UI picks them up automatically. */
export const providers: AIProvider[] = [anthropicProvider, openAICompatibleProvider];

export const getProvider = (id: string) => providers.find((p) => p.id === id) ?? providers[0];
