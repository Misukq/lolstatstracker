'use client'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MatchCard from '@/components/MatchCard';

export default function Summoners( { params }: {params: {summonerSlug: string}} ){
    const [ summonerName, setSummonerName ] = useState((params.summonerSlug).replace('-','/'))
    const [ name, setName ] = useState('')
    const [ tag, setTag ] = useState('')
    const [ summonerData, setSummonerData ] = useState<any>(null)
    const [ matches, setMatches ] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        const fetchSummonerData = async () => {
            try{
                const res = await  axios.post(`/api/riot/player`, {gameName: summonerName, option: 2} )
                setSummonerData(res.data.profil)
                setMatches(res.data.matches)

                const [name, tag] = params.summonerSlug.split('-');
                setName(name)
                setTag("#"+tag)
            }
            catch(err){
                setError('Erreur lors de la récupération des données du joueur')
            }
        }
        fetchSummonerData()
    }, [summonerName])
    
    // console.log(summonerData.id)
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <div>
            {summonerData && (
                <div className="text-white pt-8 px-8">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-6">
                        <div className="flex flex-col items-start bg-gray-700 p-4 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
                            <div className="flex items-center mb-4">
                                <img 
                                    src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${summonerData.profileIconId}.png`}
                                    alt="Profile Icon"
                                    className="w-20 h-20 rounded-full mr-4"
                                />
                                <div>
                                    <p className="text-xl">
                                        <span className="font-bold text-white">{ name }</span> 
                                        <span className="text-gray-400 uppercase font-normal"> { tag }</span>
                                    </p>
                                    <p className="text-sm text-gray-400">Level: {summonerData.summonerLevel}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            { matches ? (
                <div className="text-white pt-8 px-8">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-6">
                        <div className="flex flex-col items-start bg-gray-700 p-4 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-2">Matches History</h2>
                            <div className="mt-4 w-full">
                                {matches.map(match => (
                                    <MatchCard match={match} summonerId={summonerData.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
                        <svg className="animate-spin h-8 w-8 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 4.418 3.582 8 8 8v-4zm12-1.729A7.96 7.96 0 0120 12h4c0 4.418-3.582 8-8 8v-4z"></path>
                        </svg>
                        <p className="text-center mt-2">Loading...</p>
                    </div>
                </div>
            )}
        </div>
    )
}