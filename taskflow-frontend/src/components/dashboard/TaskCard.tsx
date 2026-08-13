import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";
import PriorityBadge from "./PriorityBadge";
import EditTaskDialog from "./EditTaskDialog";
import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: Task;
  index: number;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export default function TaskCard({
  task,
  index,
  updateTask,
  deleteTask,
}: TaskCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        >
          <Card className="rounded-xl border border-sidebar-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-accent/20">
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {task.title}
                </h3>
                {task.project && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {task.project}
                  </p>
                )}
              </div>

              {task.dueDate && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>📅</span>
                  <span>{task.dueDate}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <PriorityBadge priority={task.priority} />

                {task.assignee && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {task.assignee.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </Card>

          <EditTaskDialog
            open={open}
            onOpenChange={setOpen}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>
      )}
    </Draggable>
  );
}