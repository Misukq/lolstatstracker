import axios from 'axios';
import { useRouter } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try{
        const { puuid } = await req.json();
        const apiKey = process.env.RIOT_API_KEY;

        // Get l'historique des matches par le puuid (matches ID)
        const url_matches = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`
        const res_matches = await axios.get(url_matches, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": apiKey,
            }
        })
        
        // Get les infos des matches par matchID
        const matchesDetails = []
        for(const matchId of res_matches.data){
            console.log(matchId)
            const url_matchDetail = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`
            const res_matcheDetail = await axios.get(url_matchDetail, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Origin": "https://developer.riotgames.com",
                    "X-Riot-Token": apiKey,
                }
            })
            matchesDetails.push(res_matcheDetail.data)
        }

        return NextResponse.json(matchesDetails);
    }
    catch(err){
        return NextResponse.json({ message: 'Erreur lors de la récupération de l\'historique des matches' }, { status: 500 });
    }
};
