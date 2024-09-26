'use client'
import { useRouter } from "next/navigation";
export default function Home() {
   const navigate = useRouter();
  return (
    <div className="Home">

         <h1>Welcome To NoteApp</h1>
         <button onClick={()=>navigate.push("/notePage")}> Visit NoteApp </button>
    </div>
  );
}
