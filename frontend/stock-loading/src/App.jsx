import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateTaskForm from './component/CreateTaskForm';
import TaskForm from './component/TaskForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Stock Loading Task</h1>
      <TaskForm />
      
    </div>

  )
}

export default App
