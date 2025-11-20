import ExamPage from './exam/page';
import AppointmentPage from './appointment/page';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Exames & Agendamentos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-xl shadow-2xl p-6 shadow-accent-primary">
          <ExamPage />
        </div>
        <div className="rounded-xl shadow-2xl shadow-accent-primary p-6">
          <AppointmentPage />
        </div>
      </div>
    </div>
  );
}
