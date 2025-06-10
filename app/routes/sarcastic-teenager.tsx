import ChatBot from "~/components/chat-bot";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sarcastic Teenager Chatbot" },
    { name: "description", content: "Welcome to sarcastic-teenager chatbot" },
  ];
}

export default function Home() {
  return <ChatBot chatbot="sarcastic-teenager" />;
}
