"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, X, Check, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Notification {
  id: number;
  message: string;
  read: boolean;
  link?: string;
  type?: "info" | "warning" | "error";
}

const dummyNotifications: Notification[] = [
  {
    id: 1,
    message: "New order placed by John Doe",
    read: false,
    link: "/dashboard/orders/123",
    type: "info",
  },
  {
    id: 2,
    message: "Low stock alert for product XYZ",
    read: false,
    type: "warning",
  },
  {
    id: 3,
    message: "Your latest blog post received 5 new comments",
    read: true,
    link: "/dashboard/blogs/456",
  },
  {
    id: 4,
    message: "Payment for order #56789 failed. Please check billing details.",
    read: false,
    type: "error",
  },
];

/**
 * Notification component that displays a list of notifications.
 * Each notification can be marked as read or deleted.
 * Notifications can have a link associated with them.
 * Notifications can be cleared all at once.
 */

export default function Notification() {
  // State to hold the notifications
  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="hidden md:block">
      <Popover>
        {/* Popover trigger */}
        <PopoverTrigger className="flex items-center justify-center hover:bg-slate-100 hover:dark:bg-slate-800 p-2 rounded-full relative">
          <Bell />
          <span
            className={`w-3 h-3 rounded-full absolute top-1 right-2 ${
              notifications.some((n) => !n.read)
                ? "bg-blue-500"
                : "bg-transparent"
            }`}
          />
        </PopoverTrigger>
        {/* Popover content */}
        <PopoverContent className="w-96">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Render each notification */}
            {notifications.map((notification) => (
              <Fragment key={notification.id}>
                {/* Render link if notification has a link */}
                {notification.link ? (
                  <Link href={notification.link}>
                    <div className="flex items-center px-4 py-2 relative">
                      {/* Render icon based on notification type */}
                      {notification.type === "info" ? (
                        <Info className="mr-2 h-4 w-4" />
                      ) : notification.type === "warning" ? (
                        <AlertTriangle className="mr-2 h-4 w-4" />
                      ) : (
                        <AlertCircle className="mr-2 h-4 w-4" />
                      )}
                      <div className="flex-1 space-y-0 text-sm">
                        {/* Render notification message */}
                        <p
                          className={`leading-none ${
                            notification.read ? "text-gray-500" : "font-medium"
                          }`}
                        >
                          {notification.message}
                        </p>
                      </div>
                      {/* Render delete and mark as read buttons */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className=""
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotification(notification.id);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setNotifications(
                                notifications.map((n) =>
                                  n.id === notification.id
                                    ? { ...n, read: true }
                                    : n
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
                  // Render non-link notifications
                  <div className="flex items-center px-4 py-2 relative">
                    {/* Render icon based on notification type */}
                    {notification.type === "info" ? (
                      <Info className="mr-2 h-4 w-4" />
                    ) : notification.type === "warning" ? (
                      <AlertTriangle className="mr-2 h-4 w-4" />
                    ) : (
                      <AlertCircle className="mr-2 h-4 w-4" />
                    )}
                    <div className="flex-1 space-y-0 text-sm">
                      <p
                        className={`leading-none ${
                          notification.read ? "text-gray-500" : "font-medium"
                        }`}
                      >
                        {notification.message}
                      </p>
                    </div>
                    {/* Render delete and mark as read buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className=""
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setNotifications(
                              notifications.map((n) =>
                                n.id === notification.id
                                  ? { ...n, read: true }
                                  : n
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
            {/* Render message when there are no notifications */}
            {notifications.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-4">
                No new notifications
              </div>
            )}

            {/* Clear all button */}
            <div className="px-4 py-2">
              <Button
                variant="link"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setNotifications(notifications.filter((n) => n.read));
                }}
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

