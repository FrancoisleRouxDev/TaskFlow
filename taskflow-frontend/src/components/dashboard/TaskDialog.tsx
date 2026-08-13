import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { Task } from "@/types/task";
import { TaskFormFields } from "./TaskFormFields";

interface TaskDialogProps {
    mode?: "create" | "edit";
    addTask: (task: Task) => void;
    updateTask?: (task: Task) => void;
    task?: Task;
}

export default function TaskDialog({ addTask }: TaskDialogProps) {
    const [open, setOpen] = useState(false);

    const [taskState, setTaskState] = useState<Omit<Task, "id">>({
        title: "",
        description: "",
        priority: "Medium",
        status: "To Do",
        assignee: "",
        project: "",
        dueDate: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTask: Task = {
            id: crypto.randomUUID(),
            ...taskState,
        };

        addTask(newTask);
        resetTask();
        setOpen(false);
    };

    const hasChanges =
        taskState.title.trim() !== "" ||
        taskState.description.trim() !== "" ||
        taskState.assignee.trim() !== "" ||
        taskState.project.trim() !== "" ||
        taskState.dueDate.trim() !== "";

    const resetTask = () => {
        setTaskState({
            title: "",
            description: "",
            priority: "Medium",
            status: "To Do",
            assignee: "",
            project: "",
            dueDate: "",
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen && hasChanges) return;
                setOpen(nextOpen);
            }}
        >
            <Button onClick={() => setOpen(true)}>+ New Task</Button>

            <DialogContent className="w-[95vw] max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Fill out the details below to add a new task to your workspace.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <TaskFormFields
                        formData={taskState}
                        onChange={(updated) => setTaskState(updated as Omit<Task, "id">)}
                    />

                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                resetTask();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Create Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}