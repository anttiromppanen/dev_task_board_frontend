import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTaskboard } from "./services/taskboard_service";

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["taskboard"],
    queryFn: () => getTaskboard("66485ed5205af01e7331c312"),
  });

  if (isLoading) return <h1>Loading...</h1>;

  console.log(data);
  return (
    <main>
      <h1>Hello world</h1>
    </main>
  );
}

export default App;
