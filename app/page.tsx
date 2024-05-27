import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";
import { Navbar } from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

export default async function Home() {

  const session = await getServerSession(authOptions)
  return (
    <main>
      <Navbar/>
      
      <div>
        <SearchBar/>
      </div>
      
      {/* <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>

      <h2>Client call</h2>
      <User/> */}
    </main>
  );
}
