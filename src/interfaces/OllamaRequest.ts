export interface OllamaRequest {
  model: string;
  messages: { role: 'user' | 'system' | 'assistant'; content: string }[];
  stream: boolean;
}