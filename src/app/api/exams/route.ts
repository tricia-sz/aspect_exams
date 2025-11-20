import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const exams = await prisma.exam.findMany();
  return NextResponse.json(exams);
}
