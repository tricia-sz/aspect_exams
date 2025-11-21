import { prisma } from '../../lib/prisma';
import { IoEyeSharp } from 'react-icons/io5';
import { IoIosAdd } from 'react-icons/io';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function ExamPage() {
  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Card className="max-w-3xl mx-auto p-6 mt-10 rounded-xl shadow-2xl border-none shadow-content-secondary">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Exames</h1>

        <Link
          href="/exam/new"
          className="flex gap-2 mb-4 bg-accent-primary text-white px-4 py-2 rounded-md hover:bg-accent-orange shadow-sm hover:shadow-md transition"
        >
          <IoIosAdd size={28} /> Novo Exame
        </Link>
      </div>

      <div className="w-full space-y-4">
        {exams.length === 0 && (
          <p className="text-accent-blue">Nenhum exame cadastrado ainda.</p>
        )}

        {exams.map((exam) => (
          <div
            key={exam.id}
            className=" flex justify-between items-center rounded-lg p-4 shadow-sm hover:shadow-md transition  shadow-accent-primary"
          >
            <div>
              <h2 className="text-xl font-semibold">{exam.examName}</h2>
              <p className="text-content-secondary py-2">
                {exam.medicalSpecialisty}
              </p>
              <p className="text-ms text-content-tertiary py-2">
                Criado em:{' '}
                {new Date(exam.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div>
              <Link
                href={`/exam/${exam.id}`}
                className="flex  gap-2 items-center  text-accent-primary rounded-2xl p-1"
              >
                <IoEyeSharp size={32} /> DETALHES
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
