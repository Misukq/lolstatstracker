import axios from 'axios';
import { useRouter } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try{
        const { gameName } = await req.json();
        const apiKey = process.env.RIOT_API_KEY;
        if (!gameName) {
            return NextResponse.json({ error: 'Missing gameName parameter' }, { status: 400 });
        }
        
        // Get le puuid
        const url_puuid = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}`;
        const res_puuid = await axios.get(url_puuid, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": apiKey,
            }
        });
        return NextResponse.json(res_puuid.data);
    }
    catch(err){
        return NextResponse.json({ message: 'Erreur lors de la récupération des données du joueur' }, { status: 500 });
    }
};
