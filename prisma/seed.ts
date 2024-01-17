import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    await prisma.$connect();

    await prisma.$executeRaw`INSERT INTO public."RuralProducer"  (id, document, "nameProducer", "nameFarm", city, state, "areaTotal", "areaAgricultural", "areaVegetation", "createdAt", "updatedAt")
VALUES
  (2,'30082134000160', 'John Doe', 'Doe Farm', 'City1', 'State1', 100, 50, 50, NOW(), NOW()),
  (3,'60250332000156', 'Jane Smith', 'Smith Farm', 'City2', 'State2', 150, 80, 70, NOW(), NOW()),
  (4,'05314167000140', 'Bob Johnson', 'Johnson Farm', 'City3', 'State1', 120, 60, 60, NOW(), NOW()),
  (5,'59631000000132', 'Alice Brown', 'Brown Farm', 'City4', 'State3', 80, 40, 40, NOW(), NOW());;
`;

    await prisma.$executeRaw`INSERT INTO public."Cultivation" (id, name, "createdAt", "updatedAt")
VALUES
  (1,'Wheat', NOW(), NOW()),
  (2,'Corn', NOW(), NOW()),
  (3,'Soybeans', NOW(), NOW()),
  (4,'Rice', NOW(), NOW());
  `;

    await prisma.$executeRaw`INSERT INTO public."RuralProducerCultivation" ("cultivationId", "ruralProducerId", "createdAt", "updatedAt")
VALUES
  (1, 2, NOW(), NOW()),  
  (2, 2, NOW(), NOW()), 
  (3, 2, NOW(), NOW()), 
  (1, 3, NOW(), NOW()), 
  (2, 3, NOW(), NOW()),  
  (4, 3, NOW(), NOW()),  
  (3, 4, NOW(), NOW()),  
  (4, 5, NOW(), NOW()); `;

    console.log('Dados de seed inseridos com sucesso.');
  } catch (error) {
    console.error('Erro ao inserir dados de seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
