import { cva } from "class-variance-authority";
import { useEffect, useRef, useState, type JSX } from "react";
import { Link } from "react-router";
import type { ChatBots, Model } from "~/types";
import {
  messageContainer,
  notificationContainer,
  type MessageContainerProps,
} from "~/utils/cva";
interface Props {
  chatbot: ChatBots;
  model: Model;
}
export default function ChatBot({ chatbot, model }: Props) {
  const [notification, setNotification] = useState<JSX.Element | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<JSX.Element[]>([]);
  const createMessage = (message: string, props: MessageContainerProps) => {
    return <p className={messageContainer(props)}>{message}</p>;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = new FormData(e.currentTarget)
        .get("user-message")
        ?.toString();
      e.currentTarget.reset();
      if (value) {
        const myMessage = createMessage(value, { type: "sent" });
        setChats((prev) => [...prev, myMessage]);
        const response = await model(value, chatbot);
        const assistantMessage = createMessage(response || "", {
          type: "received",
        });
        setChats((prev) => [...prev, assistantMessage]);
      }
    } catch (err) {
      const notification = (
        <p className={notificationContainer({ type: "error" })}>
          {(err as unknown as { message: string })?.message ||
            "Something Went Wrong"}
        </p>
      );
      setNotification(notification);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current && chatContainerRef.current.lastElementChild) {
      const lastChild = chatContainerRef.current
        .lastElementChild as HTMLElement;
      lastChild.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [chats]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <main className="w-full h-screen flex items-center justify-center p-1">
      <section className="relative w-full max-w-[500px] h-full border-2 border-black rounded-2xl p-0.5 flex flex-col">
        {/* navbar */}
        <div className="w-full h[50px] bg-blue-500 flex  justify-between items-center p-1 rounded-2xl px-3">
          <Link to="/" className="m-0">
            Home
          </Link>
          <p className=" capitalize font-bold text-white">
            {chatbot.replaceAll("-", " ")} ChatBot
          </p>
        </div>
        {/* chat area */}
        <div
          ref={chatContainerRef}
          className="relative grow w-full border-2 rounded-2xl my-1 overflow-y-auto p-1"
        >
          {notification && notification}
          {...chats}
        </div>
        {/* message */}
        <form
          onSubmit={handleSubmit}
          className=" bottom-0 w-full h-[45px]  flex items-center gap-1.5"
        >
          <input
            name="user-message"
            type="text"
            className="grow h-full rounded-2xl border-2 p-3 peer"
            required
          />
          <button className="group h-full cursor-pointer rounded-full bg-blue-300 p-2 disabled:opacity-45 hover:bg-blue-500 peer-invalid:cursor-not-allowed peer-invalid:opacity-50">
            <img
              src="/send.svg"
              alt=""
              className="h-full group-hover:translate-x-1.5 group-hover:-translate-y-2 transition-all duration-300"
            />
          </button>
        </form>
      </section>
    </main>
  );
}
