"use client";

import { TodosTable } from "./components/todos-table";
import { AdminHeader } from "./components/admin-header";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const res = await fetch("/api/todos", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllTodos();
  }, []);

  return (
    <div className="container mx-auto md:px-10">
      <AdminHeader />

      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-base md:text-2xl font-bold mb-2">
                Your Todo Dashboard
              </h1>
              <p className="text-primary-foreground/80 text-sm md:text-base">
                Manage your tasks efficiently
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 px-4">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        <TodosTable todos={todos} />
      </div>
    </div>
  );
}
