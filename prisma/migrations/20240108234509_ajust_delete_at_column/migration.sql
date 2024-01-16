-- AlterTable
ALTER TABLE "Cultivation" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RuralProducer" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RuralProducerCultivation" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deletedAt" DROP NOT NULL;
