'use client';

import { FaTrashAlt } from 'react-icons/fa';
import { deleteAppointment } from './actions';

export default function DeleteAppointmentButton({
  appointmentId,
}: {
  appointmentId: string;
}) {
  return (
    <form action={async () => deleteAppointment(appointmentId)}>
      <button
        type="submit"
        className="flex gap-2 items-center text-accent-primary rounded-2xl p-1"
      >
        <FaTrashAlt size={32} className="hover:text-red-500" />
      </button>
    </form>
  );
}
