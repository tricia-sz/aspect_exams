import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const exam = await prisma.exam.findUnique({
      where: { id },
      include: { appointments: true },
    });

    if (!exam) {
      return NextResponse.json(
        { error: 'Exame não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(exam, { status: 200 });
  } catch (error) {
    console.error('Erro na rota GET /exam/[id]:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
