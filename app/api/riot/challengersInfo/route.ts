import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const ITEMS_PER_PAGE = 10
const REQUEST_DELAY_MS = 50

export const POST = async (req: NextRequest) => {
    try {
        const { challengers, page, region } = await req.json();
        const apiKey = process.env.RIOT_API_KEY;

        challengers.entries.sort((a: any, b: any) => b.leaguePoints - a.leaguePoints);

        const startIndex = (page-1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE

        const challengersGroup = challengers.entries.slice(startIndex, endIndex)
        const challengersData = []

        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        var i = 1
        for(const challenger of challengersGroup){
            
            const url_profile1 = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${challenger.summonerId}`
            const res_profile1 = await axios.get(url_profile1, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Origin": "https://developer.riotgames.com",
                    "X-Riot-Token": apiKey
                }
            });
            await delay(REQUEST_DELAY_MS);

            const profileIconId = res_profile1.data.profileIconId
            const summonerLevel = res_profile1.data.summonerLevel
            const puuid = res_profile1.data.puuid

            const url_profile2 = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`
            const res_profile2 = await axios.get(url_profile2, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Origin": "https://developer.riotgames.com",
                    "X-Riot-Token": apiKey
                }
            });
            await delay(REQUEST_DELAY_MS);

            const gameName = res_profile2.data.gameName
            const tagLine = res_profile2.data.tagLine
            const place = startIndex+i

            challengersData.push({challenger, profileIconId, summonerLevel, gameName, tagLine, place})
            i++
        }

        return NextResponse.json(challengersData)
    } catch (err) {
        return NextResponse.json({ error: err, message: 'Erreur lors de la récupération des challengers' }, { status: 500 });
    }
};
