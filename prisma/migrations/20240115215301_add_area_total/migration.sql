/*
  Warnings:

  - Added the required column `areaTotal` to the `RuralProducer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RuralProducer" ADD COLUMN     "areaTotal" DOUBLE PRECISION NOT NULL;
