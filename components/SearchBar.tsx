'use client'

import { useState } from 'react';
import axios from 'axios';
import { Alert } from './ui/alert';
import { useRouter } from 'next/navigation';

export const SearchBar = () => {
  const [gameName, setGameName] = useState('');
  const [region, setRegion] = useState('EUW1');
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSearch = async () => {
    
    try {
      const encodedName = encodeURIComponent(gameName.split('#')[0])
      const tag = gameName.split('#')[1]
      const response = await axios.post(`/api/riot/searchBar`, {gameName: encodedName+"/"+tag} );

      const redirect_url = `/summoners/${region}/${(gameName).replace('#','-')}`;

      try{
        router.push(redirect_url)
      }
      catch(err){
        console.log(err)
        setError('Erreur de redirection')
      }
      

    } catch (err) {
      setError('Erreur lors de la récupération des données du joueur. Veuillez vérifier les informations saisies.')
    }
  };

  return (
    <div className='shadow'>
      <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-md shadow-md">
        <select
          className="block w-24 px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
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
        <input
          className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          type="text"
          value={gameName}
          onChange={(e) => {
            setGameName(e.target.value)
          }}
          placeholder="Name#Tag"
        />
        <button 
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2" 
          onClick={handleSearch}
        >
            Search
        </button>
      </div>
      {error && <Alert variant="error">{error}</Alert>}
    </div>
  );
};

export default SearchBar;
