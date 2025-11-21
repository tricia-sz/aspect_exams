import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { Card } from '@/components/ui/card';

export default async function AppointmentPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { scheduledAt: 'asc' },
    include: { exam: true },
  });

  return (
    <Card className="max-w-3xl p-6 mt-10 mx-auto rounded-xl shadow-2xl shadow-accent-blue border-none">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Agendamentos</h1>

        <Link
          href="/appointment/new"
          className="bg-accent-primary text-white px-4 py-2 rounded-md hover:bg-accent-orange hover:shadow-md transition shadow-sm"
        >
          + Novo Agendamento
        </Link>
      </div>

      <div className="space-y-4">
        {appointments.map((a) => (
          <Link
            key={a.id}
            href={`/appointment/${a.id}`}
            className="block rounded-lg p-4 shadow-sm hover:shadow-md transition  shadow-accent-primary "
          >
            <h2 className="font-bold">{a.exam.examName}</h2>
            <p className="text-content-secondary py-2">
              📅 {new Date(a.scheduledAt).toLocaleString('pt-BR')}
            </p>
            {a.additionalInformation && (
              <p className="text-sm text-gray-600">
                🔎 {a.additionalInformation}
              </p>
            )}
          </Link>
        ))}
      </div>
    </Card>
  );
}
