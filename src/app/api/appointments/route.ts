import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { scheduledAt: 'asc' },
      include: { exam: true },
    });

    return NextResponse.json(appointments);
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao buscar agendamentos.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { examId, scheduledAt, additionalInformation } = await req.json();

    if (!examId || !scheduledAt) {
      return NextResponse.json(
        { error: 'Exame e data são obrigatórios.' },
        { status: 400 }
      );
    }

    const created = await prisma.appointment.create({
      data: {
        examId,
        scheduledAt: new Date(scheduledAt),
        additionalInformation,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao criar agendamento.' },
      { status: 500 }
    );
  }
}
