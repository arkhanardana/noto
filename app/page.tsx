"use client";

import { Button } from "@/components/ui/button";
import User from "@/components/user";
import { Search, Menu, Plus } from "lucide-react";
import Filter from "@/components/filter";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import AddTask from "@/components/add-task";

export default function Home() {
  const [search, setSearch] = useState(false);
  const [add, setAdd] = useState(false);

  return (
    <section className="mx-auto max-w-3xl py-4 h-screen">
      <div className="flex justify-between items-center">
        <User />
        <div className="flex gap-6">
          <Button
            onClick={() => setAdd((prev) => !prev)}
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
            <Menu />
          </Button>
        </div>
      </div>

      <div className="flex justify-between py-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Filter />
      </div>

      {search && (
        <Input className="w-full" type="text" placeholder="Search tasks..." />
      )}

      <div className="grid grid-cols-4 gap-4 py-6">
        <Button>All Tasks</Button>
        <Button>To-Do</Button>
        <Button>In Progress</Button>
        <Button>Completed</Button>
      </div>

      {add && <AddTask />}

      <div className="border-2 min-h-40 w-full rounded-md border-black mt-6 flex items-center justify-center">
        <p className="text-gray-700">No tasks found</p>
      </div>
    </section>
  );
}
