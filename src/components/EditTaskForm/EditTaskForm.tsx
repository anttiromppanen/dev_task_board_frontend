import useDeleteTask from "../../hooks/useDeleteTask";
import useEditTask from "../../hooks/useEditTask";
import TaskForm from "./TaskForm";

function EditTask() {
  const {
    setNotificationText,
    setShowNotification,
    showNotification,
    isLoadingEdit,
    isErrorEdit,
    errorEdit,
    notificationText,
    handleSubmit,
  } = useEditTask();
  const { handleDelete, isLoadingDelete } = useDeleteTask();

  return (
    <TaskForm
      setNotificationText={setNotificationText}
      setShowNotification={setShowNotification}
      showNotification={showNotification}
      isError={isErrorEdit}
      error={errorEdit}
      notificationText={notificationText}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      isLoadingDelete={isLoadingDelete}
      isLoading={isLoadingEdit}
    />
  );
}

export default EditTask;
