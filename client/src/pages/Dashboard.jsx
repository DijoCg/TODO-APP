import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FaTrash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function Dashboard() {
  const [toDo, setToDo] = useState([]);
  const [newTodo, setNewTodo] = useState({
    task: "",
    priority: "",
    time: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});


  const AddNewToDo = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
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
      date: item.date.split("T")[0], // format for input type="date"
    });
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };


  const fetchToDo = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
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

  const handleStatusUpdate = async (id, newStatus) => {
    console.log(id, newStatus);
    try {
      console.log("handle status update");
      await axios.put(`http://localhost:5000/api/tasks/updateTodoStatus/${id}`,
        { status: newStatus },
      );
      fetchToDo();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteToDo = async (id) => {
    console.log("Inside delete todo:::");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/deleteTodo/${id}`, {
      });
      alert("Task deleted successfully");
      fetchToDo();
    } catch (error) {
      console.error("Error deleting ToDo:", error);
      alert("Failed to delete ToDo");
    }
  };
/* 
  const handleEditToDo = async (id) => {
    console.log("Inside edit todo:::");
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/tasks/editTodo/${id}`, {
      });
      alert("Task deleted successfully");
      fetchToDo();
    } catch (error) {
      console.error("Error deleting ToDo:", error);
      alert("Failed to delete ToDo");
    }
  }; */

  const handleEditToDo = async (id) => {
  console.log("Inside edit todo");
  console.log(editData);
  
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/tasks/editTodo/${id}`,
      editData, // <- send updated task data
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Task updated successfully");
    fetchToDo();
    setEditId(null); // Exit edit mode
  } catch (error) {
    console.error("Error updating ToDo:", error);
    alert("Failed to update ToDo");
  }
};


  return (
    <div className="min-h-[841px] flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📋 My ToDo Dashboard</h1>

        {/* Input Form */}
        <form
          onSubmit={AddNewToDo}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 text-black"
        >
          <input
            type="text"
            value={newTodo.task}
            onChange={(e) => setNewTodo({ ...newTodo, task: e.target.value })}
            placeholder="Task"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            value={newTodo.priority}
            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
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
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            required
          />
          <input
            type="date"
            value={newTodo.date}
            onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </form>

        {/* Table */}
        <tbody>
          {toDo.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 text-gray-700">
              <td className="px-4 py-2">
                {editId === item._id ? (
                  <input
                    name="task"
                    value={editData.task}
                    onChange={handleInputChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  item.task
                )}
              </td>
              <td className="px-4 py-2">
                <select
                  value={item.status}
                  onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                  className={`px-2 py-1 rounded-lg text-sm w-full
            ${item.status === "Not Started" && "bg-gray-200 text-gray-800"}
            ${item.status === "In Progress" && "bg-yellow-200 text-yellow-800"}
            ${item.status === "Completed" && "bg-green-200 text-green-800"}
          `}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td className="px-4 py-2">
                {editId === item._id ? (
                  <select
                    name="priority"
                    value={editData.priority}
                    onChange={handleInputChange}
                    className="border px-2 py-1 rounded w-full"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                ) : (
                  item.priority
                )}
              </td>

              <td className="px-4 py-2">
                {editId === item._id ? (
                  <input
                    name="time"
                    value={editData.time}
                    onChange={handleInputChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  item.time
                )}
              </td>
              <td className="px-4 py-2">
                {editId === item._id ? (
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleInputChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                )}
              </td>
              <td className="px-4 py-2">
                {editId === item._id ? (
                  <button
                    onClick={() => handleEditToDo(item._id)}
                    className="text-green-500 hover:text-green-700 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(item)}
                    className="text-blue-500 hover:text-blue-700 transition me-5"
                  >
                    <MdEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteToDo(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
          {toDo.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>

      </div>
    </div>
  );
}

export default Dashboard;
