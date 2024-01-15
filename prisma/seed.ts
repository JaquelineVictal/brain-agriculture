// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function seedDatabase() {
//   try {
//     await prisma.$connect();

//     await prisma.$executeRaw`INSERT INTO public."Customers"
// 	    (id, cpf, "name", "password", created_at, updated_at, deleted_at, email)
//     VALUES
// 	    ('a7842752-eccd-4723-8567-0efe5c74d5a2', '60015720039', 'Barry Allen', '$2b$05$vEQCpnEOF33K.rGOillUdOsf3MFkTPoAKR2cKrgCy977tJO.sifZy', '2023-11-01 18:14:08.487', '2023-11-01 18:14:08.487', NULL, 'barry.allen@example.com'),
// 	    ('c1250e61-4e4a-4ba4-8079-6b377934ca70', '38705214068', 'Bruce Wayne', '$2b$05$JZeTu3Ktz.Zn/1SbNvVKJOfYWAYuVvnF2uJgOGbVJI/m6iYpZmH5u', '2023-11-01 18:12:59.728', '2023-11-01 18:12:59.728', NULL, 'bruce.wayne@example.com'),
// 	    ('e08675f2-945e-4474-88ce-706627419d23', '34492355081', 'James Bond', '$2b$05$j.MID.GUzzsFJyc0zB8s9uzMS/9w/bJecry8S5vRIMvhvrDFL.TU.', '2023-11-01 18:11:12.873', '2023-11-01 18:11:12.873', NULL, 'james.bond@example.com');

//     ;`;

//     await prisma.$executeRaw`INSERT INTO public."Cameras"
//         (id, "name", ip, "isEnabled", created_at, updated_at, deleted_at, customer_id)
//     VALUES
//         ('b0ec902a-eaf7-4206-9271-534a7429037f', 'batcave-camera-1', '192.168.0.1', true, '2023-11-01 03:13:59.670', '2023-11-01 03:13:59.670', NULL, 'c1250e61-4e4a-4ba4-8079-6b377934ca70'),
//         ('3b2809e0-78e5-11ee-b962-0242ac120002', 'batcave-camera-2', '192.168.0.2', false, '2023-11-01 03:13:59.670', '2023-11-01 03:13:59.670', NULL, 'c1250e61-4e4a-4ba4-8079-6b377934ca70'),
//         ('6f0a8ed6-78e5-11ee-b962-0242ac120002', 'flash-camera-1', '128.73.231.34', true, '2023-11-01 03:13:59.670', '2023-11-01 03:13:59.670', NULL, 'a7842752-eccd-4723-8567-0efe5c74d5a2'),
//         ('9d304aa8-78e5-11ee-b962-0242ac120002', 'flash-camera-2', '128.73.231.36', false, '2023-11-01 03:13:59.670', '2023-11-01 03:13:59.670', NULL, 'a7842752-eccd-4723-8567-0efe5c74d5a2'),
//         ('cf8ad4d2-78e5-11ee-b962-0242ac120002', 'mi6-camera-1', '73.35.68.6', true, '2023-11-01 03:13:59.670', '2023-11-01 03:13:59.670', NULL, 'e08675f2-945e-4474-88ce-706627419d23'),
//         ('d35b3264-78e5-11ee-b962-0242ac120002', 'mi6-camera-2', '73.35.68.8', false, '2023-11-01 03:13:59.670', '2023-11-01 03:13:59.670', NULL, 'e08675f2-945e-4474-88ce-706627419d23');`;

//     await prisma.$executeRaw`INSERT INTO public."AlertLogs"
//         (id, occurred_at, created_at, updated_at, deleted_at, camera_id)
//     VALUES('891100e1-afc3-45c0-9d8b-2572e72b8027', '2023-11-01 12:30:00.000', '2023-11-01 03:41:09.119', '2023-11-01 03:41:09.119', NULL, 'b0ec902a-eaf7-4206-9271-534a7429037f'),
//         ('58570848-ce20-4da1-88fb-60a33615af5d', '2023-10-05 12:30:00.000', '2023-11-01 03:41:26.485', '2023-11-01 03:41:26.485', NULL, '3b2809e0-78e5-11ee-b962-0242ac120002'),
//         ('4a8618fa-e6a5-4c8f-90b2-6e0d42f4d3fe', '2023-10-01 12:30:00.000', '2023-11-01 03:41:39.098', '2023-11-01 03:41:39.098', NULL, '3b2809e0-78e5-11ee-b962-0242ac120002'),
//         ('3d0dce84-bab0-4adf-9931-c6fc7593bf60', '2023-11-01 10:30:00.000', '2023-11-01 03:41:46.018', '2023-11-01 03:41:46.018', NULL, 'cf8ad4d2-78e5-11ee-b962-0242ac120002'),
//         ('51690b17-c15e-424b-89b7-7eb430dc4bb0', '2023-10-25 12:30:00.000', '2023-11-01 03:41:58.144', '2023-11-01 03:41:58.144', NULL, 'cf8ad4d2-78e5-11ee-b962-0242ac120002');`;

//     console.log('Dados de seed inseridos com sucesso.');
//   } catch (error) {
//     console.error('Erro ao inserir dados de seed:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seedDatabase();
