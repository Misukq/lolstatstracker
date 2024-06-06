'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export const EditCaisseForm = ({id, nom}) => {
    const [newNom, setNewNom] = useState(nom)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await fetch(`/api/caisses/${id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ newNom }),
          });
    
          if (!res.ok) {
            throw new Error("Failed to update caisse");
          }
    
          router.refresh();
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={(e) => setNewNom(e.target.value)} value={newNom} className="border border-slate-500 px-8 py-2" placeholder="Nom de la caisse" type="text"></input>
            <button className="bg-yellow-600 font-bold text-white py-3 px-6 w-fit">Update caisse</button>
        </form>
    )
}