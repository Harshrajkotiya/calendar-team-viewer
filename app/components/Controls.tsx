// components/Controls.tsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { teamMembers } from '../common/data';

interface ControlsProps {
    setTeamFilter: (filter: string | number) => void;
    timeIncrement: string;
    setTimeIncrement: (increment: string) => void;
    viewMode: string;
    setViewMode: (mode: string) => void;
    goToPreviousDay: () => void;
    goToToday: () => void;
    goToNextDay: () => void;
}

const Controls: React.FC<ControlsProps> = ({
    setTeamFilter,
    timeIncrement,
    setTimeIncrement,
    viewMode,
    setViewMode,
    goToPreviousDay,
    goToToday,
    goToNextDay,
}) => {
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [dropdowns, setDropdowns] = useState({
        status: false,
        team: false,
        time: false,
        view: false,
    });

    const toggleDropdown = (key: keyof typeof dropdowns) => {
        setDropdowns((prev) => ({
            status: false,
            team: false,
            time: false,
            view: false,
            [key]: !prev[key],
        }));
    };
    const [showStatusDropdown, setShowStatusDropdown] = useState<boolean>(false);

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center p-4 border-b justify-between gap-4">

          {/* Left Section: Status & Team Dropdowns */}
          <div className='flex flex-wrap items-center gap-4'>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                className="flex items-center rounded px-2 py-1 text-sm"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                <span>{statusFilter}</span>
                <ChevronRight className="h-4 w-4 transform rotate-90 ml-1" />
              </button>

              {showStatusDropdown && (
                <div className="absolute top-full mt-1 z-50 bg-white rounded shadow-lg">
                  {['All', 'Active', 'Pending', 'Completed'].map(status => (
                    <div
                      key={status}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setStatusFilter(status);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Team Dropdown */}
            <div className="relative">
              <button
                className="flex items-center rounded px-2 py-1 text-sm"
                onClick={() => toggleDropdown('team')}
              >
                <span>Team</span>
                <ChevronRight className="h-4 w-4 transform rotate-90 ml-1" />
              </button>

              {dropdowns.team && (
                <div className="absolute top-full mt-1 z-50 bg-white rounded shadow-lg w-max">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setTeamFilter('All');
                      toggleDropdown('team');
                    }}
                  >
                    All
                  </div>
                  {teamMembers.map(member => (
                    <div
                      key={member.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => {
                        setTeamFilter(member.id);
                        toggleDropdown('team');
                      }}
                    >
                      <div className={`w-3 h-3 rounded-full ${member.color} mr-2`}></div>
                      {member.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Time Increment, View Mode, Navigation Buttons */}
          <div className='flex flex-wrap items-center gap-4 justify-between md:justify-end w-full md:w-auto'>

            {/* Time Increment Dropdown */}
            <div className="relative">
              <button
                className="flex items-center rounded px-2 py-1 text-sm"
                onClick={() => toggleDropdown('time')}
              >
                <span>{timeIncrement}</span>
                <ChevronRight className="h-4 w-4 transform rotate-90 ml-1" />
              </button>

              {dropdowns.time && (
                <div className="absolute top-full mt-1 z-50 bg-white rounded shadow-lg w-max">
                  {['15 min', '30 min', '1 hour', '2 hours'].map(time => (
                    <div
                      key={time}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setTimeIncrement(time);
                        toggleDropdown('time');
                      }}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode Dropdown */}
            <div className="relative">
              <button
                className="flex items-center rounded px-2 py-1 text-sm"
                onClick={() => toggleDropdown('view')}
              >
                <span>{viewMode}</span>
                <ChevronRight className="h-4 w-4 transform rotate-90 ml-1" />
              </button>

              {dropdowns.view && (
                <div className="absolute top-full mt-1 z-50 bg-white rounded shadow-lg">
                  {['Day', 'Week', 'Month'].map(view => (
                    <div
                      key={view}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setViewMode(view);
                        toggleDropdown('view');
                      }}
                    >
                      {view}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1">
              <ChevronLeft
                className="text-black cursor-pointer bg-[#F4F4F5] rounded"
                onClick={goToPreviousDay}
              />
              <button className="rounded px-3 py-1 text-sm bg-[#F4F4F5]" onClick={goToToday}>
                Today
              </button>
              <ChevronRight
                className="text-black cursor-pointer bg-[#F4F4F5] rounded"
                onClick={goToNextDay}
              />
            </div>
          </div>

        </div>
      );

};

export default Controls;
