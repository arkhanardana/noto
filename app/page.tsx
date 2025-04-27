"use client";

import { Button } from "@/components/ui/button";
import User from "@/components/user";
import { Search, Plus, SunIcon } from "lucide-react";
import Filter from "@/components/filter";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import AddTask from "@/components/add-task";
import TaskCard from "@/components/ui/task-card";
import GetTask from "@/components/get-tasks";

export default function Home() {

  const [search, setSearch] = useState(false);
  const [add, setAdd] = useState(false);
  const [tasksData, setTasksData] = useState([]);

  useEffect(()=>{
    const fetchTasks = async () => {
      try {
        const tasks = await GetTask(); // Properly await the Promise
        setTasksData(tasks); // This will be the actual data array
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setTasksData([]); // Fallback to empty array on error
      }
    };
  
    fetchTasks();
  }, [])

  return (
    <section className="mx-auto max-w-3xl py-4 h-screen">
      <div className="flex justify-between items-center">
        <User />
        <div className="flex gap-6">
          <Button
            onClick={() => setAdd(true)}
            className="p-3 [&_svg]:!size-5"
          >
            <Plus />
          </Button>
          <Button
            onClick={() => setSearch((prev) => !prev)}
            className="p-3 [&_svg]:!size-5"
          >
            <Search />
          </Button>
          <Button className="p-3 [&_svg]:!size-5">
            <SunIcon />
          </Button>
        </div>
      </div>

      <div className="flex justify-between py-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Filter />
      </div>

      {search && (
        <Input className={`w-full ${add && 'mb-4'}`} type="text" placeholder="Search tasks..." />
      )}

      {add && <AddTask onClose={()=>setAdd(false)}/>}

      <div className="grid grid-cols-3 gap-4 py-6">
        <Button>All Tasks</Button>
        <Button>In Progress</Button>
        <Button>Completed</Button>
      </div>

      {/* <div className="border-2 min-h-40 w-full rounded-md border-black mt-6 flex items-center justify-center">
        <p className="text-gray-700">No tasks found</p>
      </div> */}
      <div className="flex flex-col gap-4">
      {
        tasksData.map((e,i)=>(
          <TaskCard key={i} e={e}/>
        ))
      }
      </div>
    </section>
  );
}
