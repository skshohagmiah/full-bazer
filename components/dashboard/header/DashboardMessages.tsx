"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageCircle, X, Check } from "lucide-react";
import { useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface Message {
  id: number;
  sender: string;
  message: string;
  read: boolean;
  link?: string; // Optional link for the message
}

const dummyMessages: Message[] = [
  {
    id: 1,
    sender: "John Doe",
    message: "Hello, I have a question about my order.",
    read: false,
    link: "/dashboard/orders/123", // Example link
  },
  {
    id: 2,
    sender: "Jane Smith",
    message: "Can you provide an update on the shipping status?",
    read: true,
  },
  {
    id: 3,
    sender: "Mark Johnson",
    message: "I'm interested in your products.",
    read: false,
    link: "/dashboard/products/456", // Example link
  },
];

/**
 * Component for displaying and managing dashboard messages.
 *
 * @returns {JSX.Element} The DashboardMessages component.
 */
export default function DashboardMessages() {
  // Initialize state with dummy messages
  const [messages, setMessages] = useState(dummyMessages);

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  /**
   * Marks all messages as read by updating the read property of each message.
   */
  const handleMarkAllAsRead = () => {
    setMessages(messages.map((m) => ({ ...m, read: true })));
  };

  return (
    <div className="hidden md:block">
      {/* Popover component for displaying messages */}
      <Popover>
        <PopoverTrigger className="flex items-center justify-center hover:bg-slate-100 hover:dark:bg-slate-800 p-2 rounded-full relative">
          <MessageCircle />
          {/* Notification dot for unread messages */}
          <span
            className={`w-3 h-3 rounded-full absolute top-1 right-2 ${
              messages.some((m) => !m.read) ? "bg-blue-500" : "bg-transparent"
            }`}
          />
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="p-4">
            <div className="text-md font-semibold text-gray-900 dark:text-white mb-2">
              Messages
            </div>
            <Separator />
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Render each message */}
            {messages.map((message) => (
              <Fragment key={message.id}>
                {/* Conditionally render link */}
                {message.link ? (
                  <Link href={message.link}>
                    <div
                      key={message.id}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer gap-2"
                    >
                      <div className="flex-1 space-y-0 text-sm">
                        <p
                          className={`leading-none font-medium ${
                            message.read ? "text-gray-500" : ""
                          }`}
                        >
                          {message.sender}
                        </p>
                        <p className="leading-none text-gray-500">
                          {message.message}
                        </p>
                      </div>
                      {/* Actions for each message */}
                      <div className="flex items-center gap-2">
                        {/* Delete button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className=""
                          onClick={() => handleDeleteMessage(message.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {/* Mark as read button */}
                        {!message.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setMessages(
                                messages.map((n) =>
                                  n.id === message.id ? { ...n, read: true } : n
                                )
                              );
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Link>
                ) : (
                  // Render message without link
                  <div
                    key={message.id}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <div className="flex-1 space-y-0 text-sm">
                      <p
                        className={`leading-none font-medium ${
                          message.read ? "text-gray-500" : ""
                        }`}
                      >
                        {message.sender}
                      </p>
                      <p className="leading-none text-gray-500">
                        {message.message}
                      </p>
                    </div>
                    {/* Actions for each message */}
                    <div className="flex items-center gap-2">
                      {/* Delete button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className=""
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {/* Mark as read button */}
                      {!message.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setMessages(
                              messages.map((n) =>
                                n.id === message.id ? { ...n, read: true } : n
                              )
                            );
                          }}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
            {/* Message when there are no messages */}
            {messages.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-4">
                No new messages
              </div>
            )}

            {/* Clear all button */}
            <div className="px-4 py-2">
              <Button
                variant="link"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={handleMarkAllAsRead}
              >
                Clear all
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

