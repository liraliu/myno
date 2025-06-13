"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Add your authentication check here
    // if (!session) {
    //   router.push('/')
    // }
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        {/* Add your dashboard content here */}
      </main>
    </div>
  );
}
