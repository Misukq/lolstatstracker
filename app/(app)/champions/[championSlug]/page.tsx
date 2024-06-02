'use client'

import axios from "axios";
import { useEffect, useState } from "react";

export default function Champions({ params }: { params: { championSlug: string } }) {
    const [championName, setChampionName] = useState(params.championSlug);
    const [champion, setChampion] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentSkinIndex, setCurrentSkinIndex] = useState(0);

    useEffect(() => {
        const fetchChampion = async () => {
            try {
                const res_champions = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion/${championName}.json`);
                setChampion(res_champions.data.data[championName]);
            } catch (err) {
                setError('Erreur lors de la récupération des champions.');
            }
        };
        fetchChampion();
    }, [championName]);

    const changeSkin = (increment: number) => {
        let newIndex = currentSkinIndex + increment;
        
        if (newIndex >= champion.skins.length) {
            newIndex = 0;
        }

        if (newIndex < 0) {
            newIndex = champion.skins.length - 1;
        }
        setCurrentSkinIndex(newIndex);
    };

    if (!champion) {
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

    const prevSkinIndex = currentSkinIndex > 0 ? currentSkinIndex - 1 : champion.skins.length - 1;
    const nextSkinIndex = currentSkinIndex < champion.skins.length - 1 ? currentSkinIndex + 1 : 0;

    return (
        <div className="container mx-auto p-4 bg-gray-900 text-white">
            <div className="flex flex-col items-center">
                <img src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${champion.image.full}`} alt={champion.name} className="w-32 h-32 rounded-full mb-4" />
                <h1 className="text-3xl font-bold mb-2">{champion.name}</h1>
                <p className="text-lg">{champion.title}</p>
                <p className="text-sm p-4 text-gray-400">{champion.lore}</p>
            </div>

            <div className='flex flex-col bg-gray-700 rounded-lg shadow-lg m-2 mt-4'>
                <div className='border-b-2 border-gray-900'>
                    <h2 className="text-xs font-bold mb-2 px-4 mt-2">Abilities</h2>
                </div>
                <div className="flex items-center mb-4 p-4 justify-between">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center">
                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/passive/${champion.passive.image.full}`} alt={champion.passive.name} className="w-8 h-8 border border-black" title={champion.passive.description} />
                                <h3 className="text-sm font-bold px-2">{champion.passive.name} <span className="text-gray-400 text-xs font-normal">(passive)</span></h3>
                            </div>
                            <p className="pt-1 text-xs text-gray-400" dangerouslySetInnerHTML={{ __html: champion.passive.description }}/>
                        </div>
                        {champion.spells.map((spell: any, index: number) => (
                            <div key={index}>
                                <div className="flex items-center">
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/spell/${spell.id}.png`} alt={spell.name} className="w-8 h-8 border border-black" title={spell.description} />
                                    <h3 className="text-sm font-bold px-2">{spell.name}</h3>
                                </div>
                                <p className="pt-1 text-xs text-gray-400" dangerouslySetInnerHTML={{ __html: spell.description}} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex flex-col bg-gray-700 rounded-lg shadow-lg m-2 mt-4'>
                <div className='border-b-2 border-gray-900'>
                    <h2 className="text-xs font-bold mb-2 px-4 mt-2">Tips</h2>
                </div>
                <div className="flex items-center mb-4 p-4 justify-between">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <ul>
                                {champion.allytips.map((tip: string, index: number) => (
                                    <li key={index} className="text-sm">{tip}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <ul>
                                {champion.enemytips.map((tip: string, index: number) => (
                                    <li key={index} className="text-sm">{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='flex flex-col bg-gray-700 rounded-lg shadow-lg m-2 mt-4'>
                <div className='border-b-2 border-gray-900'>
                    <h2 className="text-xs font-bold mb-2 px-4 mt-2">Skins</h2>
                </div>
                <div className="flex items-center mb-4 p-4 justify-center">
                    <div className="relative mr-4 hidden md:flex">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_${champion.skins[prevSkinIndex].num}.jpg`} alt={champion.skins[prevSkinIndex].name} className="w-64" />
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <button onClick={() => changeSkin(-1)} className="w-8 h-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="relative">
                            <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_${champion.skins[currentSkinIndex].num}.jpg`} alt={champion.skins[currentSkinIndex].name} className="w-64" />
                            <p className="absolute bottom-0 left-0 bg-gray-800 text-white p-2 text-sm">{champion.skins[currentSkinIndex].name}</p>
                        </div>
                        <button onClick={() => changeSkin(1)} className="w-8 h-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <div className="relative ml-4 hidden md:flex">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_${champion.skins[nextSkinIndex].num}.jpg`} alt={champion.skins[nextSkinIndex].name} className="w-64" />
                    </div>
                </div>
            </div>


        </div>
    );
}
