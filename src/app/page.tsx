import AppointmentPage from './appointment/page';
import ExamPage from './exam/page';
export default async function Home() {
  return (
    <div>
      <ExamPage />
      <AppointmentPage />
    </div>
  );
}
