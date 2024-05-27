'use client'

import { useState } from 'react';
import axios from 'axios';

export const SearchBar = () => {
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [playerData, setPlayerData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
          setError('');
          setPlayerData(null);
    
          const apiKey = process.env.RIOT_API_KEY;
          const region = 'europe';
    
          const response = await axios.get(`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
            headers: {
              'X-Riot-Token': apiKey,
            },
          });
    
          setPlayerData(response.data);
        } catch (err) {
          setError('Erreur lors de la récupération des données du joueur. Veuillez vérifier les informations saisies.');
        }
      };

    return (
        <div>
            <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-md shadow-md">
                {/* <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="block w-32 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    <option value={'NA1'}>North America</option>
                    <option value={'EUW1'}>Europe West</option>
                    <option value={'EUN1'}>Europe Nordic & East</option>
                    <option value={'OC1'}>Oceania</option>
                    <option value={'KR'}>Korea</option>
                    <option value={'JP1'}>Japan</option>
                    <option value={'BR1'}>Brazil</option>
                    <option value={'LA2'}>LAS</option>
                    <option value={'LA1'}>LAN</option>
                    <option value={'RU'}>Russia</option>
                    <option value={'TR1'}>Türkiye</option>
                    <option value={'SG2'}>Singapore</option>
                    <option value={'PH2'}>Philippines</option>
                    <option value={'TW2'}>Tawain</option>
                    <option value={'VN2'}>Vietnam</option>
                    <option value={'TH2'}>Thailand</option>
                </select> */}
                <input
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    type="text"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    placeholder="Enter summoner name"
                />
                <input
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    type="text"
                    value={tagLine}
                    onChange={(e) => setTagLine(e.target.value)}
                    placeholder="Enter tag line"
                />
                <button onClick={handleSearch}>Search</button>

            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {playerData && (
                <div>
                <p>PUUID: {playerData.puuid}</p>
                <p>Game Name: {playerData.gameName}</p>
                <p>Tag Line: {playerData.tagLine}</p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
