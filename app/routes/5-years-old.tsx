import ChatBot from "~/components/chat-bot";
import type { Route } from "./+types/home";
import { fiveYearOldChatBot } from "~/utils/gemini-api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "5-years-old ChatBot" },
    { name: "description", content: "Welcome to 5-years-old Chatbot" },
  ];
}

export default function Home() {
  return <ChatBot chatbot="5-years-old" model={fiveYearOldChatBot} />;
}
