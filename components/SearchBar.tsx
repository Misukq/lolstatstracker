'use client'

import { useState } from 'react';
import axios from 'axios';
import { Alert } from './ui/alert';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';

export const SearchBar = () => {
  const [gameName, setGameName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSearch = async () => {
    
    try {
      const response = await axios.post(`/api/riot/searchBar`, {gameName: (gameName).replace('#','/')} );
      const redirect_url = `/summoners/${(gameName).replace('#','-')}`;

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
