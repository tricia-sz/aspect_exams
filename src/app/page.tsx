import { prisma } from '../lib/prisma';

export default async function Home() {
  const exams = await prisma.exam.findMany();
  return (
    <div>
      <h1>GET dos exames</h1>
      <p>{JSON.stringify(exams, null, 3)}</p>
    </div>
  );
}
