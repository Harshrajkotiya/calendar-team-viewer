'use client'
import React, { use, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Calendar, Clock } from 'lucide-react';
import RightPanel from './RightPanel';
import { hours, initialAppointments, initialClients, teamMembers, timeOptions } from '../common/data';
import Tabs from './Tabs';
import Controls from './Controls';

export default function TeamScheduler() {
    // State management
    const [currentView, setCurrentView] = useState('Team View');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [teamFilter, setTeamFilter] = useState<string | number>('All');
    const [timeIncrement, setTimeIncrement] = useState('1 hour');
    const [viewMode, setViewMode] = useState('Day');
    // const [showAddAppointment, setShowAddAppointment] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        clientName: '',
        startTime: '9:00 am',
        endTime: '10:00 am',
        memberId: 1,
        date: new Date(),
    });
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

    // Calculate position for appointment display
    // const getTimeColumnIndex = (time: string) => {
    //     const hour = parseInt(time.split(':')[0]);
    //     const isPM = time.includes('pm');
    //     let adjustedHour = hour;

    //     if (isPM && hour !== 12) {
    //         adjustedHour += 12;
    //     } else if (!isPM && hour === 12) {
    //         adjustedHour = 0;
    //     }

    //     return Math.max(0, adjustedHour - 6); // 6am is our first column
    // };

    // Add new appointment
    // const handleAddAppointment = () => {
    //     const columnIndex = getTimeColumnIndex(newAppointment.startTime);

    //     const newAppointmentObj = {
    //         id: appointments.length + 1,
    //         memberId: newAppointment.memberId,
    //         clientName: newAppointment.clientName || 'Client Name',
    //         startTime: newAppointment.startTime,
    //         endTime: newAppointment.endTime,
    //         column: columnIndex + 1,
    //         date: newAppointment.date
    //     };

    //     setAppointments([...appointments, newAppointmentObj]);
    //     setShowAddAppointment(false);
    //     setNewAppointment({
    //         clientName: '',
    //         startTime: '9:00 am',
    //         endTime: '10:00 am',
    //         memberId: 1,
    //         date: new Date(),
    //     });
    // };

    // Delete appointment
    const handleDeleteAppointment = (id: number) => {
        setAppointments(appointments.filter(app => app.id !== id));
    };

    console.log("currentDate.getMonth()", new Date().getMonth());


    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between border-b p-4 gap-4">
                {/* Date Navigation */}
                <div className="flex items-center justify-center md:justify-start">
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
                <div className="w-full flex justify-center">
                    <Tabs
                        currentTab={currentView}
                        setCurrentTab={setCurrentView}
                        tabs={["Events", "Team View", "Team Tracking"]}
                    />
                </div>
            </div>

            {/* Main Grid */}
            <div className="flex flex-col lg:grid lg:grid-cols-12 flex-1 overflow-auto">
                {currentView === "Team View" && (
                    <>
                        {/* Left Panel */}
                        <div className="lg:col-span-8 flex flex-col overflow-hidden">
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

                            <div className="flex-1 overflow-auto no-scrollbar">
                                <div className="min-w-[900px] md:min-w-full grid grid-cols-[120px_repeat(9,_1fr)] md:grid-cols-[150px_repeat(9,_1fr)]">
                                    {/* Team Header */}
                                    <div className="sticky left-0 top-0 bg-white z-20 border-b border-r">
                                        <div className="p-2 md:p-4 font-medium">Team</div>
                                    </div>

                                    {/* Hours Headers */}
                                    {hours.map((hour, index) => (
                                        <div key={index} className="sticky top-0 bg-white z-10 border-b border-l">
                                            <div className="p-1 md:p-2 text-center text-xs md:text-sm">{hour}</div>
                                        </div>
                                    ))}

                                    {/* Team Members and Schedule */}
                                    {teamMembers
                                        .filter((member) => teamFilter === "All" || member.id === teamFilter)
                                        .map((member) => (
                                            <React.Fragment key={member.id}>
                                                <div className="border-b border-r p-1 md:p-2 flex items-center sticky left-0 bg-white z-10">
                                                    <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${member.color} mr-1 md:mr-2`}></div>
                                                    <span className="text-xs md:text-sm truncate">{member.name}</span>
                                                </div>

                                                {Array.from({ length: 9 }).map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className="border-b border-r min-h-12 md:min-h-16 relative cursor-pointer"
                                                        onClick={() => {
                                                            setNewAppointment({
                                                                ...newAppointment,
                                                                memberId: member.id,
                                                                startTime: `${hours[index].replace(/am|pm/g, "")}:00 ${hours[index].includes("pm") ? "pm" : "am"}`,
                                                                endTime: `${hours[index < 8 ? index + 1 : index].replace(/am|pm/g, "")}:00 ${hours[index < 8 ? index + 1 : index].includes("pm") ? "pm" : "am"}`,
                                                            });
                                                        }}
                                                    >
                                                        {appointments
                                                            .filter(
                                                                (app) =>
                                                                    app.memberId === member.id &&
                                                                    app.column === index + 1 &&
                                                                    app.date.toDateString() === currentDate.toDateString()
                                                            )
                                                            .map((appointment) => (
                                                                <div
                                                                    key={appointment.id}
                                                                    className="absolute inset-x-1 top-0.5 bg-white border-l-4 border-gray-300 rounded p-0.5 md:p-1 z-10 text-[10px] md:text-xs hover:shadow-md"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="font-medium truncate">{appointment.clientName}</div>
                                                                        <X
                                                                            className="h-3 w-3 text-gray-400 hover:text-red-500"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleDeleteAppointment(appointment.id);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="text-gray-500 truncate">
                                                                        {appointment.startTime} - {appointment.endTime}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Panel visible on all screen sizes */}
                        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l overflow-auto">
                            <RightPanel />
                        </div>
                    </>
                )}
            </div>
            {/* Add Appointment Modal */}
            {/* {showAddAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Add Appointment</h3>
                            <X
                                className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600"
                                onClick={() => setShowAddAppointment(false)}
                            />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Client Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={newAppointment.clientName}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, clientName: e.target.value })}
                                    placeholder="Client Name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Team Member
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={newAppointment.memberId}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, memberId: parseInt(e.target.value) })}
                                >
                                    {teamMembers.map(member => (
                                        <option key={member.id} value={member.id}>
                                            {member.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                                        value={newAppointment.date.toISOString().split('T')[0]}
                                        onChange={(e) => setNewAppointment({
                                            ...newAppointment,
                                            date: new Date(e.target.value)
                                        })}
                                    />
                                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Start Time
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 appearance-none"
                                            value={newAppointment.startTime}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, startTime: e.target.value })}
                                        >
                                            {timeOptions.map((time, index) => (
                                                <option key={index} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                        <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        End Time
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 appearance-none"
                                            value={newAppointment.endTime}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, endTime: e.target.value })}
                                        >
                                            {timeOptions.map((time, index) => (
                                                <option key={index} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                        <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                onClick={() => setShowAddAppointment(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                                onClick={handleAddAppointment}
                            >
                                Add Appointment
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </div >
    );
}