"use client";

import { useAuth } from "@/app/hooks/useAuth";
import Header from "@/app/components/Header";

function Home() {
  const { userEmail } = useAuth();

  return (
    <div>
      <Header />
      <main className="p-4"></main>
    </div>
  );
}

export default Home;
