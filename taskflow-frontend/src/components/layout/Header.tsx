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

    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">

      <div className="flex h-16 items-center justify-between px-5 sm:px-8">

        {/* Left */}

        <div className="flex min-w-0 items-center gap-3">

          <SidebarTrigger
            className="text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          />


          <div className="relative hidden sm:block">

            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-9 w-[240px] border-slate-200 bg-slate-50 pl-9 text-sm shadow-none placeholder:text-slate-400 focus-visible:bg-white"
            />

          </div>

        </div>


        {/* Right */}

        <div className="flex items-center gap-2">

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 hover:bg-slate-100 hover:text-slate-900"
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