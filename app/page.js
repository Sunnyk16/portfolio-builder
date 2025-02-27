import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <main>
    {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="text-lg text-gray-600 mb-4">This is a dummy component using Tailwind CSS.</p> */}
      {/* <Image src="/path/to/image.jpg" alt="Dummy Image" width={500} height={300} /> */}
      <UserButton/>
      {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Click Me</button>
    </div> */}

    </main>
  );
}
