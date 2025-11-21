import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { FaTrashAlt } from 'react-icons/fa';
import { Card } from 'components/ui/card';
import { IoIosAdd } from 'react-icons/io';

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
          className="flex  justify-between items-center  gap-2 bg-accent-primary text-white px-4 py-2 rounded-md hover:bg-accent-orange hover:shadow-md transition shadow-sm"
        >
          <IoIosAdd size={28} />
          Agendar
        </Link>
      </div>

      <div className="space-y-4">
        {appointments.map((a) => (
          <Link
            key={a.id}
            href={`/appointment/${a.id}`}
            className="flex justify-between  rounded-lg p-4 shadow-sm hover:shadow-md transition  shadow-accent-primary "
          >
            <div>
              <h2 className="font-bold text-xl">{a.exam.examName}</h2>
              <p className="text-content-secondary py-2">
                <span className="text-accent-primary"> Data:</span>{' '}
                {new Date(a.scheduledAt).toLocaleString('pt-BR')}
              </p>
              {a.additionalInformation && (
                <p className="text-sm text-gray-600">
                  <span className="text-accent-primary">Notas:</span>{' '}
                  {a.additionalInformation}
                </p>
              )}
              <Link
                href="/"
                className="flex  gap-2 items-center  text-accent-blue rounded-2xl p-1"
              >
                Detalhes
              </Link>
            </div>
            <Link
              href="/"
              className="flex gap-2 items-center  text-accent-primary rounded-2xl p-2"
            >
              <FaTrashAlt size={28} className="hover:text-red-500" />
            </Link>
          </Link>
        ))}
      </div>
    </Card>
  );
}
