import { prisma } from '../../../lib/prisma';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default async function AppointmentDetails({
  params,
}: {
  params: { id: string };
}) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: { exam: true },
  });

  if (!appointment) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Agendamento não encontrado
        </h1>
        <Link
          href="/appointment"
          className="text-blue-600 underline mt-4 block"
        >
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto p-6 mt-10 shadow-xl rounded-xl space-y-6">
      <Link href="/appointment" className="text-accent-primary underline">
        ← Voltar
      </Link>

      <h1 className="text-3xl font-bold">Detalhes do Agendamento</h1>

      <div className="space-y-3">
        <p className="text-lg">
          <span className="font-semibold">Exame:</span>{' '}
          {appointment.exam.examName}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Especialidade:</span>{' '}
          {appointment.exam.medicalSpecialisty}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Data agendada:</span>{' '}
          {new Date(appointment.scheduledAt).toLocaleString('pt-BR')}
        </p>

        {appointment.additionalInformation && (
          <p className="text-lg">
            <span className="font-semibold">Informações adicionais:</span>{' '}
            {appointment.additionalInformation}
          </p>
        )}
      </div>
    </Card>
  );
}
