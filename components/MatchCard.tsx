// components/MatchCard.tsx

import React from 'react';

const MatchCard = ({ match, summonerId }) => {
    const isWin = match.info.participants.find(participant => participant.summonerId === summonerId).win;
    const bgColor = isWin ? 'bg-blue-700' : 'bg-red-700';
    return (
        <div className={`p-4 mb-4 rounded-lg ${bgColor} text-white flex`}>
            <div className="flex-col">
                <h2 className="text-xl font-bold">Match classé Solo</h2>
                <p>il y a {Math.round((Date.now() - new Date(match.info.gameCreation)) / (1000 * 60 * 60 * 24))} jours</p>
                <p className='border-bottom'></p>
                <span>{isWin ? 'Victoire' : 'Défaite'}</span>
                <p>{Math.floor(match.info.gameDuration / 60)}:{match.info.gameDuration % 60 < 10 ? '0' : ''}{match.info.gameDuration % 60}</p>
            </div>
            
            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                    <img src={`https://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${match.championName}.png`} alt={match.championName} className="w-12 h-12 rounded-full" />
                    <div className="ml-4">
                        {/* <p className="text-lg font-bold">{match.stats.kills} / {match.stats.deaths} / {match.stats.assists}</p>
                        <p>{((match.stats.kills + match.stats.assists) / match.stats.deaths).toFixed(2)}:1 KDA</p> */}
                        <p className="text-lg font-bold"> 10/0/10</p>
                        <p>2.10:1 KDA</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchCard;
