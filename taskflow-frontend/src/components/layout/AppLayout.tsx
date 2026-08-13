import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  } = useLocalStorage();

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SidebarProvider>
      <AppSidebar taskCount={tasks.length} />

      <SidebarInset className="bg-background">
        <Header
          addTask={addTask}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <main className="flex-1">
          <Outlet
            context={{
              tasks,
              addTask,
              updateTask,
              deleteTask,
              searchTerm,
            }}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}