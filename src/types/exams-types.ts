export type AppointmentPeriodDay = 'morning' | 'afternoon' | 'evening';

export type ExamType = {
  id: string;
  examName: string;
  medicalSpecialty: string;
  appointments: unknown;

  createdAt: Date;
  updatedAt: Date;

  additionalInformation: string;
  scheduledAt: Date;
};
