// components/RightPanel.tsx
import React, { useState } from 'react';
import { initialClients } from '../common/data';
import Tabs from './Tabs';

interface RightPanelProps {
    // setShowAddAppointment: (value: boolean) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
    // setShowAddAppointment,
}) => {

    const [assignFilter, setAssignFilter] = useState('Unassigned');
    const [clients, setClients] = useState(initialClients);

    const filteredClients = () => {
        if (assignFilter === 'Assigned') {
            return clients.filter(client => client.assigned);
        } else if (assignFilter === 'Unassigned') {
            return clients.filter(client => !client.assigned);
        }
        return clients;
    };

    // Assign all clients
    const handleAssignAll = () => {
        setClients(
            clients.map(client => ({ ...client, assigned: true }))
        );
    };

    // Assign client
    const handleAssignClient = (clientId: number) => {
        setClients(
            clients.map(client =>
                client.id === clientId ? { ...client, assigned: !client.assigned } : client
            )
        );
    };

    return (
        <div className="flex flex-col">
            {/* Assigned / Unassigned Filter Tabs */}
            <div className="p-3 border-b flex justify-center">
                <Tabs
                    currentTab={assignFilter}
                    setCurrentTab={setAssignFilter}
                    tabs={['Assigned', 'Unassigned']}
                />
            </div>
            <div className="m-4 p-2 text-sm font-medium transition-all rounded-lg bg-[#FAFAFA] shadow text-[#232529] flex items-center justify-center gap-2 border-1 border-[#EEEFF1]"
            // onClick={() => setShowAddAppointment(true)}
            >
                <span className="font-medium cursor-pointer " onClick={handleAssignAll}>
                    Assign All
                </span>
                <img src="./Star Container.svg" alt="Star Container"
                    className="h-5 w-5 text-blue-500 cursor-pointer"
                />
            </div>

            <div className="flex-1 overflow-auto px-4">
                {filteredClients().map((client) => (
                    <div key={client.id} className="border-b p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="font-medium">{client.name}</div>
                                <div className="text-gray-500 text-sm">{client.address}</div>
                                <div className="text-gray-500 text-sm">{client.location}</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-gray-500 text-sm">{client.jobNumber}</div>
                                <button
                                    className={`mt-2 text-sm rounded-lg bg-[#FAFAFA] shadow px-5 py-1 border-1 border-[#EEEFF1] ${client.assigned ? 'bg-green-50 text-green-500 border-green-200' : ''
                                        }`}
                                    onClick={() => handleAssignClient(client.id)}
                                >
                                    {client.assigned ? 'Assigned' : 'Assign'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightPanel;
