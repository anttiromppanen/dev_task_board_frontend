import penImg from "../assets/images/Edit_duotone.svg";
import logoImg from "../assets/images/Logo.svg";
import useTaskboards from "../hooks/useTaskboards";
import useConditionalViewsStore from "../store/conditionalViewsStore";
import useTaskboardStore from "../store/taskboardStore";

function Header() {
  const { setShowEditTaskboard } = useConditionalViewsStore((state) => state);
  const { activeTaskboardIndex } = useTaskboardStore();
  const { taskboardsIsError, taskboardsAreLoading, taskboardsFromQuery } =
    useTaskboards();

  // taskboard selected by user
  const currentTaskboard =
    taskboardsFromQuery && taskboardsFromQuery[activeTaskboardIndex];

  return (
    <header className="mt-12">
      {taskboardsIsError && <h1>Error...</h1>}
      <div className="flex items-center">
        <img src={logoImg} alt="logo" className="mr-4" />
        <h1 className="text-[2.5rem]">
          {taskboardsAreLoading ? "Loading name..." : currentTaskboard?.name}
        </h1>
        <button
          type="button"
          onClick={() => setShowEditTaskboard(true)}
          className="rounded-full p-4"
        >
          <img src={penImg} alt="Edit taskboard" />
        </button>
      </div>
      <h2 className="ml-[58px] font-light lg:font-normal">
        {taskboardsAreLoading
          ? "Loading description..."
          : currentTaskboard?.description}
      </h2>
    </header>
  );
}

export default Header;
