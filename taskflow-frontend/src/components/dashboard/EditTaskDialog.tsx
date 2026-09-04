import { useEffect, useState } from "react";
import type { Task } from "@/types/task";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "./ConfirmDialog";
import { TaskFormFields } from "./TaskFormFields";

interface EditTaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task: Task;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
}

export default function EditTaskDialog({
    open,
    onOpenChange,
    task,
    updateTask,
    deleteTask,
}: EditTaskDialogProps) {
    const [editedTask, setEditedTask] = useState(task);
    const [showSaveConfirm, setShowSaveConfirm] = useState(false);
    const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const hasChanges = JSON.stringify(task) !== JSON.stringify(editedTask);

    const confirmSave = () => {
        updateTask(editedTask);
        setEditedTask(editedTask);
        setShowSaveConfirm(false);
        onOpenChange(false);
    };

    const confirmDiscard = () => {
        setEditedTask(task);
        setShowDiscardConfirm(false);
        onOpenChange(false);
    };

    const confirmDelete = () => {
        deleteTask(task.id);
        setShowDeleteConfirm(false);
        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen && hasChanges) {
                    setShowDiscardConfirm(true);
                    return;
                }
                onOpenChange(nextOpen);
            }}
        >
            <DialogContent
                className="sm:max-w-xl"
                showCloseButton={false}
                onClick={(e) => e.stopPropagation()}
            >
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Update the task information.
                    </DialogDescription>
                </DialogHeader>

                <TaskFormFields
                    formData={editedTask}
                    onChange={(updated) => setEditedTask(updated as Task)}
                />

                <DialogFooter className="flex justify-between">
                    <Button
                        variant="destructive"
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        Delete
                    </Button>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                if (hasChanges) {
                                    setShowDiscardConfirm(true);
                                } else {
                                    onOpenChange(false);
                                }
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={() => setShowSaveConfirm(true)}
                            disabled={!hasChanges}
                        >
                            Save Changes
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>

            <ConfirmDialog
                open={showDeleteConfirm}
                title="Delete Task"
                description="Are you sure you want to delete this task? This action cannot be undone."
                confirmText="Delete Task"
                confirmVariant="destructive"
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteConfirm(false)}
            />

            <ConfirmDialog
                open={showSaveConfirm}
                title="Save Changes?"
                description="Save the changes made to this task?"
                confirmText="Save Changes"
                onConfirm={confirmSave}
                onCancel={() => setShowSaveConfirm(false)}
            />

            <ConfirmDialog
                open={showDiscardConfirm}
                title="Discard Changes?"
                description="You have unsaved changes. Are you sure you want to discard them?"
                confirmText="Discard"
                confirmVariant="destructive"
                cancelText="Keep Editing"
                onConfirm={confirmDiscard}
                onCancel={() => setShowDiscardConfirm(false)}
            />
        </Dialog>
    );
}