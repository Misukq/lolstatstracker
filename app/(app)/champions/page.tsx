'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Champions(){
    const [ champions, setChampions ] = useState(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchChampions = async () => {
            try{
                const res_champions = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json`)
                setChampions(res_champions.data.data)
            }
            catch(err){
                setError('Erreur lors de la récupération des champions.')
            }
        }
        fetchChampions()
    }, [])
    
    function formatName(champName: string){
        var name = champName
        if(name.includes("'")){
            name = name.replace("'","")
            return (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
        }
        else if(name.includes(" ")){
            return name.replace(" ","")
        }

        return name
    }

    if (!champions) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
                    <svg className="animate-spin h-8 w-8 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 4.418 3.582 8 8 8v-4zm12-1.729A7.96 7.96 0 0120 12h4c0 4.418-3.582 8-8 8v-4z"></path>
                    </svg>
                    <p className="text-center mt-2">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 bg-gray-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Object.values(champions).map((champion: any) => (
                    <Link 
                        key={champion.id} 
                        className="bg-gray-700 text-white p-2 rounded-lg shadow-lg flex transition transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                        href={`/champions/${formatName(champion.name)}`}
                    >
                        <img 
                            src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${champion.image.full}`} 
                            alt={champion.name} 
                            className="w-20 h-20 object-cover rounded-md mb-2 sm:w-32 sm:h-32 md:w-20 md:h-20" 
                        />
                        <div className="w-full px-2 md:block">
                            <div className="border-b">
                                <h2 className="text-md font-bold">{champion.name}</h2>
                            </div>
                            <p className="text-gray-400 text-xs">{champion.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
