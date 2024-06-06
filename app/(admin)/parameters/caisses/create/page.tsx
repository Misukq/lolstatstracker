'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CaisseCreate () {

  const [ name, setName ] = useState("")
  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    if (!name ) {
      alert("Name is required.");
      return
    }

    try {
      const res = await fetch("/api/caisses", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nom:name }),
      });

      if (res.ok) {
        router.push("/parameters/caisses");
      } else {
        throw new Error("Failed to create a caisse");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container pt-6 bg-gray-900 h-screen">
      <h2 className="text-2xl text-white font-bold mb-2">Ajouter une caisse</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input onChange={(e) => setName(e.target.value)} value={name} className="border border-slate-500 px-8 py-2" placeholder="Nom de la caisse" type="text"></input>
        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Add caisse</button>
      </form>
    </div>
  )
}