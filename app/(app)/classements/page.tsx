'use client'

import Pagination from "@/components/Pagination"
import { Alert } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Champions() {
    const [region, setRegion] = useState('EUW1')
    const [challengers, setChallengers] = useState(null)
    const [mode, setMode] = useState('RANKED_SOLO_5x5')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(3)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchChallengers = async () => {
            setLoading(true)
            setError('')
            try {
                const res_challengers = await axios.post(`/api/riot/challengers`, {
                    region: region,
                    page: currentPage,
                    mode: mode
                })
                setChallengers(res_challengers.data)
            } catch (err) {
                setError('Erreur lors de la récupération des données du joueur')
            } finally {
                setLoading(false)
            }
        }
        fetchChallengers()
    }, [region, currentPage, mode])

    const handleRegionChange = (newRegion: string) => {
        setRegion(newRegion)
        setCurrentPage(1)
    }

    return (
        <div className='container flex flex-col text-white p-8 bg-gray-900 rounded-lg shadow-lg'>
            {error && <Alert variant="error">{error}</Alert>}
            <div className="flex items-center mb-4 text-black">
                <Label className="text-white font-bold mx-2">Region :</Label>
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
                <Label className="text-white font-bold mx-2">Mode :</Label>
                <select
                    className="block w-24 px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                >
                    <option value="RANKED_SOLO_5x5">Solo</option>
                    <option value="RANKED_FLEX_SR">Flex</option>
                </select>
            </div>
            <div className="flex flex-col bg-gray-700 rounded-lg shadow-lg">
                <div className='border-b-2 border-gray-900'>
                    <h2 className="text-xs font-bold mb-2 px-4 mt-2">Classement</h2>
                </div>
                <div className='p-4'>
                    {loading ? (
                        <div className="flex justify-center items-center h-screen w-full">
                            <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
                                <svg className="animate-spin h-8 w-8 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 4.418 3.582 8 8 8v-4zm12-1.729A7.96 7.96 0 0120 12h4c0 4.418-3.582 8-8 8v-4z"></path>
                                </svg>
                                <p className="text-center mt-2">Loading...</p>
                            </div>
                        </div>
                    ) : (
                        challengers ? (
                            <>
                                <ul>
                                    {challengers.map((challenger: any) => (
                                        <li key={challenger.challenger.summonerId} className="flex justify-between items-center bg-gray-800 rounded-md p-4 mb-2">
                                            <div>
                                                <span className="font-bold text-white">{challenger.profile.summonerName}</span>
                                                <span className="text-gray-400 ml-2">{challenger.challenger.leaguePoints} LP</span>
                                            </div>
                                            <div className="text-gray-400">{challenger.challenger.wins}W / {challenger.challenger.losses}L</div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p className="text-center">Aucun challenger trouvé</p>
                        )
                    )}
                </div>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}
