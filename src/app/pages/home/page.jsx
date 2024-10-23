"use client";

import { useAuth } from "@/app/hooks/useAuth";
import Header from "@/app/components/Header";
import TaskBoard from "@/app/components/TaskBoard";

function Home() {
  useAuth();

  return (
    <div>
      <Header />
      <main className="p-4">
        <TaskBoard />
      </main>
    </div>
  );
}

export default Home;
