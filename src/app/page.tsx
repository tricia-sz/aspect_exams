export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import ExamPage from './exam/page';
import AppointmentPage from './appointment/page';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <ExamPage />
      </div>
      <div>
        <AppointmentPage />
      </div>
    </div>
  );
}
