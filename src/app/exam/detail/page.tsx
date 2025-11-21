import { prisma } from '../../../lib/prisma';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default async function ExamDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const exam = await prisma.exam.findUnique({
    where: { id: params.id },
  });

  if (!exam) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Exame não encontrado
        </h1>
      </div>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto p-6 mt-10 rounded-xl shadow-xl border-none">
      <Link
        href="/exam"
        className="flex items-center gap-2 text-accent-primary mb-4"
      >
        <IoArrowBack size={20} /> Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-4">{exam.examName}</h1>

      <p className="text-lg text-content-secondary mb-2">
        <span className="font-bold">Especialidade</span>:
        {exam.medicalSpecialisty}
      </p>

      <p className="text-md text-content-tertiary">
        Criado em: {new Date(exam.createdAt).toLocaleDateString('pt-BR')}
      </p>
    </Card>
  );
}
