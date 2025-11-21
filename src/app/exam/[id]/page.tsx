import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ExamPage({ params }: PageProps) {
  const { id } = await params;

  const exam = await prisma.exam.findUnique({
    where: { id },
  });

  if (!exam) return notFound();

  return (
    <Card className="max-w-3xl mx-auto p-6 mt-10 rounded-xl shadow-xl border-none  shadow-accent-primary">
      <Link
        href="/exam"
        className="flex items-center gap-2 text-accent-primary mb-4"
      >
        <IoChevronBackCircleSharp
          size={32}
          className="text-accent-primary-light"
        />{' '}
        Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-4">{exam.examName}</h1>

      <p className="text-lg text-content-secondary mb-2">
        Especialidade:
        <strong className="ml-1">{exam.medicalSpecialisty}</strong>
      </p>

      <p className="text-md text-content-tertiary">
        Criado em: {new Date(exam.createdAt).toLocaleDateString('pt-BR')}
      </p>
    </Card>
  );
}
