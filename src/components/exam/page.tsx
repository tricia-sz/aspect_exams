import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ExamPage() {
  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Exames disponíveis</h1>
      </div>

      <div className="space-y-4">
        {exams.length === 0 && (
          <p className="text-accent-blue">Nenhum exame cadastrado ainda.</p>
        )}

        {exams.map((exam) => (
          <div
            key={exam.id}
            className="border border-content-secondary rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{exam.examName}</h2>
            <p className="text-content-secondary">{exam.medicalSpecialisty}</p>
            <p className="text-ms text-content-tertiary">
              Criado em: {new Date(exam.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
