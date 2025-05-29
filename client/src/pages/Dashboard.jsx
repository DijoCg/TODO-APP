import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FaTrash } from "react-icons/fa";

function Dashboard() {
  const [toDo, setToDo] = useState([]);
  const [newTodo, setNewTodo] = useState({
    task: "",
    priority: "",
    time: "",
    date: "",
  });

  const AddNewToDo = async (e) => {
    e.preventDefault();
    console.log("new todo:::", newTodo);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.userId;
    console.log("userId", userId);
    try {
      await axios.post(
        `http://localhost:5000/api/tasks/addNewTask/${userId}`, newTodo);
      alert("Task added successfully");
      setNewTodo({
        task: "",
        priority: "",
        time: "",
        date: "",

      });
      fetchToDo();
    } catch (error) {
      console.error("Error submitting New Event:", error);
      alert("Failed to add New TODO");
    }
  };

  const fetchToDo = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.userId;
      console.log("userId", userId);
      const response = await axios.get(`http://localhost:5000/api/tasks/fetchTasks/${userId}`);
      const reversedData = [...response.data].reverse();
      setToDo(reversedData);  // Corrected: set array directly
    } catch (error) {
      console.error("Error fetching to-dos:", error);
    }
  };

  useEffect(() => {
    fetchToDo();
  }, []);

  const handleDeleteToDo = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ToDo?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/deleteToDo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Task deleted successfully");
      fetchAdminToDo();
    } catch (error) {
      console.error("Error deleting ToDo:", error);
      alert("Failed to delete ToDo");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/updateTodoStatus/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAdminToDo();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow mt-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">My ToDo List</h2>

        {/* Form Inputs */}
        <div className="grid grid-cols-5 gap-2 mb-4  text-black">
          <input
            type="text"
            value={newTodo.task}
            onChange={(e) => setNewTodo({ ...newTodo, task: e.target.value })}
            placeholder="Task"
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring focus:border-blue-400"
          />
          <select
            value={newTodo.priority}
            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none"
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
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none"
          />
          <input
            type="date"
            value={newTodo.date}
            onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none"
          />
        </div>

        <button
          onClick={AddNewToDo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
          Add
        </button>

        {/* Table Display */}
        <table className="min-w-full table-auto text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Task</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Priority</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {toDo?.map((item, index) => (
              <tr key={index} className="border-t text-black">
                <td className="px-4 py-2 border">{item.task}</td>
                <td className="px-4 py-2 border">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                    className={`px-2 py-1 rounded text-sm
                      ${item.status === "Not Started" ? "bg-gray-200 text-gray-800" : ""}
                      ${item.status === "In Progress" ? "bg-yellow-200 text-yellow-800" : ""}
                      ${item.status === "Completed" ? "bg-green-200 text-green-800" : ""}
                    `}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">{item.priority}</td>
                <td className="px-4 py-2 border">{item.time}</td>
                <td className="px-4 py-2 border">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDeleteToDo(item._id)}
                    className="text-red-600 px-3 py-1 rounded text-md"
                  >
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
