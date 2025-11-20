import { redirect } from 'next/navigation';
import { prisma } from '../../../lib/prisma';

export default async function NewAppointmentPage() {
  const exams = await prisma.exam.findMany();

  async function createAppointment(formData: FormData) {
    'use server';

    await fetch('http://localhost:3000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examId: formData.get('examId'),
        scheduledAt: formData.get('scheduledAt'),
        additionalInformation: formData.get('additionalInformation'),
      }),
    });

    redirect('/appointment');
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Novo Agendamento</h1>

      <form action={createAppointment} className="space-y-4">
        <select name="examId" className="w-full p-2 border rounded">
          {exams.map((e) => (
            <option key={e.id} value={e.id}>
              {e.examName}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="scheduledAt"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="additionalInformation"
          placeholder="Observações"
          className="w-full p-2 border rounded"
        />
        <button className="bg-accent-primary text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}
