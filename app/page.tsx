"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import User from "@/components/user";
import { Search, Plus, SunIcon, MoonIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddTask from "@/components/add-task";
import TaskCard from "@/components/ui/task-card";
import GetTask from "@/components/get-tasks";
import EditTask from "@/components/edit-task";
import { Card } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useThemeContext } from "@/components/theme-provider";
import { Skeleton } from "@/components/ui/skeleton";

type Task = {
  id: number;
  title: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  deadline: Date;
  status: "PROGRESS" | "COMPLETED";
  description: string;
};

const PRIORITY_ORDER: Record<string, number> = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export default function Home() {
  const [search, setSearch] = useState(false);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [taskElement, setTaskElement] = useState<Task | null>(null);
  const [activeButton, setActiveButton] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { theme, toggleTheme, isMounted } = useThemeContext();

  useEffect(() => {
    const fetchTasks = async (e: string) => {
      setIsLoading(false);
      try {
        let tasks: Task[] = [];
        if (activeButton === 1) {
          tasks = await GetTask(`/search?q=${e}`);
        } else if (activeButton === 2) {
          tasks = await GetTask(`/search?q=${e}&status=PROGRESS`);
        } else if (activeButton === 3) {
          tasks = await GetTask(`/search?q=${e}&status=COMPLETED`);
        }
        setTasksData(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setTasksData([]);
      } finally {
        setIsLoading(true);
      }
    };

    fetchTasks(searchValue);
  }, [activeButton, searchValue]);

  const handleAdd = () => {
    setAdd(true);
    setUpdate(false);
  };

  const handleUpdate = (e: Task) => {
    setAdd(false);
    setUpdate(true);
    setTaskElement(e);
  };

  const handleFilterChange = (value: string) => {
    const sortedTasks = [...tasksData].sort((a, b) => {
      if (value === "priority") {
        const priorityA = PRIORITY_ORDER[a.priority];
        const priorityB = PRIORITY_ORDER[b.priority];
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
        return a.title.localeCompare(b.title);
      } else if (value === "deadline") {
        const dateA = new Date(a.deadline).getTime();
        const dateB = new Date(b.deadline).getTime();
        if (dateA !== dateB) {
          return dateA - dateB;
        }
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    setTasksData(sortedTasks);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleCloseSearch = () => {
    setSearchValue("");
    setSearch((prev) => !prev);
  };

  if (!isMounted) {
    return (
      <div className="w-10 h-10"></div> // Placeholder loading
    );
  }

  return (
    <section className="mx-auto max-w-3xl py-4 md:px-0 px-4">
      <div className="flex justify-between items-center">
        <User />
        <div className="flex gap-6">
          <Button onClick={handleAdd} className="p-3 [&_svg]:!size-5">
            <Plus />
          </Button>
          <Button onClick={handleCloseSearch} className="p-3 [&_svg]:!size-5">
            <Search />
          </Button>
          <Button
            onClick={toggleTheme}
            className="p-3 [&_svg]:!size-5"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </div>
      </div>

      <div className="flex justify-between py-6">
        <h1 className="text-3xl font-bold text-text">My Tasks</h1>
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {search && (
        <Input
          className={`w-full ${add && "mb-4"}`}
          type="text"
          onChange={handleSearchChange}
          value={searchValue}
          placeholder="Search tasks..."
        />
      )}

      {update && taskElement && (
        <EditTask onClose={() => setUpdate(false)} e={taskElement} />
      )}

      {add && <AddTask onClose={() => setAdd(false)} />}

      <div className="grid grid-cols-3 gap-4 py-6">
        <Button
          isActive={activeButton === 1}
          onClick={() => setActiveButton(1)}
        >
          All Tasks
        </Button>
        <Button
          isActive={activeButton === 2}
          onClick={() => setActiveButton(2)}
        >
          In Progress
        </Button>
        <Button
          isActive={activeButton === 3}
          onClick={() => setActiveButton(3)}
        >
          Completed
        </Button>
      </div>

      {isLoading ? (
        tasksData.length === 0 ? (
          <Card className="flex items-center py-10">
            <p className="text-text">No tasks found</p>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {tasksData.map((task: Task) => (
              <TaskCard
                key={task.id}
                e={task}
                update={() => handleUpdate(task)}
              />
            ))}
          </div>
        )
      ) : (
        <Card className="px-6">
          <Skeleton className="w-20 h-5" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </Card>
      )}
    </section>
  );
}
