import { prisma } from '../../lib/prisma';
import Link from 'next/link';
import { IoEyeSharp } from 'react-icons/io5';
import { IoIosAdd } from 'react-icons/io';
import { Card } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

type AppointmentWithExam = {
  id: string;
  scheduledAt: string;
  additionalInformation?: string | null;
  createdAt: string;
  updatedAt: string;
  exam: {
    id: string;
    examName: string;
    medicalSpecialisty: string;
  } | null;
};

export default async function AppointmentPage() {
  const appointmentsRaw = await prisma.appointment.findMany({
    orderBy: { scheduledAt: 'desc' },
    include: { exam: true },
  });

  const appointments: AppointmentWithExam[] = appointmentsRaw.map((a) => ({
    id: a.id,
    scheduledAt: a.scheduledAt.toISOString(),
    additionalInformation: a.additionalInformation,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    exam: a.exam
      ? {
          id: a.exam.id,
          examName: a.exam.examName,
          medicalSpecialisty: a.exam.medicalSpecialisty,
        }
      : null,
  }));

  return (
    <Card className="max-w-3xl mx-auto p-6 mt-10 rounded-xl shadow-2xl border-none shadow-content-secondary">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Agendamentos</h1>

        <Link
          href="/appointment/new"
          className="flex gap-2 mb-4 bg-accent-primary text-white px-4 py-2 rounded-md hover:bg-accent-orange shadow-sm hover:shadow-md transition"
        >
          <IoIosAdd size={28} /> Novo Agendamento
        </Link>
      </div>

      <div className="w-full space-y-4">
        {appointments.length === 0 ? (
          <p className="text-accent-blue">
            Nenhum agendamento cadastrado ainda.
          </p>
        ) : (
          appointments.map((a) => (
            <div
              key={a.id}
              className="flex justify-between items-center rounded-lg p-4 shadow-sm hover:shadow-md transition  shadow-accent-primary"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {a.exam ? a.exam.examName : 'Exame removido'}
                </h2>

                {a.exam && (
                  <p className="text-content-secondary py-1">
                    {a.exam.medicalSpecialisty}
                  </p>
                )}

                <p className="text-ms text-content-tertiary py-1">
                  Agendado para:{' '}
                  {new Date(a.scheduledAt).toLocaleString('pt-BR')}
                </p>

                {a.additionalInformation && (
                  <p className="text-sm text-content-secondary py-1">
                    {a.additionalInformation}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/appointment/${a.id}`}
                  className="flex gap-2 items-center text-accent-primary rounded-2xl p-2 hover:bg-accent-ghost transition"
                >
                  <IoEyeSharp size={20} />
                  <span className="hidden sm:inline"></span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
