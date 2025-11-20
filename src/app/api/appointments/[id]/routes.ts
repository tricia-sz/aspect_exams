import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: { exam: true },
  });

  if (!appointment)
    return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  return NextResponse.json(appointment);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { examId, scheduledAt, additionalInformation } = await req.json();

  const updated = await prisma.appointment.update({
    where: { id: params.id },
    data: {
      examId,
      scheduledAt: new Date(scheduledAt),
      additionalInformation,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.appointment.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
