import Link from 'next/link';
import { prisma } from '../../lib/prisma';

export default async function AppointmentPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { scheduledAt: 'asc' },
    include: { exam: true },
  });

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Agendamentos</h1>

        <Link
          href="/appointment/new"
          className="bg-accent-primary text-white px-4 py-2 rounded-full"
        >
          + Novo Agendamento
        </Link>
      </div>

      <div className="space-y-4">
        {appointments.map((a) => (
          <Link
            key={a.id}
            href={`/appointment/${a.id}`}
            className="block border p-4 rounded hover:bg-gray-100"
          >
            <h2 className="font-bold">{a.exam.examName}</h2>
            <p>📅 {new Date(a.scheduledAt).toLocaleString('pt-BR')}</p>
            {a.additionalInformation && (
              <p className="text-sm text-gray-600">
                🔎 {a.additionalInformation}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
