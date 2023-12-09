import { useState, useEffect } from "react";

const useGetData = () => {
  const initialData = JSON.parse(localStorage.getItem("task")) || [];
  const [taskData, setTaskData] = useState(initialData);
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskData));
  }, [taskData]);

  return [taskData, setTaskData];
};

export default useGetData;
