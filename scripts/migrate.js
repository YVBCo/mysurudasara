const { createClient } = require('@libsql/client');
const fs = require('fs');

async function migrate() {
  const db = createClient({ url: 'file:local.db' });

  console.log('Running migrations...');

  await db.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      venue TEXT,
      location TEXT,
      lat REAL,
      lng REAL,
      image TEXT,
      status TEXT,
      source_name TEXT,
      source_url TEXT,
      source_type TEXT,
      retrieved_at TEXT,
      last_verified_at TEXT,
      updated_at TEXT,
      content_hash TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS places (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      image TEXT,
      distance TEXT,
      status TEXT,
      source_name TEXT,
      last_verified_at TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS sync_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      started_at TEXT,
      completed_at TEXT,
      status TEXT,
      records_updated INTEGER,
      errors TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS providers (
      id TEXT PRIMARY KEY,
      value TEXT,
      status TEXT,
      source TEXT,
      timestamp TEXT
    )
  `);
  
  await db.execute(`
    CREATE TABLE IF NOT EXISTS saved_events (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      event_id TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  console.log('Migrations completed successfully.');
  
  // Create an initial fixture for the sync service to pull from if we want to mock the official API
  const mockApiData = {
    events: [
      {
        id: "evt-100",
        title: "Dasara Inauguration & Chamundeshwari Pooja",
        description: "Traditional rituals marking the beginning of the 2026 celebrations atop Chamundi Hill.",
        category: "Religious",
        start_time: "2026-10-11T09:00:00+05:30",
        end_time: "2026-10-11T11:30:00+05:30",
        venue: "Chamundi Hill Temple",
        location: "Chamundi Hill, Mysuru",
        lat: 12.2746,
        lng: 76.6713,
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Chamundeshwari_Temple%2C_Mysore.jpg",
        status: "SCHEDULED",
        source_name: "Mysuru Dasara 2026",
        source_url: "https://mysoredasara.gov.in/",
        source_type: "OFFICIAL"
      },
      {
        id: "evt-101",
        title: "Jamboo Savari (Grand Elephant Procession)",
        description: "The spectacular grand finale where Goddess Chamundeshwari is carried in the 750kg Golden Howdah.",
        category: "Religious",
        start_time: "2026-10-21T14:00:00+05:30",
        end_time: "2026-10-21T18:00:00+05:30",
        venue: "Mysuru Palace to Bannimantap",
        location: "Mysuru Palace",
        lat: 12.3051,
        lng: 76.6551,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Mysore_Dasara_Procession.jpg",
        status: "SCHEDULED",
        source_name: "Mysuru Dasara 2026",
        source_url: "https://mysoredasara.gov.in/",
        source_type: "OFFICIAL"
      },
      {
        id: "evt-102",
        title: "Aahara Mela (Food Festival)",
        description: "Taste authentic Karnataka cuisine, tribal delicacies, and pan-Indian street food.",
        category: "Mela",
        start_time: "2026-10-11T10:00:00+05:30",
        end_time: "2026-10-21T22:30:00+05:30",
        venue: "Scouts & Guides Grounds",
        location: "Mysuru",
        lat: 12.3085,
        lng: 76.6492,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Indian_food_platter.jpg",
        status: "SCHEDULED",
        source_name: "Mysuru Dasara 2026",
        source_url: "https://mysoredasara.gov.in/",
        source_type: "OFFICIAL"
      }
    ],
    places: [
      {
        id: "pl-1",
        name: "Amba Vilas Palace (Mysuru Palace)",
        description: "The historical center of Dasara, illuminated with 100,000 bulbs every evening.",
        category: "Heritage",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Mysore_Palace_Illumination.jpg",
        distance: "0.0 km",
        status: "OPEN",
        source_name: "Karnataka Tourism",
      }
    ]
  };
  fs.writeFileSync('official_api_mock.json', JSON.stringify(mockApiData, null, 2));
  
  // Insert Events
  for (const ev of mockApiData.events) {
    await db.execute({
      sql: `
        INSERT INTO events (id, title, description, category, start_time, end_time, venue, location, lat, lng, image, status, source_name, source_url, source_type, last_verified_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET title=excluded.title
      `,
      args: [ev.id, ev.title, ev.description, ev.category, ev.start_time, ev.end_time, ev.venue, ev.location, ev.lat, ev.lng, ev.image, ev.status, ev.source_name, ev.source_url, ev.source_type, new Date().toISOString()]
    });
  }

  // Insert Places
  for (const pl of mockApiData.places) {
    await db.execute({
      sql: `
        INSERT INTO places (id, name, description, category, image, distance, status, source_name, last_verified_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET name=excluded.name
      `,
      args: [pl.id, pl.name, pl.description, pl.category, pl.image, pl.distance, pl.status, pl.source_name, new Date().toISOString()]
    });
  }

  console.log('Created official_api_mock.json fixture and seeded tables.');
}

migrate().catch(console.error);
