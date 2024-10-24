import { PrismaClient, MapType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    // await prisma.user.deleteMany({});
  const users = [
    {
      name: 'John Doe',
      time: 2.0,
      createdAt: new Date('2024-10-23T22:09:34.684Z'),
      map: MapType.MAP1,
    },
    {
      name: 'Sample User',
      time: 7.0,
      createdAt: new Date('2024-10-23T22:13:55.2Z'),
      map: MapType.MAP3,
    },
    {
      name: 'Example User',
      time: 8.0,
      createdAt: new Date('2024-10-23T22:19:59.041Z'),
      map: MapType.MAP3,
    },
    {
      name: 'Alice Smith',
      time: 10.0,
      createdAt: new Date('2024-10-24T17:41:48.73Z'),
      map: MapType.MAP3,
    },
    {
      name: 'Bob Johnson',
      time: 71.0,
      createdAt: new Date('2024-10-24T17:51:48.563Z'),
      map: MapType.MAP3,
    },
    {
      name: 'Charlie Brown',
      time: 9.0,
      createdAt: new Date('2024-10-24T17:52:47.306Z'),
      map: MapType.MAP3,
    },
    {
      name: 'David Wilson',
      time: 9.0,
      createdAt: new Date('2024-10-24T17:53:03.098Z'),
      map: MapType.MAP3,
    },
    {
      name: 'Eve Miller',
      time: 23.0,
      createdAt: new Date('2024-10-24T18:03:11.177Z'),
      map: MapType.MAP3,
    },
    {
      name: 'Backend Test User',
      time: 14.0,
      createdAt: new Date('2024-10-24T18:20:15.771Z'),
      map: MapType.MAP3,
    },
    {
      name: 'Frank Moore',
      time: 5.0,
      createdAt: new Date('2024-10-24T19:15:46.892Z'),
      map: MapType.MAP3,
    },
    {
      name: 'Grace Lee',
      time: 5.0,
      createdAt: new Date('2024-10-24T19:15:57.4Z'),
      map: MapType.MAP3,
    },
    {
      name: 'Henry Clark',
      time: 8.0,
      createdAt: new Date('2024-10-24T19:16:11.018Z'),
      map: MapType.MAP3,
    },
    {
      name: 'Isabella Martinez',
      time: 39.0,
      createdAt: new Date('2024-10-24T22:29:46.011Z'),
      map: MapType.MAP1,
    },
    {
      name: 'Jack Anderson',
      time: 9.0,
      createdAt: new Date('2024-10-24T22:31:27.804Z'),
      map: MapType.MAP2,
    },
    {
      name: 'Kara Thomas',
      time: 9.0,
      createdAt: new Date('2024-10-24T22:32:22.186Z'),
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
