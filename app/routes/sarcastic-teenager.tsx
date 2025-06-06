import ChatBot from "~/components/chat-bot";
import type { Route } from "./+types/home";
import { sarcasticTeenagerChatBot } from "~/utils/gemini-api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sarcastic Teenager Chatbot" },
    { name: "description", content: "Welcome to sarcastic-teenager chatbot" },
  ];
}

export default function Home() {
  return (
    <ChatBot chatbot="sarcastic-teenager" model={sarcasticTeenagerChatBot} />
  );
}
