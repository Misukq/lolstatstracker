
import React, { useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";

const MatchCard = ({ match, summonerId, runes, spells }: {match: {match: null}, summonerId: {summonerId: string}, runes: {runes: any}, spells: {spells: any} }) => {
    const summoner = match.info.participants.find(participant => participant.summonerId === summonerId)
    const isWin = summoner.win;
    const bgColor = isWin ? '#28344e' : '#59343b';
    const bg2Color = isWin ? '#2F436E' : '#703C47';
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
    
    const roles = ["TOP","JUNGLE","MIDDLE","BOTTOM","UTILITY"];
    const team1 = match.info.participants.filter(participant => participant.teamId === 100);
    const team2 = match.info.participants.filter(participant => participant.teamId === 200);

    const truncateName = (name: string, maxLength = 7) => {
        return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
    };

    const renderTeam = (team: [], gameMode: any) =>{
        if(gameMode == "CLASSIC"){
            return(
                <div className='flex flex-col mx-1'>
                    {
                        roles.map(role => {
                            const player = team.find(participant => participant.teamPosition.toUpperCase() == role);
                            if(player){
                                return (
                                    <div key={player.summonerId} className='flex py-0.5'>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${player.championName}.png`} alt={player.championName} className="w-4 h-4" />
                                        <Link className={`text-xs px-1 ${ player.summonerName == summoner.summonerName ? 'text-white' : 'text-gray-400'}`} href={`/summoners/${match.info.platformId}/${player.riotIdGameName}-${player.riotIdTagline}`}>{truncateName(player.riotIdGameName)}</Link>
                                    </div>
                                )
                            }
                        }) 
                    }
                </div>
            )
        }
        else if(gameMode == "ARAM"){
            return (
                <div className='flex flex-col mx-1'>
                    {team.map((player) => (
                        <div key={player.summonerId} className='flex py-0.5'>
                            <img src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${player.championName}.png`} alt={player.championName} className="w-4 h-4" />
                            <Link className={`text-xs px-1 ${ player.summonerName == summoner.summonerName ? 'text-white' : 'text-gray-400'}`} href={`/summoners/${match.info.platformId}/${player.riotIdGameName}-${player.riotIdTagline}`}>{truncateName(player.riotIdGameName)}</Link>
                        </div>
                    ))}
                </div>
            )
        }
    }

    const renderItems = () => {
        const itemIds = [
            summoner.item0,
            summoner.item1,
            summoner.item2,
            summoner.item3,
            summoner.item4,
            summoner.item5,
            summoner.item6,
        ];

        return (
            <div className='flex justify-center items-center mt-2'>
                {itemIds.map((itemId, index) => (
                    (itemId !== 0) ? <img key={index} src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${itemId}.png`} alt={`Item ${itemId}`} className="w-6 h-6 mx-0.5" />
                    : (<div key={index} className="w-6 h-6 mx-0.5" style={{ backgroundColor: bg2Color}}></div>)
                ))}
            </div>
        );
    };

    const renderTime = (gameCreation: any) => {
        const timeDifference = Math.round((Date.now() - new Date(gameCreation)) / (1000 * 60)); // Différence de temps en minutes

        let timeAgo = '';

        if (timeDifference < 60) {
            timeAgo = `il y a ${timeDifference} minutes`;
        } else if (timeDifference < 1440) {
            timeAgo = `il y a ${Math.round(timeDifference / 60)} heures`;
        } else {
            timeAgo = `il y a ${Math.round(timeDifference / 1440)} jours`;
        }

        return (timeAgo)
    }

    return (
        <div style={{ backgroundColor: bgColor }} className={`border-l-4 ${borderColor} p-4 mb-4 rounded-lg text-white flex flex-col md:flex-row md:justify-between w-full`}>
            <div className="flex flex-col items-start w-2/10'">
                <div className="mb-2">
                    <h2 className={`text-sm font-bold ${textColor}`}>
                        { 
                            match.info.gameMode === "ARAM" ? "ARAM" : 
                            match.info.queueId === 420 ? "Classé Solo" : 
                            match.info.queueId === 440 ? "Classé Flexible" : 
                            "Partie Normale"
                        }                    
                    </h2>
                    <p className='text-gray-400 text-xs'>{ renderTime(match.info.gameCreation) }</p>
                </div>
                <div>
                    <span className='text-gray-400 text-xs'>{isWin ? 'Victoire' : 'Défaite'}</span>
                    <p className='text-gray-400 text-xs'>{Math.floor(match.info.gameDuration / 60)}:{match.info.gameDuration % 60 < 10 ? '0' : ''}{match.info.gameDuration % 60}</p>
                </div>
            </div>
            
            <div className='flex flex-col items-center w-5/10'>
                <div className='flex'>
                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${summoner.championName}.png`} alt={summoner.championName} className="w-12 h-12 rounded-full" />
                    <div className='absolute bg-black text-white text-xs rounded-full px-1.5 py-0.5'>
                        {summoner.champLevel}
                    </div>
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
                    {renderItems()}
                </div>
            </div>

            <div className='flex flex-row items-end w-3/10'>
                <div className='flex-row'>
                    { renderTeam(team1, match.info.gameMode) }
                </div>
                <div className='flex-row'>
                    { renderTeam(team2, match.info.gameMode) }
                </div>
            </div>

        </div>
    );
};

export default MatchCard;
