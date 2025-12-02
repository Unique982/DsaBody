"use client";

import { useState } from "react";
import {
  Bell,
  Menu,
  Settings,
  User,
  LogOut,
  Search,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopHeaderProps {
  onMenuClick: () => void;
}

export default function TopHeader({ onMenuClick }: TopHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "New user registered",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      message: "System update completed",
      time: "1 hour ago",
      read: false,
    },
    { id: 3, message: "New order received", time: "2 hours ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="border-b border-border bg-background px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side - Menu Button & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right Side - Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications Dropdown */}
          <DropdownMenu
            open={notificationsOpen}
            onOpenChange={setNotificationsOpen}
          >
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-4 py-2">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-muted transition-colors",
                      !notification.read ? "bg-muted/50" : ""
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="px-4 py-2">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all notifications
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg hover:bg-muted px-2 py-1.5 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  Un
                </div>
                <span className="hidden text-sm font-medium sm:inline">
                  Unique Neupane
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:inline" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* Profile Header */}
              <div className="px-4 py-3">
                <p className="text-sm font-semibold">👋 Hi Unique Neupane </p>
                <p className="text-xs text-muted-foreground">
                  uniqueneupane153@gmail.com
                </p>
              </div>
              <DropdownMenuSeparator />

              {/* Menu Items */}
              <DropdownMenuItem className="cursor-pointer gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2 text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

import { cn } from "@/lib/utils";
