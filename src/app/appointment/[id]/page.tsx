import Link from 'next/link';
import { prisma } from '../../../lib/prisma';

export default async function AppointmentDetails({
  params,
}: {
  params: { id: string };
}) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: { exam: true },
  });

  if (!appointment) return <p>Agendamento não encontrado</p>;

  async function deleteAppointment() {
    await fetch(`http://localhost:3000/api/appointments/${params.id}`, {
      method: 'DELETE',
    });
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{appointment.exam.examName}</h1>

      <p>📅 {new Date(appointment.scheduledAt).toLocaleString('pt-BR')}</p>
      {appointment.additionalInformation && (
        <p className="mt-2">📝 {appointment.additionalInformation}</p>
      )}

      <div className="space-x-4 mt-6">
        <Link
          href={`/appointment/${params.id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Editar
        </Link>

        <form action={deleteAppointment} className="inline-block">
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Excluir
          </button>
        </form>
      </div>
    </div>
  );
}
