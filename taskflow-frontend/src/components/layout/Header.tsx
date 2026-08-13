import { SidebarTrigger } from "../ui/sidebar";

import {
  Search,
  Bell,
} from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TaskDialog from "../dashboard/TaskDialog";

import type { Task } from "@/types/task";

interface HeaderProps {
  addTask: (task: Task) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Header({
  addTask,
  searchTerm,
  setSearchTerm,
}: HeaderProps) {

  return (

    <header className="sticky top-0 z-20 border-b border-border-subtle bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Left - Sidebar Trigger */}

        <SidebarTrigger
          className="text-text-secondary hover:bg-surface-2 hover:text-foreground"
        />


        {/* Center - Search */}

        <div className="flex-1 max-w-sm">

          <div className="relative">

            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
            />

            <Input
              placeholder="Search tasks, events..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-9 w-full border-border-subtle bg-surface-2 pl-9 text-sm shadow-none placeholder:text-text-tertiary focus-visible:bg-surface-3 focus-visible:border-primary"
            />

          </div>

        </div>


        {/* Right - Actions */}

        <div className="flex items-center gap-1">

          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:bg-surface-2 hover:text-foreground"
          >

            <Bell className="h-4 w-4" />

            <span className="sr-only">
              Notifications
            </span>

          </Button>


          <TaskDialog
            mode="create"
            addTask={addTask}
          />

        </div>

      </div>

    </header>

  );
}