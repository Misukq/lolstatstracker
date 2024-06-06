import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const ITEMS_PER_PAGE = 25;

export const POST = async (req: NextRequest) => {
    try {
        const { region, mode } = await req.json();
        const apiKey = process.env.RIOT_API_KEY;

        const url_challengers = `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${mode}` 
        const res_challengers = await axios.get(url_challengers, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": apiKey
            }
        });

        return NextResponse.json(res_challengers.data)
    } catch (err) {
        return NextResponse.json({ error: err, message: 'Erreur lors de la récupération des challengers' }, { status: 500 });
    }
};
