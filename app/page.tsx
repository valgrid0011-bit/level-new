import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link href="/dashboard">
        <button className="bg-blue-500 text-white px-8 py-2 rounded-full cursor-pointer">
          Dashboard
        </button>
      </Link>
    </div>
  );
}
