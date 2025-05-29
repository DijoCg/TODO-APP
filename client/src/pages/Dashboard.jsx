import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import Navbar from "./Navbar";

function Dashboard() {
  const [toDo, setToDo] = useState([]);
  const [newTodo, setNewTodo] = useState({ task: "", priority: "", time: "", date: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchToDo = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;
      const response = await axios.get(`http://localhost:5000/api/tasks/fetchTasks/${userId}`);
      const reversedData = [...response.data].reverse();
      setToDo(reversedData);
    } catch (error) {
      console.error("Error fetching to-dos:", error);
    }
  };

  useEffect(() => {
    fetchToDo();
  }, []);

  const AddNewToDo = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    try {
      await axios.post(`http://localhost:5000/api/tasks/addNewTask/${userId}`, newTodo);
         alert("Task added successfully");
      setNewTodo({ task: "", priority: "", time: "", date: "" });
      fetchToDo();
    } catch (error) {
      console.error("Error submitting New Event:", error);
      alert("Failed to add New TODO");
    }
  };

  const handleEditClick = (item) => {
    setEditId(item._id);
    setEditData({
      task: item.task,
      priority: item.priority,
      time: item.time,
      date: item.date.split("T")[0],
    });
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditToDo = async (id) => {
    try {
       const token = localStorage.getItem("token");
       await axios.put(`http://localhost:5000/api/tasks/editTodo/${id}`, editData, {
         headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task updated successfully");
       fetchToDo();
      setEditId(null);
    } catch (error) {
        console.error("Error updating ToDo:", error);
      alert("Failed to update ToDo");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/updateTodoStatus/${id}`, { status: newStatus });
      fetchToDo();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };




  const handleDeleteToDo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/deleteTodo/${id}`);
      alert("Task deleted successfully");
      fetchToDo();
    } catch (error) {
      console.error("Error deleting ToDo:", error);
      alert("Failed to delete ToDo");
    }
  };

  const filteredTasks = toDo.filter((task) => {
    const matchesSearch = task.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const completedCount = toDo.filter((task) => task.status === "Completed").length;
  const completionPercentage = toDo.length > 0 ? Math.round((completedCount / toDo.length) * 100) : 0;

  return (
    <div className="bg-black min-h-screen text-white font-mono">
      <Navbar />
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <h1 className="text-4xl mb-8 text-center text-cyan-400 font-bold tracking-widest">TO-DO List</h1>

        
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            
            <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900 border border-cyan-500 px-4 py-2 rounded-md w-full md:w-1/2 text-cyan-300 placeholder-cyan-600"
          />
          <select
            
              
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-900 border border-purple-500 px-4 py-2 rounded-md text-purple-300"
          >
            
            <option value="All">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            
          <option value="Completed">Completed</option>
          </select>
        </div>

          <div className="mb-6 text-center">
          <div className="text-sm tracking-wide text-purple-300">TASK COMPLETION</div>
          
          <div className="relative w-full bg-gray-800 h-6 rounded-full overflow-hidden mt-2">
            <div className="absolute top-0 left-0 h-6 bg-gradient-to-r from-green-400 to-cyan-500" style={{ width: `${completionPercentage}%` }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
              {completionPercentage}% Completed
            </div>
          </div>
        </div>

        <form onSubmit={AddNewToDo} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <input
            type="text"
            value={newTodo.task}
            
            onChange={(e) => setNewTodo({ ...newTodo, task: e.target.value })}
            placeholder="Task"
            className="bg-gray-900 border border-cyan-500 px-3 py-2 rounded text-cyan-300"
            required
          />
          <select
            
            value={newTodo.priority}
            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
            className="bg-gray-900 border border-purple-500 px-3 py-2 rounded text-purple-300"
            required
          >
            <option value="">Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="time"
            value={newTodo.time}
            onChange={(e) => setNewTodo({ ...newTodo, time: e.target.value })}
            className="bg-gray-900 border border-pink-500 px-3 py-2 rounded text-pink-300"
            required
          />
          <input
            type="date"
            value={newTodo.date}
            onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
            className="bg-gray-900 border border-blue-500 px-3 py-2 rounded text-blue-300"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded hover:brightness-125 transition cursor-pointer">
            Add
          </button>
        </form>

        <div className="overflow-x-auto">
          
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-800 text-cyan-400">
              <tr>
                <th className="px-4 py-2">Task</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">No tasks found.</td>
                </tr>
              ) : (
                filteredTasks.map((item, index) => (
                  
                   
                   <tr key={index} className="border-b border-gray-700 hover:bg-gray-900">
                    
                    <td className="px-4 py-2">
                      {editId === item._id ? (
                        <input name="task" value={editData.task} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded w-full" />
                      ) : item.task}
                    
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                        className="bg-gray-800 px-2 py-1 rounded text-white">
                          
                          <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    
                    <td className="px-4 py-2">
                      {editId === item._id ? (
                        
                        <select name="priority" value={editData.priority} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded w-full">
                          
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      ) : item.priority}
                    </td>
                    
                    <td className="px-4 py-2">
                      {editId === item._id ? (
                        <input name="time" value={editData.time} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded w-full" />
                      ) : item.time}
                    </td>
                    
                    
                    <td className="px-4 py-2">
                      {editId === item._id ? (
                        <input type="date" name="date" value={editData.date} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded w-full" />
                      ) : new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    
                    
                     <td className="px-4 py-2">
  <div className="flex items-center gap-x-4">
    {editId === item._id ? (
      <button
        onClick={() => handleEditToDo(item._id)}
        className="text-green-400 text-base font-medium">Save</button>
    ) : (
      <button
        onClick={() => handleEditClick(item)}
        className="text-cyan-400 text-2xl cursor-pointer"><MdEdit /></button>
    )}

    <button
      onClick={() => handleDeleteToDo(item._id)}
      className="text-red-500 text-2xl cursor-pointer"><MdDelete /></button>
  </div>
</td>

                  
                    
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      
      
         </div>
      
      </div>
  );
}


export default Dashboard;