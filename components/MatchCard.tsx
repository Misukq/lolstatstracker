
import React, { useEffect } from 'react';
import axios from 'axios';

const MatchCard = ({ match, summonerId, runes, spells }: {match: {match: null}, summonerId: {summonerId: string}, runes: {runes: any}, spells: {spells: any} }) => {
    const summoner = match.info.participants.find(participant => participant.summonerId === summonerId)
    const isWin = summoner.win;
    const bgColor = isWin ? '#28344e' : '#59343b';
    const borderColor = isWin ? 'border-blue-500' : 'border-red-500'; 
    const textColor = isWin ? 'text-blue-500' : 'text-red-500'; 

    const getRuneDetails = (runeId: string, other: any) => {
        for(let rune of runes){
            if(runeId == rune.id){
                if(other != null){
                    const r = rune.slots[0].runes.find(rune => rune.id == other)
                    return { icon: r.icon, name: r.name }
                }
                else{
                    return {icon:rune.icon, name:rune.name}
                }
            }
        }
        return null
    }
    const getSummonerSpells = (spellId: string) => {
        for(let spellKey in spells.data){
            if(spells.data.hasOwnProperty(spellKey)){
                const spell = spells.data[spellKey]
                if(spell.key == spellId.toString()){
                    return { icon: spell.id, name: spell.name }
                }
            }
        }
        return null
    }
    const primaryRune = getRuneDetails(summoner.perks.styles.find(style => style.description === 'primaryStyle').style, summoner.perks.styles.find(style => style.description === 'primaryStyle').selections.map(selection => selection.perk)[0])
    const secondaryRune = getRuneDetails(summoner.perks.styles.find(style => style.description === 'subStyle').style,null)
    const summonerSpell_1 = getSummonerSpells(summoner.summoner1Id)
    const summonerSpell_2 = getSummonerSpells(summoner.summoner2Id)
    
    const team_1 = []

    return (
        <div style={{ backgroundColor: bgColor }} className={`border-l-4 ${borderColor} p-4 mb-4 rounded-lg text-white flex`}>
            <div className="flex-col mr-3">
                <div className="mb-2">
                    <h2 className={`text-sm font-bold ${textColor}`}>Match classé Solo</h2>
                    <p className='text-gray-400 text-xs'>il y a {Math.round((Date.now() - new Date(match.info.gameCreation)) / (1000 * 60 * 60 * 24))} jours</p>
                </div>
                    
                <div>
                    <span className='text-gray-400 text-xs'>{isWin ? 'Victoire' : 'Défaite'}</span>
                    <p className='text-gray-400 text-xs'>{Math.floor(match.info.gameDuration / 60)}:{match.info.gameDuration % 60 < 10 ? '0' : ''}{match.info.gameDuration % 60}</p>
                </div>
            </div>
            
            <div className='flex-col'>
                <div className='flex'>
                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${summoner.championName}.png`} alt={summoner.championName} className="w-12 h-12 rounded-full" />
                    {/* Level : {summoner.champLevel} */}
                    <div className='flex-col pl-1'>
                        {summonerSpell_1 && <img src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/spell/${summonerSpell_1.icon}.png`} alt={summonerSpell_1.name} className="w-6 h-6 mt-1" />}
                        {summonerSpell_2 && <img src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/spell/${summonerSpell_2.icon}.png`} alt={summonerSpell_2.name} className="w-6 h-6 mt-1" />}
                    </div>
                    <div className='flex-col pl-1'>
                        {primaryRune && <img src={`https://ddragon.leagueoflegends.com/cdn/img/${primaryRune.icon}`}  alt={primaryRune.name} className="w-6 h-6 rounded-full bg-black mt-1" />}
                        {secondaryRune && <img src={`https://ddragon.leagueoflegends.com/cdn/img/${secondaryRune.icon}`}  alt={secondaryRune.name} className="w-6 h-6 rounded-full mt-1" />}
                    </div>
                    <div className='flex-row p-2'>
                        <div>
                            <span className='font-bold text-white'>{ summoner.kills }</span> <span className='text-gray-400 text-sm'>/</span> <span className='text-red-500 font-bold'>{ summoner.deaths }</span> <span className='text-gray-400 text-sm'>/</span> <span className='font-bold text-white'>{ summoner.assists }</span>
                        </div>
                        <div className='text-xs text-gray-400'>
                            { ((summoner.kills + summoner.assists)/summoner.deaths).toFixed(2) }:1 KDA
                        </div>
                    </div>
                </div>
                <div className='flex-row'>
                    items
                </div>
            </div>

            {/* <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                    <img src={`https://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${match.championName}.png`} alt={match.championName} className="w-12 h-12 rounded-full" />
                    <div className="ml-4">
                        <p className="text-lg font-bold">{match.stats.kills} / {match.stats.deaths} / {match.stats.assists}</p>
                        <p>{((match.stats.kills + match.stats.assists) / match.stats.deaths).toFixed(2)}:1 KDA</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default MatchCard;
