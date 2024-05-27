import useNewTask from "../../hooks/useNewTask";
import TaskForm from "./TaskForm";

function NewTaskForm() {
  const { handleSubmit } = useNewTask();

  return (
    <TaskForm
      error={undefined}
      handleDelete={() => {}}
      handleSubmit={handleSubmit}
      isError={false}
      isLoading={false}
      isLoadingDelete={false}
      notificationText="test"
      setNotificationText={() => {}}
      setShowNotification={() => {}}
      showNotification={false}
    />
  );
}

export default NewTaskForm;
