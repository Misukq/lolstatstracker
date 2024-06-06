import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { nom } = await request.json();
        const caisse = await prisma.caisse.create({
            data: {
                nom
            },
        });
        return NextResponse.json({ status: 201, body: { message: "Caisse Created", caisse } });
    } catch (error) {
        console.error('Error creating caisse:', error);
        return NextResponse.json({ status: 500, body: { error: 'Internal Server Error' } });
    }
}

export async function GET() {
    try {
        const caisses = await prisma.caisse.findMany();
        return NextResponse.json({ status: 200, body: { caisses } });
    } catch (error) {
        console.error('Error fetching caisses:', error);
        return NextResponse.json({ status: 500, body: { error: 'Internal Server Error' } });
    }
}

export async function DELETE(request) {
    try {
        const id = request.query.id as string;
        await prisma.caisse.delete({ where: { id } });
        return NextResponse.json({ status: 200, body: { message: 'Caisse deleted' } });
    } catch (error) {
        console.error('Error deleting caisse:', error);
        return NextResponse.json({ status: 500, body: { error: 'Internal Server Error' } });
    }
}
