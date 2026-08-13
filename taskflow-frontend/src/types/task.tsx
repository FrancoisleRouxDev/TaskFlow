export interface Task {
    id: string;
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High" | "Critical";
    status: "To Do" | "In Progress" | "Review" | "Done";
    assignee: string;
    project: string;
    dueDate: string;
}

export interface Event {
    id: string;
    name: string;
    date: string;        // ISO date string
    time?: string;       // Optional time (HH:mm format)
    description?: string;
    category?: string;   // e.g., "Personal", "Work"
    // Events intentionally do NOT have:
    // - completion status/checkbox
    // - priority level
    // - assignee
    // These represent what's happening, not what needs to be done.
}