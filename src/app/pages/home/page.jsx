"use client";

import { useAuth } from "@/app/hooks/useAuth";

function Home() {
  const { userEmail } = useAuth();

  return (
    <div>{userEmail ? <h1>Welcome {userEmail}!</h1> : <p>Loading...</p>}</div>
  );
}

export default Home;
