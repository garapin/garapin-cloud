"use client";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import PublishCard from "@/components/publish-card";

export default function Publish() {
  const router = useRouter();
  return (
    <main className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl">My Application</h2>
          <button
            className="bg-blue-600 hover:bg-blue-600/80 flex items-center gap-2 text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/publish/new")}
          >
            <FaPlus className="w-6 h-6" />
            <span>Add New</span>
          </button>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <PublishCard key={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
