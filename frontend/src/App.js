import { useEffect, useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");



  // FETCH TASKS
  const fetchTasks = async () => {
    const response = await fetch("http://34.235.127.232:5000/tasks");
    const data = await response.json();
    setTasks(data);
  };


  // ADD TASK
  const addTask = async () => {

    await fetch("http://34.235.127.232:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: title,
        status: "Pending",
      }),
    });

    setTitle("");
    fetchTasks();
  };


  useEffect(() => {
    fetchTasks();
  }, []);


  return (

    <div style={{ padding: "30px" }}>

      <h1>Task Manager App</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;