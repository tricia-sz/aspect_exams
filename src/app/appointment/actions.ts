'use server';

import { prisma } from '../../lib/prisma';

export async function deleteAppointment(id: string) {
  await prisma.appointment.delete({
    where: { id },
  });
}
