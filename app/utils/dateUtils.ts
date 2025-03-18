import {
    endOfDay,
    endOfMonth,
    endOfWeek,
    format,
    startOfDay,
    startOfMonth,
    startOfWeek
} from 'date-fns';

export interface TimeSlot {
    label: string;
    value: number;
}

export const generateTimeSlots = (startHour: number, endHour: number): Date[] => {
    const slots: Date[] = [];
    const date = new Date();
    date.setHours(startHour, 0, 0, 0);

    while (date.getHours() < endHour) {
      slots.push(new Date(date));
      date.setMinutes(date.getMinutes() + 60);
    }

    return slots;
  };

export const getTimeRangeLabel = (start: Date, end: Date): string => {
    const startTime = format(start, 'h:mm a');
    const endTime = format(end, 'h:mm a');
    return `${startTime} - ${endTime}`;
};

export const getVisibleDateRange = (date: Date, viewMode: 'Day' | 'Week' | 'Month'): { start: Date, end: Date } => {
    if (viewMode === 'Day') {
        return {
            start: startOfDay(date),
            end: endOfDay(date)
        };
    } else if (viewMode === 'Week') {
        return {
            start: startOfWeek(date, { weekStartsOn: 0 }),
            end: endOfWeek(date, { weekStartsOn: 0 })
        };
    } else {
        return {
            start: startOfMonth(date),
            end: endOfMonth(date)
        };
    }
};

export const getPositionFromTime = (date: Date, startHour: number = 6): number => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (hours - startHour) + (minutes / 60);
};

export const getWidthFromDuration = (start: Date, end: Date): number => {
    const startTime = start.getHours() + (start.getMinutes() / 60);
    const endTime = end.getHours() + (end.getMinutes() / 60);
    return endTime - startTime;
};

export const parseTimeString = (timeStr: string, baseDate: Date): Date => {
    // Assuming timeStr is in format "1:00 pm" or "10:30 am"
    const [timePart, period] = timeStr.split(' ');
    const [hourStr, minuteStr] = timePart.split(':');

    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    // Handle AM/PM
    if (period.toLowerCase() === 'pm' && hour < 12) {
        hour += 12;
    } else if (period.toLowerCase() === 'am' && hour === 12) {
        hour = 0;
    }

    return new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        hour,
        minute
    );
};

export const formatDateHeader = (date: Date): string => {
    return format(date, 'MMMM yyyy');
};

// Custom function to check if an appointment is visible in the current view
export const isAppointmentVisible = (
    appointmentStart: Date,
    appointmentEnd: Date,
    viewStart: Date,
    viewEnd: Date
): boolean => {
    // Check if appointment starts during the view
    const startsDuringView = appointmentStart >= viewStart && appointmentStart < viewEnd;

    // Check if appointment ends during the view
    const endsDuringView = appointmentEnd > viewStart && appointmentEnd <= viewEnd;

    // Check if appointment spans the entire view
    const spansEntireView = appointmentStart <= viewStart && appointmentEnd >= viewEnd;

    return startsDuringView || endsDuringView || spansEntireView;
};