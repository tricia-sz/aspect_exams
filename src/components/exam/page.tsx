import { prisma } from '../../lib/prisma';

export default async function Exam() {
  const exams = await prisma.exam.findMany();
  return (
    <>
      <h2>{exams.map((exam) => exam.id)}</h2>
      <h2>{exams.map((exam) => exam.examName)}</h2>
      <h2>{exams.map((exam) => exam.medicalSpecialisty)}</h2>
    </>
  );
}
