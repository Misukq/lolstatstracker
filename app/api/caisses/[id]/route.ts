import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { nom: nom } = await request.json();
        await prisma.caisse.update({
            where: { id: Number(id) },
            data: { nom, }
        });
        return { status: 200, body: { message: "Caisse updated" } };
    } catch (error) {
        console.error('Error updating caisse:', error);
        return { status: 500, body: { error: 'Internal Server Error' } };
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const caisse = await prisma.caisse.findUnique({
            where: { id: Number(id) }
        });
        return { status: 200, body: { caisse } };
    } catch (error) {
        console.error('Error fetching caisse:', error);
        return { status: 500, body: { error: 'Internal Server Error' } };
    }
}
