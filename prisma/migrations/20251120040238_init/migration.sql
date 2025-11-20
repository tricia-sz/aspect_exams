-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "examName" TEXT NOT NULL,
    "medicalSpecialisty" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "additionalInformation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exams_examName_key" ON "exams"("examName");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
