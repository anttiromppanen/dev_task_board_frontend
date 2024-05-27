import Container from "./Container";
import Header from "./Header";
import TasksSection from "./Tasks/TasksSection";

function Taskboard() {
  return (
    <Container>
      <Header />
      <TasksSection />
    </Container>
  );
}

export default Taskboard;
