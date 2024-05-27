import type { NextApiRequest, NextApiResponse } from 'next';

const RIOT_API_KEY = process.env.RIOT_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { gameName, tagLine } = req.query;
    const { region } = req.query;

    if (typeof gameName !== 'string' || typeof tagLine !== 'string' || typeof region !== 'string') {
        res.status(400).json({ error: 'Invalid query parameters' });
        return;
    }

    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'X-Riot-Token': RIOT_API_KEY || ''
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch PUUID');
        }

        const data = await response.json();
        res.status(200).json({ puuid: data.puuid });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default handler;
