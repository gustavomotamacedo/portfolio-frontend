import { Suspense } from "react";
import { ChatContainer } from "@/features/chat";

export default function Home() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ChatContainer />
    </Suspense>
  );
}
