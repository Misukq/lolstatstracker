'use client'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MatchCard from '@/components/MatchCard';
import { Alert } from '@/components/ui/alert';

export default function Summoners( { params }: {params: {regionSlug: string, summonerSlug: string}} ){
    const [ summonerName, setSummonerName ] = useState((params.summonerSlug).replace('-','/'))
    const [ region, setRegion ] = useState(params.regionSlug)
    const [ name, setName ] = useState(decodeURIComponent(params.summonerSlug.split('-')[0]))
    const [ tag, setTag ] = useState('#'+params.summonerSlug.split('-')[1])
    
    const [puuid, setPuuid] = useState<any>(null)
    const [ rankData, setRankData] = useState<any>(null)
    const [ summonerData, setSummonerData ] = useState<any>(null)
    const [ matches, setMatches ] = useState<any>(null)

    const [ runes, setRunes ] = useState<any>(null)
    const [ spells, setSpells ] = useState<any>(null)

    const [error, setError] = useState<string | null>(null)

    // User info
    useEffect(() => {
        const fetchSummonerData = async () => {
            try{
                const res_puuid = await axios.post(`/api/riot/searchBar`, {gameName: summonerName} )
                setPuuid(res_puuid.data.puuid)
                const res_profile = await axios.post(`/api/riot/profile`, {puuid: res_puuid.data.puuid, region: region} )
                setSummonerData(res_profile.data)
            }
            catch(err){
                setError('Erreur lors de la récupération des données du joueur')
            }
        }
        fetchSummonerData()
    }, [summonerName])

    // Matches info et rank
    useEffect(() => {
        const fetchSummonerMatches = async () => {
            if (!puuid) return;
            try{
                const [res_matches, res_runes, res_spell] = await Promise.all([
                    axios.post(`/api/riot/matcheshistory`, { puuid }),
                    axios.get(`https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/runesReforged.json`),
                    axios.get(`https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/summoner.json`),
                ]);
                setMatches(res_matches.data)
                setRunes(res_runes.data)
                setSpells(res_spell.data)
            }
            catch(err){
                setError('Erreur lors de la récupération de l\'historique des matches')
            }
        }
        fetchSummonerMatches()
    }, [puuid])

    useEffect(() => {
        const fetchRankInfo = async () => {
            if (!summonerData) return;
            try {
                const res_rank = await axios.post(`/api/riot/rank`, { summonerData, region: region });
                setRankData(res_rank.data)
            } catch (error) {
                setError('Erreur lors de la récupération des informations sur le classement');
            }
        };
        fetchRankInfo();
    }, [summonerData]);

    const refreshInfo = async () => {
        try {
            const [res_matches, res_runes, res_spell, res_rank] = await Promise.all([
                axios.post(`/api/riot/matcheshistory`, { puuid }),
                axios.get(`https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/runesReforged.json`),
                axios.get(`https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/summoner.json`),
                axios.post(`/api/riot/rank`, { summonerData, region: region })
            ]);
            setMatches(res_matches.data)
            setRunes(res_runes.data)
            setSpells(res_spell.data)
            setRankData(res_rank.data)

        } catch (error) {
            setError('Erreur lors de l\'actualisation de la page.');
        }
    }

    return (
        <div className=''>
            { error && <Alert variant="error">{error}</Alert>}
            <div className='container flex flex-col text-white p-8 bg-gray-900 rounded-lg shadow-lg'>
                { (matches && runes && summonerData && rankData) ? (
                    <>
                        <div className='w-full md:flex md:flex-row md:justify-between'>
                            <div className='md:w-1/3'>

                                <div className='flex flex-col bg-gray-700 rounded-lg shadow-lg m-2'>
                                    <div className='border-b-2 border-gray-900'>
                                        <h2 className="text-xs font-bold mb-2 px-4 mt-2">Profile Information</h2>
                                    </div>
                                    <div className="flex items-center mb-4 p-4 justify-between">
                                        <div className='flex items-center'>
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
                                        <div className="hidden md:block">
                                            <button 
                                                className="px-4 py-2 bg-gray-900 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2" 
                                                onClick={refreshInfo}
                                            >
                                                <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                                                </svg> 
                                                Refresh
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:hidden">
                                        <button 
                                            className="px-4 py-2 bg-gray-900 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2" 
                                            onClick={refreshInfo}
                                        >
                                            <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                                            </svg> 
                                            Refresh
                                        </button>
                                    </div>
                                </div>

    
                                <div className="flex flex-col bg-gray-700 rounded-lg shadow-lg m-2">
                                    <div className='border-b-2 border-gray-900'>
                                        <h2 className="text-xs font-bold mb-2 px-4 mt-2">Classé Solo</h2>
                                    </div>
                                    <div className='flex items-center mb-4 p-4 justify-between'>
                                        {rankData.length > 0 && rankData[0] ? (
                                        <>
                                            <div className='flex items-center'>
                                                <div className='px-2'>
                                                    <img src={`/img/ranks/${rankData[0].tier}.png`} alt={`${rankData[0].tier}`} className="w-20 h-20 bg-black rounded-full bg-gray-800" />
                                                </div>
                                                <div>
                                                    <div className='text-white font-bold text-xl'>{rankData[0].tier} {rankData[0].rank}</div> 
                                                    <div className='text-sm text-gray-400'>{rankData[0].leaguePoints} LP</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-sm text-gray-400 text-right'>{rankData[0].wins}V {rankData[0].losses}D</div>
                                                <div className='text-sm text-gray-400'>{ ((rankData[0].wins + rankData[0].losses) > 0 ? "Taux de Victoire "+((rankData[0].wins / (rankData[0].wins + rankData[0].losses)) * 100).toFixed(0)+"%" : 0 ) }</div>
                                            </div>
                                        </>
                                        ):(
                                            <div>Unranked</div>
                                        )}
                                    </div>
                                </div>
    
                                <div className="flex flex-col bg-gray-700 rounded-lg shadow-lg m-2">
                                    <div className='border-b-2 border-gray-900'>
                                        <h2 className="text-xs font-bold mb-2 px-4 mt-2">Classé Flexible</h2>
                                    </div>
                                    <div className='flex items-center p-4 justify-between'>
                                        {rankData.length > 0 && rankData[1] ? (
                                        <>
                                            <div className='flex items-center'>
                                                <div className='px-2'>
                                                    <img src={`/img/ranks/${rankData[1].tier}.png`} alt={`${rankData[1].tier}`} className="w-10 h-10 bg-black rounded-full bg-gray-800" />
                                                </div>
                                                <div>
                                                    <div className='text-white font-bold text-md'>{rankData[1].tier} {rankData[1].rank}</div> 
                                                    <div className='text-xs text-gray-400'>{rankData[1].leaguePoints} LP</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-xs text-gray-400 text-right'>{rankData[1].wins}V {rankData[1].losses}D</div>
                                                <div className='text-xs text-gray-400'>{ ((rankData[1].wins + rankData[1].losses) > 0 ? "Taux de Victoire "+((rankData[1].wins / (rankData[1].wins + rankData[1].losses)) * 100).toFixed(0)+"%" : 0 ) }</div>
                                            </div>
                                        </>
                                        ):(
                                            <div>Unranked</div>
                                        )}
                                    </div>
                                </div>
    
                            </div>
    
                            <div className='md:w-2/3'>
                                <div className="flex flex-col bg-gray-700 rounded-lg shadow-lg m-2 w-full">
                                    <div className='border-b-2 border-gray-900'>
                                        <h2 className="text-xs font-bold mb-2 px-4 mt-2">Historique des matches</h2>
                                    </div>
                                    <div className='p-4'>
                                        {(matches.length > 0 ? (
                                            <>
                                                {matches.map((match: any) => (
                                                    <MatchCard key={match.id} match={match} summonerId={summonerData.id} runes={runes} spells={spells} />
                                                ))}
                                            </>
                                            ):
                                            (
                                                <>
                                                    <div>Pas de matches trouvés.</div>
                                                </>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
    
                        </div>
                    </>
                ):(
                    <div className="flex justify-center items-center h-screen w-full">
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
        </div>
    )
    
}