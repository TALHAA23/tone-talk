import { useEffect, useRef, useState, type JSX } from "react";
import { Link } from "react-router";
import type { ChatBots } from "~/types";
import {
  messageContainer,
  notificationContainer,
  type MessageContainerProps,
} from "~/utils/cva";
interface Props {
  chatbot: ChatBots;
}
export default function ChatBot({ chatbot }: Props) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<JSX.Element | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<JSX.Element[]>([]);
  const parseMarkdown = (text: string) => {
    text = text.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    text = text.replace(/\*(.+?)\*/g, "<i>$1</i>");
    return text;
  };
  const createMessage = (message: string, props: MessageContainerProps) => {
    return (
      <p
        className={messageContainer(props)}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(message) }}
      />
    );
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const value = formData.get("user-message")?.toString();
      // reset input
      const input = e.currentTarget.elements.namedItem(
        "user-message"
      ) as HTMLInputElement | null;
      if (input) input.value = "";
      const isImgGen = formData.get("image-generation");
      if (value) {
        const myMessage = createMessage(value, { type: "sent" });
        setChats((prev) => [...prev, myMessage]);

        const response = await fetch(
          `https://6913309b-tone-talk-worker.talhaa23.workers.dev/api/${chatbot}`,
          // `http://127.0.0.1:8787/api/${chatbot}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: value, isImgGen: !!isImgGen }),
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(errorMsg);
        }

        const data = await response.json();

        if (!data.response) {
          throw new Error("Too Many Requests!");
        }
        const assistanceResponse = data.response.startsWith("data:")
          ? createImage(data.response)
          : createMessage(data.response || "", {
              type: "received",
            });
        setChats((prev) => [...prev, assistanceResponse]);
      }
    } catch (err) {
      const notification = (
        <p className={notificationContainer({ type: "error" })}>
          {(err as unknown as { message: string })?.message ||
            "Something Went Wrong"}
        </p>
      );
      setNotification(notification);
    } finally {
      setLoading(false);
    }
  };

  const createImage = (src: string) => {
    return (
      <img
        src={src}
        alt="no-image"
        className="w-[60%] aspect-square rounded-md p-1 my-1 bg-gray-200 text-black self-start rounded-bl-none"
      />
    );
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
          {loading && createMessage("Thinking...", { type: "loading" })}
        </div>
        {/* message */}
        <form
          onSubmit={handleSubmit}
          className=" bottom-0 w-full h-[45px]  flex items-center gap-1.5"
          autoComplete="off"
        >
          <input
            name="user-message"
            type="text"
            className="grow h-full rounded-2xl border-2 p-3 peer"
            required
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <input
            type="checkbox"
            id="image-generation"
            name="image-generation"
            hidden
            className="peer"
          />
          <div className="h-full aspect-square bg-blue-200 p-2 rounded-full peer-checked:bg-blue-500">
            <label
              htmlFor="image-generation"
              className="bg-blue-400 h-full aspect-square cursor-pointer"
            >
              <img
                src="/image-svgrepo-com.svg"
                alt="img-gen"
                className="h-full group-hover:translate-x-1.5 group-hover:-translate-y-2 transition-all duration-300"
              />
            </label>
          </div>
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
