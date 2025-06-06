import ChatBot from "~/components/chat-bot";
import type { Route } from "./+types/home";
import { genAlphaChatBot } from "~/utils/gemini-api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GenAlpha Chatbot" },
    { name: "description", content: "Welcome to gen alpha chatbot" },
  ];
}

export default function Home() {
  return <ChatBot chatbot="gen-alpha" model={genAlphaChatBot} />;
}
