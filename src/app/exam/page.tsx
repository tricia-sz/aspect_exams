import { Card } from '@/components/ui/card';
import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ExamPage() {
  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Card className="max-w-3xl mx-auto p-6 mt-10 rounded-xl shadow-2xl border-none shadow-content-secondary">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Exames</h1>

        <a
          href="/exam/new"
          className="inline-block mb-4 bg-accent-primary text-white px-4 py-2 rounded-md hover:bg-accent-orange shadow-sm hover:shadow-md transition"
        >
          + Novo Exame
        </a>
      </div>

      <div className="w-full space-y-4">
        {exams.length === 0 && (
          <p className="text-accent-blue">Nenhum exame cadastrado ainda.</p>
        )}

        {exams.map((exam) => (
          <div
            key={exam.id}
            className="rounded-lg p-4 shadow-sm hover:shadow-md transition  shadow-accent-primary"
          >
            <h2 className="text-xl font-semibold">{exam.examName}</h2>
            <p className="text-content-secondary">{exam.medicalSpecialisty}</p>
            <p className="text-ms text-content-tertiary">
              Criado em: {new Date(exam.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
