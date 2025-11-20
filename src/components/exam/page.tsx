import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ExamPage() {
  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div>
        <h1>Exames disponíveis</h1>
      </div>
      <div>
        {exams.length === 0 && (
          <p className="text-gray-500">Nenhum exame cadastrado ainda.</p>
        )}

        {exams.map((exam) => (
          <div key={exam.id} className="">
            <h2>{exam.examName}</h2>
            <p>{exam.medicalSpecialisty}</p>
            <p>
              Criado em: {new Date(exam.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
