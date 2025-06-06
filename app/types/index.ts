type ChatBots = "gen-alpha" | "sarcastic-teenager" | "5-years-old";
type Model = (input: string, chatType: ChatBots) => Promise<string | undefined>;
export type { ChatBots, Model };
