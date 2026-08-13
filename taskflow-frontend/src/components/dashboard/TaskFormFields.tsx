import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Task } from "@/types/task";

export type TaskFormData = Omit<Task, "id"> | Task;

interface TaskFormFieldsProps {
    formData: TaskFormData;
    onChange: (updated: TaskFormData) => void;
}

export function TaskFormFields({ formData, onChange }: TaskFormFieldsProps) {
    return (
        <div className="space-y-4 py-2">
            {/* Title */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                    placeholder="Implement authentication..."
                    value={formData.title ?? ""}
                    required
                    onChange={(e) => onChange({ ...formData, title: e.target.value })}
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                    placeholder="Describe the task..."
                    rows={3}
                    value={formData.description ?? ""}
                    onChange={(e) => onChange({ ...formData, description: e.target.value })}
                />
            </div>

            {/* 2-Column Grid for Metadata */}
            <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select
                        value={formData.status ?? "To Do"}
                        onValueChange={(value) => {
                            if (value === null) return;
                            onChange({ ...formData, status: value as Task["status"] });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Review">Review</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select
                        value={formData.priority ?? "Medium"}
                        onValueChange={(value) => {
                            if (value === null) return;
                            onChange({ ...formData, priority: value as Task["priority"] });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Project */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Project</label>
                    <Input
                        placeholder="e.g., Q3 Roadmap"
                        value={formData.project ?? ""}
                        onChange={(e) => onChange({ ...formData, project: e.target.value })}
                    />
                </div>

                {/* Assignee */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Assignee</label>
                    <Input
                        placeholder="e.g., John Doe"
                        value={formData.assignee ?? ""}
                        onChange={(e) => onChange({ ...formData, assignee: e.target.value })}
                    />
                </div>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <Input
                    type="date"
                    value={formData.dueDate ?? ""}
                    onChange={(e) => onChange({ ...formData, dueDate: e.target.value })}
                />
            </div>
        </div>
    );
}