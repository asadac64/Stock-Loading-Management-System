// src/components/CreateTaskForm.jsx
import React, { useState } from 'react';

const CreateTaskForm = () => {
  const [form, setForm] = useState({
    taskNumber: '',
    createdBy: '',
    assignedTo: '',
    product: '',
    startedAt: '',
    finishedAt: '',
    type: 'Regular Load',
    description: '',
    dimensions: '',
    weight: '',
    specialHandling: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Task:', form);
    // TODO: Call API to save the task
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Stock Loading Task</h2>
      
      <input name="taskNumber" placeholder="Task Number" value={form.taskNumber} onChange={handleChange} required className="input mb-2" />
      <input name="createdBy" placeholder="Created By" value={form.createdBy} onChange={handleChange} required className="input mb-2" />
      <input name="assignedTo" placeholder="Assigned To" value={form.assignedTo} onChange={handleChange} required className="input mb-2" />
      <input name="product" placeholder="Product" value={form.product} onChange={handleChange} required className="input mb-2" />
      
      <label className="block mb-1">Type</label>
      <select name="type" value={form.type} onChange={handleChange} className="input mb-2">
        <option value="Regular Load">Regular Load</option>
        <option value="Urgent Load">Urgent Load</option>
        <option value="Special Load">Special Load</option>
      </select>

      {form.type === 'Urgent Load' && (
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input mb-2" />
      )}

      {form.type === 'Special Load' && (
        <>
          <input name="dimensions" placeholder="Dimensions" value={form.dimensions} onChange={handleChange} className="input mb-2" />
          <input name="weight" placeholder="Weight" value={form.weight} onChange={handleChange} className="input mb-2" />
          <textarea name="specialHandling" placeholder="Special Handling Instructions" value={form.specialHandling} onChange={handleChange} className="input mb-2" />
        </>
      )}

      <input type="datetime-local" name="startedAt" value={form.startedAt} onChange={handleChange} className="input mb-2" />
      <input type="datetime-local" name="finishedAt" value={form.finishedAt} onChange={handleChange} className="input mb-2" />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Task</button>
    </form>

    
  );
};

export default CreateTaskForm;
