import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import logoImg from "./assets/images/Logo.svg";
import CreateTaskboard from "./components/CreateTaskboard";
import Taskboard from "./components/Taskboard";
import {
  createTaskboard,
  getMultipleTaskboards,
} from "./services/taskboard_service";
import { ITaskWithId } from "./components/Tasks/Task";
import EditTask from "./components/EditTask";

function App() {
  const [showSavedTaskboards, setShowSavedTaskboards] = useState(false);
  const [taskboards, setTaskboards] = useState<string[]>([]);
  const [activeTaskboardIndex, setActivetaskboardIndex] = useState(0);
  const [activeTask, setActiveTask] = useState<ITaskWithId | null>(null);
  const [showEditTask, setShowEditTask] = useState(true);

  const {
    data: taskboardsFromQuery,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["taskboards"],
    queryFn: () => getMultipleTaskboards(taskboards),
    refetchOnWindowFocus: false,
    enabled: taskboards.length > 0,
  });

  const { mutateAsync } = useMutation({
    mutationFn: () => createTaskboard("New taskboard", ""),
  });

  // initializes localStorage if needed and sets localStorage to state
  useEffect(() => {
    const getInitialTaskboard = async () => {
      const localStorageTaskboards = localStorage.getItem("taskboards");

      if (!localStorageTaskboards) {
        const newTaskboard = await mutateAsync();
        localStorage.setItem("taskboards", JSON.stringify([newTaskboard.id]));
      }

      setTaskboards(JSON.parse(localStorage.getItem("taskboards") || ""));
    };

    getInitialTaskboard();
  }, [mutateAsync]);

  const handleShowTaskboards = async () => {
    setShowSavedTaskboards(true);
  };

  return (
    <main>
      <Taskboard
        currentTaskboard={
          taskboardsFromQuery && taskboardsFromQuery[activeTaskboardIndex]
        }
        setActiveTask={setActiveTask}
        setShowEditTask={setShowEditTask}
        taskboardIsLoading={isLoading}
        taskboardIsError={isError}
      />
      <button
        type="button"
        onClick={handleShowTaskboards}
        className="fixed bottom-10 right-10 flex size-16 items-center justify-center rounded-full bg-userLightGrey"
      >
        <img src={logoImg} alt="Show taskboards" />
      </button>
      {showSavedTaskboards && (
        <CreateTaskboard
          setShowSavedTaskboards={setShowSavedTaskboards}
          taskboardsFromQuery={taskboardsFromQuery}
          setActivetaskboardIndex={setActivetaskboardIndex}
        />
      )}
      {showEditTask && (
        <EditTask
          setShowEditTask={setShowEditTask}
          activeTask={activeTask && activeTask}
        />
      )}
    </main>
  );
}

export default App;
