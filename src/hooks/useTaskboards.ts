import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createTaskboard,
  getMultipleTaskboards,
} from "../services/taskboard_service";
import useConditionalViewsStore from "../store/conditionalViewsStore";
import useTaskboardStore from "../store/taskboardStore";
import { ITaskboard } from "../types/Task.types";

const useTaskboards = () => {
  const { taskboardsFromLocalStorage } = useTaskboardStore((state) => state);
  const { setTaskboardsFromLocalStorage } = useTaskboardStore((state) => state);
  const { setShowSavedTaskboards } = useConditionalViewsStore((state) => state);

  const onSuccessFilterLocalStorage = (data: ITaskboard[]) => {
    const localStorageTaskboards = JSON.parse(
      localStorage.getItem("taskboards") || "",
    );

    const responseTaskboardIdsSet = new Set(
      data.map((taskboard: ITaskboard) => taskboard.id),
    );
    const filteredLocalStorage = localStorageTaskboards.filter((id: string) =>
      responseTaskboardIdsSet.has(id),
    );

    setTaskboardsFromLocalStorage(filteredLocalStorage);
    localStorage.setItem("taskboards", JSON.stringify(filteredLocalStorage));
  };

  const {
    data: taskboardsFromQuery,
    isLoading: taskboardsAreLoading,
    isError: taskboardsIsError,
  } = useQuery({
    queryKey: ["taskboards"],
    queryFn: () => getMultipleTaskboards(taskboardsFromLocalStorage),
    refetchOnWindowFocus: false,
    enabled: taskboardsFromLocalStorage.length > 0,
    onSuccess: (data) => onSuccessFilterLocalStorage(data),
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

      setTaskboardsFromLocalStorage(
        JSON.parse(localStorage.getItem("taskboards") || ""),
      );
    };

    getInitialTaskboard();
  }, [mutateAsync, setTaskboardsFromLocalStorage]);

  const handleShowTaskboards = async () => {
    setShowSavedTaskboards(true);
  };

  return {
    taskboardsFromQuery,
    taskboardsAreLoading,
    taskboardsIsError,
    setShowSavedTaskboards,
    handleShowTaskboards,
  };
};

export default useTaskboards;
