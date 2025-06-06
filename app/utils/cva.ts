import { cva, type VariantProps } from "class-variance-authority";

const messageContainer = cva("w-[60%] p-3 rounded-md text-sm p-1 my-1", {
  variants: {
    type: {
      sent: "bg-blue-500 text-white self-end rounded-br-none ml-auto",
      received: "bg-gray-200 text-black self-start rounded-bl-none",
    },
  },
  defaultVariants: {
    type: "received",
  },
});
type MessageContainerProps = VariantProps<typeof messageContainer>;

const notificationContainer = cva(
  "p-2 rounded absolute w-fit top-2 left-1/2 -translate-x-1/2 text-sm min-w-[30%] text-center",
  {
    variants: {
      type: {
        error: "bg-red-500 text-white",
      },
    },
  }
);
type NotificationContainerProps = VariantProps<typeof notificationContainer>;

export { messageContainer, notificationContainer };

export type { MessageContainerProps, NotificationContainerProps };
