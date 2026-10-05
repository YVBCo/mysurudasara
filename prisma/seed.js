const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.savedEvent.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seeding database...');

  // Create events
  const events = [
    {
      title: "Jumbo Savari (Elephant Procession)",
      description: "The grand finale of Mysuru Dasara featuring the golden howdah.",
      category: "Religious",
      date: "Oct 12",
      time: "14:00 - 18:00",
      location: "Mysore Palace to Bannimantap",
      status: "UPCOMING",
      image: "🐘",
      isOfficial: true,
    },
    {
      title: "Classical Music Concert",
      description: "Evening classical music performance by renowned artists.",
      category: "Cultural",
      date: "Oct 5",
      time: "18:00 - 21:00",
      location: "Palace Grounds",
      status: "LIVE",
      image: "🎵",
      isOfficial: true,
    },
    {
      title: "Nada Kusti (Wrestling) Finals",
      description: "Traditional wrestling championship finals.",
      category: "Sports",
      date: "Oct 5",
      time: "14:00 - 17:00",
      location: "D. Devaraj Urs Stadium",
      status: "UPCOMING",
      image: "🤼",
      isOfficial: true,
    },
    {
      title: "Aahara Mela (Food Festival)",
      description: "Discover authentic Karnataka cuisine and tribal delicacies.",
      category: "Mela",
      date: "Oct 5-14",
      time: "10:00 - 22:00",
      location: "Scouts & Guides Grounds",
      status: "LIVE",
      image: "🍛",
      isOfficial: true,
    },
    {
      title: "Flower Show",
      description: "Spectacular floral arrangements and displays.",
      category: "Exhibition",
      date: "Oct 5-14",
      time: "09:00 - 21:00",
      location: "Kuppanna Park",
      status: "UPCOMING",
      image: "🌸",
      isOfficial: true,
    }
  ];

  for (const event of events) {
    await prisma.event.create({
      data: event,
    });
  }

  // Create a mock user
  await prisma.user.create({
    data: {
      email: 'visitor@example.com',
      name: 'Dasara Visitor',
      role: 'VISITOR',
    }
  });

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
