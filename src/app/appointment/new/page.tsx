import { redirect } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default async function NewAppointmentPage() {
  const exams = await prisma.exam.findMany();

  async function createAppointment(formData: FormData) {
    'use server';

    await prisma.appointment.create({
      data: {
        examId: String(formData.get('examId')),
        scheduledAt: new Date(String(formData.get('scheduledAt'))),
        additionalInformation: String(formData.get('additionalInformation') || ''),
      },
    });

    redirect('/appointment');
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-2xl shadow-accent-blue border-none">
      <h1 className="text-2xl font-bold mb-4">Novo Agendamento</h1>

      <form action={createAppointment} className="space-y-4 py-2">
        <label className="text-xl">Exames</label>
        <select
          name="examId"
          className="w-full p-2 mt-2 border border-content-secondary rounded-md text-xl"
        >
          {exams.map((e) => (
            <option key={e.id} value={e.id}>
              {e.examName}
            </option>
          ))}
        </select>

        <div className="mt-4">
          <label className="text-xl mb-2">Selecione data e hora</label>
          <Input
            type="datetime-local"
            name="scheduledAt"
            className="w-full p-2 border border-content-secondary rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="text-xl">Observações</label>
          <Textarea
            name="additionalInformation"
            placeholder="Observações"
            className="w-full p-2 border-content-secondary rounded-md text-xl mt-2"
          />
        </div>

        <Button className="w-sm text-xl bg-accent-primary flex justify-center mx-auto text-white px-4 py-2 rounded">
          Agendar
        </Button>
      </form>
    </div>
  );
}
