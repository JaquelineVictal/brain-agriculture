/*
  Warnings:

  - Added the required column `deletedAt` to the `Cultivation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `RuralProducer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `RuralProducerCultivation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cultivation" ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RuralProducer" ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RuralProducerCultivation" ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL;
