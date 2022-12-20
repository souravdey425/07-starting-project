import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const fetchDetails = (dataFetch) => {
      const loadedTasks = [];

      for (const taskKey in dataFetch) {
        loadedTasks.push({ id: taskKey, text: dataFetch[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: "https://create-app2-a67fd-default-rtdb.firebaseio.com/tasks.json",
      },
      fetchDetails
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
