export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { examName, medicalSpecialisty } = await req.json();

    const exam = await prisma.exam.create({
      data: { examName, medicalSpecialisty },
    });

    return NextResponse.json(exam, { status: 201 });
  } catch (err: any) {
    console.error('[POST /api/exams] ERROR:', err);

    if (err.code === 'P2002') {
      return NextResponse.json(
        { error: 'Este nome de exame já existe.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Erro inesperado ao criar exame.' },
      { status: 500 }
    );
  }
}
