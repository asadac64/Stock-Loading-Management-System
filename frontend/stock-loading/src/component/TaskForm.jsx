import React, { useState, useEffect } from 'react';
import { createTask, getTasks, updateTask, deleteTask } from '../services/api';
import '../App'

function TaskForm() {
  const [form, setForm] = useState({
    task_number: '',
    created_by: '',
    assigned_to: '',
    product: '',
    started_at: '',
    finished_at: '',
    task_type: 'Regular Load',
    status_task: 'Created',
    description: '',
    dimensions: '',
    weight: '',
    special_handling: ''
  });

  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateTask(editId, form);
        alert('Task updated');
      } else {
        await createTask(form);
        alert('Task created');
      }
      setForm({
        task_number: '',
        created_by: '',
        assigned_to: '',
        product: '',
        started_at: '',
        finished_at: '',
        task_type: 'Regular Load',
        status_task: 'Created',
        description: '',
        dimensions: '',
        weight: '',
        special_handling: ''
      });
      setEditId(null);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert('Error saving task');
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error('Fetch failed', err);
    }
  };

  const handleEdit = (task) => {
    setForm({
      task_number: task.task_number || '',
      created_by: task.created_by || '',
      assigned_to: task.assigned_to || '',
      product: task.product || '',
      started_at: task.started_at ? task.started_at.slice(0, 16) : '',
      finished_at: task.finished_at ? task.finished_at.slice(0, 16) : '',
      task_type: task.task_type || 'Regular Load',
      status_task: task.status_task || 'Created',
      description: task.description || '',
      dimensions: task.dimensions || '',
      weight: task.weight || '',
      special_handling: task.special_handling || ''
    });
    setEditId(task.id);
  };

  const handleSave = async (taskId) => {
    try {
      await updateTask(taskId, form);
      alert('Task updated');
      setEditId(null);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert('Error saving task');
    }
  };

  const handleDelete = async (id) => {
    console.log('Deleting task ID:', id); // เช็คว่ามีค่าไหม
    try {
      await deleteTask(id);
      alert('Deleted!');
      fetchTasks();
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      alert('Delete failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <input name="task_number" onChange={handleChange} value={form.task_number} placeholder="Task Number" className="block mb-2 px-1 py-2" />
        <input name="created_by" onChange={handleChange} value={form.created_by} placeholder="Created By" className="block mb-2 px-1 py-2" />
        <input name="assigned_to" onChange={handleChange} value={form.assigned_to} placeholder="Assigned To" className="block mb-2 px-1 py-2" />
        <input name="product" onChange={handleChange} value={form.product} placeholder="Product" className="block mb-2 px-1 py-2" />
        <input name="started_at" onChange={handleChange} value={form.started_at} placeholder="Started At" type="datetime-local" className="block mb-2 px-1 py-2" />
        <input name="finished_at" onChange={handleChange} value={form.finished_at} placeholder="Finished At" type="datetime-local" className="block mb-2 px-1 py-2" />
        <select name="task_type" value={form.task_type} onChange={handleChange} className="block mb-2 px-1 py-2">
          <option>Regular Load</option>
          <option>Urgent Load</option>
          <option>Special Load</option>
        </select>

        {form.task_type === 'Urgent Load' && (
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input mb-2" />
        )}

        {form.task_type === 'Special Load' && (
          <>
            <input name="dimensions" placeholder="Dimensions" value={form.dimensions} onChange={handleChange} className="input mb-2" />
            <input name="weight" placeholder="Weight" value={form.weight} onChange={handleChange} className="input mb-2" />
            <textarea name="special_handling" placeholder="Special Handling Instructions" value={form.special_handling} onChange={handleChange} className="input mb-2" />
          </>
        )}

        <input name="status_task" onChange={handleChange} value={form.status_task} placeholder="Status" className="block mb-2 px-1 py-2" />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? 'Update Task' : 'Create Task'}
        </button>
        
      </form>
      <h3 className="mt-6 font-bold text-lg">All Tasks</h3>
      
      {tasks.length === 0 ? (
        <p className="text-gray-500 mt-4">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Task #</th>
                <th className="border px-3 py-2">Created By</th>
                <th className="border px-3 py-2">Assigned To</th>
                <th className="border px-3 py-2">Product</th>
                <th className="border px-3 py-2">Type</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Start</th>
                <th className="border px-3 py-2">End</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border px-3 py-2">
                    {editId === task.id ? (
                      <input
                        type="text"
                        name="task_number"
                        value={form.task_number}
                        onChange={handleChange}
                        className="block mb-2 px-1 py-2"
                      />
                    ) : (
                      task.task_number
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    {editId === task.id ? (
                      <input
                        type="text"
                        name="created_by"
                        value={form.created_by}
                        onChange={handleChange}
                        className="block mb-2 px-1 py-2"
                      />
                    ) : (
                      task.created_by
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    {editId === task.id ? (
                      <input
                        type="text"
                        name="assigned_to"
                        value={form.assigned_to}
                        onChange={handleChange}
                        className="block mb-2 px-1 py-2"
                      />
                    ) : (
                      task.assigned_to
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    {editId === task.id ? (
                      <input
                        type="text"
                        name="product"
                        value={form.assigned_to}
                        onChange={handleChange}
                        className="block mb-2 px-1 py-2"
                      />
                    ) : (
                      task.product
                    )}
                  </td>
                  <td className="border px-3 py-2">{task.task_type}</td>
                  <td className="border px-3 py-2">{task.status_task}</td>
                  <td className="border px-3 py-2">
                    {task.started_at?.slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="border px-3 py-2">
                    {task.finished_at?.slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="border px-3 py-2">
                    {editId === task.id ? (
                      <button
                        onClick={() => handleSave(task.id)}
                        className="text-green-600 hover:underline mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
  );
}

export default TaskForm;
