import { PrismaClient, MapType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'john',
      time: 2.000000000000000000000000000000,
      createdAt: new Date('2024-10-23 22:09:34.684'),
      map: MapType.MAP1,
    },
    {
      name: 'test',
      time: 7.000000000000000000000000000000,
      createdAt: new Date('2024-10-23 22:13:55.2'),
      map: MapType.MAP3,
    },
    {
      name: 'test2',
      time: 8.000000000000000000000000000000,
      createdAt: new Date('2024-10-23 22:19:59.041'),
      map: MapType.MAP3,
    },
    {
      name: 'asd',
      time: 10.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 17:41:48.73'),
      map: MapType.MAP3,
    },
    {
      name: 'test3',
      time: 71.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 17:51:48.563'),
      map: MapType.MAP3,
    },
    {
      name: 'lkajsdlfkj',
      time: 9.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 17:52:47.306'),
      map: MapType.MAP3,
    },
    {
      name: 'asdfadsf',
      time: 9.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 17:53:03.098'),
      map: MapType.MAP3,
    },
    {
      name: 'john wayne',
      time: 23.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 18:03:11.177'),
      map: MapType.MAP3,
    },
    {
      name: 'backend test',
      time: 14.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 18:20:15.771'),
      map: MapType.MAP3,
    },
    {
      name: 'adsfadsf',
      time: 5.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 19:15:46.892'),
      map: MapType.MAP3,
    },
    {
      name: 'asdfasd',
      time: 5.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 19:15:57.4'),
      map: MapType.MAP3,
    },
    {
      name: 'sssss',
      time: 8.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 19:16:11.018'),
      map: MapType.MAP3,
    },
    {
      name: '459',
      time: 39.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 22:29:46.011'),
      map: MapType.MAP1,
    },
    {
      name: 'yay',
      time: 9.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 22:31:27.804'),
      map: MapType.MAP2,
    },
    {
      name: 'nay',
      time: 9.000000000000000000000000000000,
      createdAt: new Date('2024-10-24 22:32:22.186'),
      map: MapType.MAP2,
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
