'use client'

import Pagination from "@/components/Pagination"
import { Alert } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Champions() {
    const [region, setRegion] = useState<string>('EUW1')
    const [challengers, setChallengers] = useState<null>(null)
    const [challengersData, setChallengersData] = useState(null)
    const [mode, setMode] = useState<string>('RANKED_SOLO_5x5')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const fetchChallengers = async () => {
        try {
            setLoading(true);
            const res_challengers = await axios.post(`/api/riot/challengers`, {
                region: region,
                mode: mode
            });
            setChallengers(res_challengers.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de la récupération des challengers');
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!challengers) {
            fetchChallengers();
        }
    }, [challengers, region, mode]);

    useEffect(() => {
        const fetchChallengersInfo = async () => {
            if(challengers){
                try{
                    setLoading(true)
                    const res_challengersInfo = await axios.post(`/api/riot/challengersInfo`, {
                        challengers,
                        page: currentPage,
                        region: region,
                    })
                    setChallengersData(res_challengersInfo.data)
                    setLoading(false)
                }
                catch (err) {
                    setError('Erreur lors de la récupération des données des joueurs')
                    setLoading(false)
                }
            }
        }

        fetchChallengersInfo()
        }, [challengers, currentPage, region])

    const handleRegionChange = (newRegion: string) => {
        setRegion(newRegion)
        setCurrentPage(1)
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    };

    const handleModeChange = (newMode: string) => {
        setMode(newMode);
        setCurrentPage(1);
    };

    const handleFetchChallengers = () => {
        fetchChallengers();
    };
    
    return (
        <div className='container flex flex-col text-white p-8 bg-gray-900 rounded-lg shadow-lg'>
            {error && <Alert variant="error">{error}</Alert>}
            <div className="flex items-center mb-4 text-black">
                <Label className="text-white font-bold mx-2">Region:</Label>
                <select
                    className="block w-24 px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    value={region}
                    onChange={(e) => handleRegionChange(e.target.value)}
                >
                    <option value="EUW1">EUW1</option>
                    <option value="BR1">BR1</option>
                    <option value="EUN1">EUN1</option>
                    <option value="JP1">JP1</option>
                    <option value="KR">KR</option>
                    <option value="LA1">LA1</option>
                    <option value="LA2">LA2</option>
                    <option value="NA1">NA1</option>
                    <option value="OC1">OC1</option>
                    <option value="PH2">PH2</option>
                    <option value="RU">RU</option>
                    <option value="SG2">SG2</option>
                    <option value="TH2">TH2</option>
                    <option value="TR1">TR1</option>
                    <option value="TW2">TW2</option>
                    <option value="VN2">VN2</option>
                </select>
                <Label className="text-white font-bold mx-2">Mode:</Label>
                <select
                    className="block w-24 px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    value={mode}
                    onChange={(e) => handleModeChange(e.target.value)}
                >
                    <option value="RANKED_SOLO_5x5">Solo</option>
                    <option value="RANKED_FLEX_SR">Flex</option>
                </select>
                <button
                    className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md"
                    onClick={handleFetchChallengers}
                >
                    Rafraîchir
                </button>
            </div>
            <div className="flex flex-col bg-gray-700 rounded-lg shadow-lg">
                <div className='border-b-2 border-gray-900'>
                    <h2 className="text-xs font-bold mb-2 px-4 mt-2">Classement</h2>
                </div>
                <div className='p-4'>
                    {loading ? ( // Affichage du chargement si en cours
                            <div className="flex justify-center items-center h-screen w-full">
                                <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
                                    <svg className="animate-spin h-8 w-8 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 4.418 3.582 8 8 8v-4zm12-1.729A7.96 7.96 0 0120 12h4c0 4.418-3.582 8-8 8v-4z"></path>
                                    </svg>
                                    <p className="text-center mt-2">Loading...</p>
                                </div>
                            </div>
                    ) : challengersData ? (
                        <>
                            {challengersData.map((player: any, index: number) => {
                                const totalGames = player.challenger.wins + player.challenger.losses;
                                const winRate = (player.challenger.wins / totalGames) * 100;
                                const loseRate = 100 - winRate;
                        
                                const winRateStyle = {
                                    width: `${winRate}%`,
                                    backgroundColor: '#3182CE',
                                };
                        
                                const loseRateStyle = {
                                    width: `${loseRate}%`,
                                    backgroundColor: '#E53E3E',
                                };
                        
                                return (
                                    <div key={index} className="bg-gray-800 rounded-md p-3 mb-2 md:p-4 md:mb-2 flex flex-col md:flex-row items-center">
                                        <div className="flex items-center justify-center w-full md:w-12 mr-0 md:mr-3 mb-2 md:mb-0">
                                            <span className="text-white">#{player.place}</span>
                                        </div>
                                        <div className="flex-shrink-0 w-12 h-12 mb-2 md:mb-0">
                                            <img className="w-full h-full rounded-full" src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${player.profileIconId}.png`} alt="Profile Icon" />
                                        </div>
                                        <div className="ml-4 flex flex-col justify-between flex-grow">
                                            <div className="flex items-center justify-between">
                                                <div className="font-bold text-white">
                                                    <Link href={`summoners/${region}/${encodeURIComponent(player.gameName)}-${player.tagLine}`}>{player.gameName}</Link>
                                                    <span className="text-gray-400 text-sm ml-2"> #{player.tagLine}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-gray-400">{player.challenger.leaguePoints} Lp</p>
                                                    <p className="text-gray-400 ml-4 md:ml-8">Level: {player.summonerLevel}</p>
                                                    <p className="text-gray-400 ml-4 md:ml-8">{winRate.toFixed(0)}%</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <div style={winRateStyle} className="h-2 rounded-l"></div>
                                                <div style={loseRateStyle} className="h-2 rounded-r"></div>
                                            </div>
                                            <div className="flex items-center justify-between text-xs mt-1 md:mt-2">
                                                <span className="text-white">{player.challenger.wins} W</span>
                                                <span className="text-white">{player.challenger.losses} L</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-screen w-full">
                            <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
                                <p className="text-center mt-2">Aucune donnée disponible</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Pagination currentPage={currentPage} totalPages={30} onPageChange={setCurrentPage} />
        </div>
    );
}
