import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
    const [theme, setThemeState] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("taskflow-theme");

        if (savedTheme === "dark") {
            return "dark";
        }

        return "light";
    });

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("taskflow-theme", theme);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return {
        theme,
        setTheme,
    };
}