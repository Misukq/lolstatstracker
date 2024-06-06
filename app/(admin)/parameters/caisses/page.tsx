'use client'

import { RemoveBtn } from "@/components/RemoveBtn"
import Link from "next/link"
import { useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi"



export default async function CaisseList () {
    const [caisses, setCaisses] = useState([])

    useEffect(() => {
        const getCaisses = async () => {
            try {
              const res = await fetch("/api/caisses", {
                cache: "no-store",
              });
          
              if (!res.ok) {
                throw new Error("Failed to fetch caisses");
              }
          
              return res.json();
            } catch (error) {
              console.log("Error loading caisses: ", error);
            }
          };
    })

    return (
        <>
            <div className="mt-8">
                <Link href={`/parameters/caisses/create`} className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Add Caisse</Link>
                {caisses && caisses.map((c) => (
                    <div
                    key={c._id}
                    className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                    >
                    <div>
                        <h2 className="font-bold text-2xl">{c.nom}</h2>
                    </div>

                    <div className="flex gap-2">
                        <RemoveBtn id={c._id} />
                        <Link href={`/parameters/caisses/edit${c._id}`}>
                        <HiPencilAlt size={24} />
                        </Link>
                    </div>
                    </div>
                ))}
            </div>
        </>
    )
}