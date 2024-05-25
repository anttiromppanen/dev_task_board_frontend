import logoImg from "./assets/images/Logo.svg";
import CreateTaskboard from "./components/CreateTaskboard";
import EditTask from "./components/EditTaskForm/EditTaskForm";
import Taskboard from "./components/Taskboard";
import useTaskboards from "./hooks/useTaskboards";
import useConditionalViewsStore from "./store/conditionalViewsStore";

function App() {
  const { showEditTask } = useConditionalViewsStore((state) => state);
  const { showSavedTaskboards } = useConditionalViewsStore((state) => state);
  const { handleShowTaskboards } = useTaskboards();

  return (
    <main>
      <Taskboard />
      <button
        type="button"
        onClick={handleShowTaskboards}
        className="fixed bottom-10 right-10 flex size-16 items-center justify-center rounded-full bg-userLightGrey"
      >
        <img src={logoImg} alt="Show taskboards" />
      </button>
      {showSavedTaskboards && <CreateTaskboard />}
      {showEditTask && <EditTask />}
    </main>
  );
}

export default App;
