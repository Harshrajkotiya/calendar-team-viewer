'use client'
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { colorMap, hours, initialAppointments, teamMembers } from '../common/data';
import { getPositionFromTime, getWidthFromDuration, isAppointmentVisible } from '../utils/dateUtils';
import Controls from './Controls';
import RightPanel from './RightPanel';
import Tabs from './Tabs';

export default function TeamScheduler() {
    // State management
    const [currentView, setCurrentView] = useState('Team View');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [teamFilter, setTeamFilter] = useState<string | number>('All');
    const [timeIncrement, setTimeIncrement] = useState('1 hour');
    const [viewMode, setViewMode] = useState('Day');
    const [appointments, setAppointments] = useState(initialAppointments);

    // Calendar navigation functions
    const goToPreviousDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 1);
        setCurrentDate(newDate);
    };

    const goToNextDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(newDate);
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // Format dates
    const formatMonth = (date: Date) => {
        return date.toLocaleString('default', { month: 'long' });
    };

    const formatYear = (date: Date) => {
        return date.getFullYear();
    };

    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 p-2 md:p-4 gap-2 md:gap-4">
                {/* Date Navigation */}
                <div className="flex items-center justify-center w-full md:w-auto md:justify-start">
                    <ChevronLeft
                        className="h-5 w-5 text-gray-500 cursor-pointer"
                        onClick={() => {
                            const newDate = new Date(currentDate);
                            newDate.setMonth(currentDate.getMonth() - 1);
                            setCurrentDate(newDate);
                        }}
                    />
                    <span className="font-medium mx-2 whitespace-nowrap">{formatMonth(currentDate)}</span>
                    <span className="text-gray-500 whitespace-nowrap">{formatYear(currentDate)}</span>
                    {new Date().getMonth() !== currentDate.getMonth() && (
                        <ChevronRight
                            className="h-5 w-5 text-gray-500 cursor-pointer"
                            onClick={() => {
                                const newDate = new Date(currentDate);
                                newDate.setMonth(currentDate.getMonth() + 1);
                                setCurrentDate(newDate);
                            }}
                        />
                    )}
                </div>

                {/* Tabs */}
                <div className="w-full md:w-auto flex justify-center">
                    <Tabs
                        currentTab={currentView}
                        setCurrentTab={setCurrentView}
                        tabs={["Events", "Team View", "Team Tracking"]}
                    />
                </div>
            </div>

            {/* Main Grid */}
            <div className="flex flex-col md:grid md:grid-cols-12 flex-1 overflow-hidden">
                {currentView === "Team View" && (
                    <>
                        {/* Left Panel */}
                        <div className="md:col-span-9 flex flex-col overflow-hidden">
                            <Controls
                                setTeamFilter={setTeamFilter}
                                timeIncrement={timeIncrement}
                                setTimeIncrement={setTimeIncrement}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                goToPreviousDay={goToPreviousDay}
                                goToToday={goToToday}
                                goToNextDay={goToNextDay}
                            />

                            <div className="overflow-auto no-scrollbar">
                                <div className="min-w-full overflow-x-auto">
                                    <table className="w-full border-collapse table-fixed border-gray-300">
                                        {/* Header row with time slots */}
                                        <thead>
                                            <tr>
                                                <th className="border border-t-0 border-gray-300 p-1 md:p-2 bg-white sticky z-20 text-left">Team</th>
                                                {hours.map((time, index) => (
                                                    <th key={index} className="border-r-2 border-b border-gray-300 bg-gray-100 p-1 md:p-2 text-center text-xs text-gray-600">
                                                        {time instanceof Date ? format(time, 'h:mm a') : 'Invalid Date'}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        {/* Team members */}
                                        <tbody>
                                            {teamMembers.filter((member) => teamFilter === "All" || member.id === teamFilter).map((member) => (
                                                <tr key={member.id} className="h-12">
                                                    <td className="border border-b-2 border-t-0 border-gray-300 px-1 md:px-2 sticky bg-white z-10 text-xs md:text-sm">
                                                        <div className="flex items-center">
                                                            <div
                                                                className={`w-3 h-3 rounded-full mr-2 ${colorMap[member.color] || "bg-gray-400"}`}
                                                            ></div>
                                                            <span className="font-medium">{member.name}</span>
                                                        </div>
                                                    </td>

                                                    {/* Time slots for each member */}
                                                    {hours.map((slot, slotIndex) => {
                                                        const slotStart = new Date(slot);
                                                        const slotEnd = new Date(slot);
                                                        slotEnd.setMinutes(slotEnd.getMinutes() + 60); // One-hour slot

                                                        return (
                                                            <td key={slotIndex} className="w-16 md:w-24 border-r-2 border-b-2 border-gray-300 p-0 relative h-12">
                                                                <div className="flex h-full">
                                                                    <div className="w-1/2 border-r border-gray-300"></div>
                                                                    <div className="w-1/2"></div>
                                                                </div>

                                                                {appointments
                                                                    .filter(app => {
                                                                        const appointmentStart = new Date(app.startTime);
                                                                        const appointmentEnd = new Date(app.endTime);
                                                                        return (
                                                                            isAppointmentVisible(appointmentStart, appointmentEnd, slotStart, slotEnd) &&
                                                                            app.memberId === member.id &&
                                                                            new Date(app.timeSlot).toDateString() === currentDate.toDateString()
                                                                        );
                                                                    })
                                                                    .map(appointment => {
                                                                        const appointmentStart = new Date(appointment.startTime);
                                                                        const appointmentEnd = new Date(appointment.endTime);

                                                                        // Calculate position (left offset) & width
                                                                        const leftOffset = getPositionFromTime(appointmentStart, slotStart.getHours()) * 100;
                                                                        const width = getWidthFromDuration(appointmentStart, appointmentEnd) * 100;

                                                                        return (
                                                                            <div
                                                                                key={appointment.id}
                                                                                className={`absolute top-0 border-l-4 rounded-md p-1 text-xs ${colorMap[member.color] || "bg-gray-400 border-gray-300"}`}
                                                                                style={{
                                                                                    left: `${leftOffset}%`,
                                                                                    width: `${width}%`,
                                                                                    minWidth: '8rem',
                                                                                }}
                                                                            >
                                                                                <div className="font-medium truncate">{appointment.clientName || "Client Name"}</div>
                                                                                <div className="text-gray-600 text-xs mt-1 font-semibold truncate">
                                                                                    {format(appointmentStart, "h:mm a")} - {format(appointmentEnd, "h:mm a")}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel visible on all screen sizes */}
                        <div className="md:col-span-3 border-t md:border-t-0 md:border-l overflow-auto border-gray-300 ">
                            <RightPanel />
                        </div>
                    </>
                )}
            </div>
        </div >
    );
}