export interface Message {
  role: "user" | "ai";
  content: string;
}

export interface ChatResponse {
  response: string;
  session_id?: string;
  error?: string;
}

export interface ChatHistoryResponse {
  history: Message[];
}

export interface ChatRequest {
  message: string;
  session_id?: string;
}
