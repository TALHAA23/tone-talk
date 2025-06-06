import { Link } from "react-router";

const circles = [
  <div className="size-20 sm:size-40 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"></div>,
  <div className="size-20 sm:size-40 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"></div>,
  <div className="size-20 sm:size-40 rounded-full bg-radial from-pink-400 from-40% to-fuchsia-700"></div>,
];
export function Welcome() {
  return (
    <main className="h-screen flex flex-col items-center justify-center p-2.5">
      <h1 className="text-lg sm:text-4xl font-bold my-2">
        Select any Fun Tone
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[800px]">
        {[
          {
            title: "gen-alpha",
            desc: "Your terminally online bestie who speaks fluent brainrot. Expect responses packed with rizz, no cap energy, and all the latest slang that'll either make you cringe or feel absolutely based.",
          },
          {
            title: "sarcastic-teenager",
            desc: "The digital embodiment of eye-rolls and sighs. This bot has mastered the art of being helpful while making you feel slightly judged. Prepare for sass with a side of actual answers.",
          },
          {
            title: "5-years-old",
            desc: "Your patient friend who breaks down everything into bite-sized, easy-to-understand pieces. No fancy words, no confusing jargon - just simple explanations that make sense to everyone.",
          },
        ].map((item, index) => (
          <Link
            to={item.title}
            key={item.title}
            className="relative group p-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transition-all duration-400 hover:translate-y-2 cursor-pointer grow"
          >
            <div className="flex flex-col items-center bg-white rounded-2xl p-2.5 gap-5 h-full">
              {circles[index]}
              <p className="capitalize font-bold text-xl">
                {item.title.replaceAll("-", " ")}
              </p>
            </div>
            <p className="text-xs absolute bottom-0  bg-purple-300 p-2 m-1 rounded-b-2xl rounded-t left-0 scale-y-0 origin-bottom transition-all duration-300 group-hover:scale-100">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
