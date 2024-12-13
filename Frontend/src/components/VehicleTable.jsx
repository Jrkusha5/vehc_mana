import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VehicleTable = () => {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({ name: '', status: '' });

    const fetchVehicles = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/vehicles');
            setVehicles(res.data);
        } catch (error) {
            toast.error("Error fetching vehicles!");
        }
    };

    const addVehicle = async () => {
        try {
            if (!newVehicle.name || !newVehicle.status) {
                toast.error("Both fields are required!");
                return;
            }
            await axios.post('http://localhost:4000/api/vehicles', newVehicle);
            fetchVehicles();
            setNewVehicle({ name: '', status: '' });
            toast.success("Vehicle added!");
        } catch (error) {
            toast.error("Error adding vehicle!");
        }
    };

    const updateVehicleStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:4000/api/vehicles/${id}`, { status });
            fetchVehicles();
            toast.success("Status updated!");
        } catch (error) {
            toast.error("Error updating status!");
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <div className="container mx-auto mt-10 max-w-6xl px-6">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
                Vehicle Management Dashboard
            </h1>
            <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Vehicle</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Vehicle Name"
                        className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                        value={newVehicle.name}
                        onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                        value={newVehicle.status}
                        onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
                    />
                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 shadow-md transition-all"
                        onClick={addVehicle}
                    >
                        Add Vehicle
                    </button>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-xl">
                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700">
                            <th className="p-4 font-semibold">Vehicle Name</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Last Updated</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr
                                key={vehicle._id}
                                className="border-b hover:bg-gray-100 transition-all"
                            >
                                <td className="p-4 text-gray-800">{vehicle.name}</td>
                                <td className="p-4 text-gray-800">{vehicle.status}</td>
                                <td className="p-4 text-gray-800">
                                    {new Date(vehicle.lastUpdated).toLocaleString()}
                                </td>
                                <td className="p-4">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md transition-all"
                                        onClick={() =>
                                            updateVehicleStatus(vehicle._id, 'Active')
                                        }
                                    >
                                        Set Active
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 shadow-md transition-all"
                                        onClick={() =>
                                            updateVehicleStatus(vehicle._id, 'Inactive')
                                        }
                                    >
                                        Set Inactive
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default VehicleTable;
