'use client';

import { useState } from 'react';
import DeleteAppointmentButton from './DeleteAppointmentButton';
import { IoEyeSharp } from 'react-icons/io5';

export default function AppointmentItem({ a }: { a: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg p-4 shadow-sm hover:shadow-md transition shadow-accent-primary">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold">{a.exam.examName}</h2>
          <p className="text-content-secondary py-2">
            📅 {new Date(a.scheduledAt).toLocaleString('pt-BR')}
          </p>

          {a.additionalInformation && (
            <p className="text-sm text-gray-600">
              🔎 {a.additionalInformation}
            </p>
          )}
        </div>

        <div className="flex items-center gap-8">
          <button
            onClick={() => setOpen(!open)}
            className="text-accent-primary flex items-center gap-2 underline"
          >
            <IoEyeSharp size={22} />
            Detalhes
          </button>
          <DeleteAppointmentButton appointmentId={a.id} />
        </div>
      </div>

      {open && (
        <div className="mt-4 p-4 border-accent-primary rounded-lg">
          <h3 className="font-bold text-lg mb-2">Detalhes do Agendamento</h3>

          <p>
            <span className="font-semibold">Exame:</span> {a.exam.examName}
          </p>
          <p>
            <span className="font-semibold">Especialidade:</span>{' '}
            {a.exam.medicalSpecialisty}
          </p>
          <p>
            <span className="font-semibold">Agendado para:</span>{' '}
            {new Date(a.scheduledAt).toLocaleString('pt-BR')}
          </p>

          {a.additionalInformation && (
            <p>
              <span className="font-semibold">Informações adicionais:</span>{' '}
              {a.additionalInformation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
