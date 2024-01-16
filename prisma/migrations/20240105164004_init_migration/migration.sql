-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuralProducer" (
    "id" SERIAL NOT NULL,
    "document" VARCHAR(100) NOT NULL,
    "nameProducer" VARCHAR(100) NOT NULL,
    "nameFarm" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "areaAgricultural" DOUBLE PRECISION NOT NULL,
    "areaVegetation" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuralProducer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cultivation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cultivation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuralProducerCultivation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cultivationId" INTEGER NOT NULL,
    "ruralProducerId" INTEGER NOT NULL,

    CONSTRAINT "RuralProducerCultivation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RuralProducer_document_key" ON "RuralProducer"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Cultivation_name_key" ON "Cultivation"("name");

-- AddForeignKey
ALTER TABLE "RuralProducerCultivation" ADD CONSTRAINT "RuralProducerCultivation_cultivationId_fkey" FOREIGN KEY ("cultivationId") REFERENCES "Cultivation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuralProducerCultivation" ADD CONSTRAINT "RuralProducerCultivation_ruralProducerId_fkey" FOREIGN KEY ("ruralProducerId") REFERENCES "RuralProducer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
