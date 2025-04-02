import SectionHeader from "./components/SectionHeader";
import { useApp } from "../../../data/DataContext";

const Tasks = () => {
  const { tasks, activeTask, setActiveTask, setPageTitle } = useApp();

  return (
    <div className="px-4 pb-2 pt-4">
      <SectionHeader title="TASKS" />
      <ul className="space-y-1">
        {tasks.map((item, index) => (
          <li
            key={index}
            className={`flex h-10 items-center justify-between rounded-md p-2 cursor-pointer ${
              activeTask === index ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTask(index);
              setPageTitle(item.name);
            }}
          >
            <div className="flex items-center">
              <span className="mr-2">{item.icon}</span>
              <span
                className={`text-sm ${
                  activeTask === index ? "font-semibold" : "font-normal"
                }`}
              >
                {item.name}
              </span>
            </div>
            {item.amount > 0 && (
              <span className="rounded-md bg-gray-200 px-2 py-0.5 text-xs">
                {item.amount}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;