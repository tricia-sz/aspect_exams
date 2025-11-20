import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const exam = await prisma?.exam.findUnique({
    where: { id },
    include: { appointments: true },
  });
  if (!exam) {
    return NextResponse.json(
      { error: 'Exame não encontrado' },
      { status: 404 }
    );
  }
}
