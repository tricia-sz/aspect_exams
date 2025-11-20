import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(exams);
  } catch (err) {
    console.error('[GET /api/exams] ERROR:', err);
    return NextResponse.json(
      { error: 'Erro ao buscar exames.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { examName, medicalSpecialisty } = body;

    if (!examName || !medicalSpecialisty) {
      return NextResponse.json(
        { error: 'Nome do Exame  e Especialidade são obrigatórios.' },
        { status: 400 }
      );
    }

    const exam = await prisma.exam.create({
      data: {
        examName,
        medicalSpecialisty,
      },
    });

    return NextResponse.json(exam, { status: 201 });
  } catch (err) {
    console.error('[POST /api/exams] ERROR:', err);

    return NextResponse.json(
      { error: 'Erro ao criar exame.' },
      { status: 500 }
    );
  }
}
