export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID do exame é obrigatório.' },
        { status: 400 }
      );
    }

    const exam = await prisma.exam.findUnique({
      where: { id },
    });

    if (!exam) {
      return NextResponse.json(
        { error: 'Exame não encontrado.' },
        { status: 404 }
      );
    }

    return NextResponse.json(exam);
  } catch (err) {
    console.error('[GET /api/exam/:id] ERROR:', err);
    return NextResponse.json(
      { error: 'Erro ao buscar exame.' },
      { status: 500 }
    );
  }
}
