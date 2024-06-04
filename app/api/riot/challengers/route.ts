import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const { region, page, mode } = await req.json();
        const apiKey = process.env.RIOT_API_KEY;

        // Get le rank par le summonerId
        const url_challengers = `https://${region}.api.riotgames.com/lol/league-exp/v4/entries/${mode}/CHALLENGER/I?page=${page}`;
        const res_challengers = await axios.get(url_challengers, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": apiKey
            }
        });

        const challengers = res_challengers.data;

        // Fetch additional profile data in parallel
        const challengersDetails = await Promise.all(challengers.map(async (challenger: any) => {
            const url_profile = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${challenger.summonerId}`;
            try {
                const res_profile = await axios.get(url_profile, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Origin": "https://developer.riotgames.com",
                        "X-Riot-Token": apiKey
                    }
                });
                return { profile: res_profile.data, challenger };
            } catch (profileError) {
                return { profile: null, challenger };
            }
        }));

        return NextResponse.json(challengersDetails);
    } catch (err) {
        return NextResponse.json({ error: err, message: 'Erreur lors de la récupération du classement des joueurs' }, { status: 500 });
    }
};
