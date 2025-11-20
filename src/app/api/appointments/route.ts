import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        exam: true,
      },
      orderBy: { scheduledAt: 'asc' },
    });

    return NextResponse.json(appointments);
  } catch (err) {
    console.error('[GET /api/appointments] ERROR:', err);
    return NextResponse.json(
      { error: 'Erro ao buscar agendamentos.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { examId, scheduledAt, additionalInformation } = body;

    if (!examId || !scheduledAt) {
      return NextResponse.json(
        { error: 'Exame e data são obrigatórios.' },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        examId,
        scheduledAt: new Date(scheduledAt),
        additionalInformation,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (err) {
    console.error('[POST /api/appointments] ERROR:', err);
    return NextResponse.json(
      { error: 'Erro ao criar agendamento.' },
      { status: 500 }
    );
  }
}
