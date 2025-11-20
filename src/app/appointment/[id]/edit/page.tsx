import { prisma } from '../../../../lib/prisma';

export default async function EditAppointment({
  params,
}: {
  params: { id: string };
}) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: params.id },
  });

  const exams = await prisma.exam.findMany();

  async function updateAppointment(formData: FormData) {
    await fetch(`http://localhost:3000/api/appointments/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examId: formData.get('examId'),
        scheduledAt: formData.get('scheduledAt'),
        additionalInformation: formData.get('additionalInformation'),
      }),
    });
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Agendamento</h1>

      <form action={updateAppointment} className="space-y-4">
        <select
          name="examId"
          className="w-full p-2 border rounded"
          defaultValue={appointment?.examId}
        >
          {exams.map((e) => (
            <option key={e.id} value={e.id}>
              {e.examName}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="scheduledAt"
          defaultValue={appointment?.scheduledAt.toISOString().slice(0, 16)}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="additionalInformation"
          defaultValue={appointment?.additionalInformation || ''}
          className="w-full p-2 border rounded"
        />

        <button className="bg-accent-primary text-white px-4 py-2 rounded">
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
