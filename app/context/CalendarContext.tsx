"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { getVisibleDateRange } from "../utils/dateUtils";

interface CalendarContextProps {
    viewMode: "Day" | "Week" | "Month";
    setViewMode: (mode: "Day" | "Week" | "Month") => void;
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    visibleRange: { start: Date; end: Date };
    goToPrevious: () => void;
    goToNext: () => void;
    goToToday: () => void;
}

// Create Context
const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

// Custom Hook
export const useCalendar = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("useCalendar must be used within a CalendarProvider");
    }
    return context;
};

// Provider Component
export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [viewMode, setViewMode] = useState<"Day" | "Week" | "Month">("Day");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [visibleRange, setVisibleRange] = useState(getVisibleDateRange(currentDate, viewMode));

    useEffect(() => {
        setVisibleRange(getVisibleDateRange(currentDate, viewMode));
    }, [currentDate, viewMode]);

    const goToPrevious = () => {
        const newDate = new Date(currentDate);
        if (viewMode === "Day") newDate.setDate(currentDate.getDate() - 1);
        else if (viewMode === "Week") newDate.setDate(currentDate.getDate() - 7);
        else newDate.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const goToNext = () => {
        const newDate = new Date(currentDate);
        if (viewMode === "Day") newDate.setDate(currentDate.getDate() + 1);
        else if (viewMode === "Week") newDate.setDate(currentDate.getDate() + 7);
        else newDate.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    return (
        <CalendarContext.Provider
            value={{ viewMode, setViewMode, currentDate, setCurrentDate, visibleRange, goToPrevious, goToNext, goToToday }}
        >
            {children}
        </CalendarContext.Provider>
    );
};
