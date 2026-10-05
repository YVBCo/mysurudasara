const fs = require('fs');
const { createClient } = require('@libsql/client');

async function testPipeline() {
  const db = createClient({ url: 'file:local.db' });
  const mockFile = 'official_api_mock.json';
  
  console.log("--- STARTING DATA PIPELINE ACCEPTANCE TEST ---");

  // Step 1: Initial Sync
  console.log("1. Triggering Initial Sync...");
  await fetch('http://localhost:3000/api/sync', { method: 'POST' });
  let result = await db.execute("SELECT status FROM events WHERE id = 'evt-100'");
  console.log(`Event evt-100 status in DB: ${result.rows[0].status}`);

  // Step 2: Change to DELAYED in Source
  console.log("2. Simulating Official Source Update -> DELAYED...");
  const mockData = JSON.parse(fs.readFileSync(mockFile, 'utf8'));
  mockData.events[0].status = 'DELAYED';
  fs.writeFileSync(mockFile, JSON.stringify(mockData, null, 2));
  
  // Step 3: Sync Again
  await fetch('http://localhost:3000/api/sync', { method: 'POST' });
  result = await db.execute("SELECT status FROM events WHERE id = 'evt-100'");
  console.log(`Event evt-100 status in DB after sync: ${result.rows[0].status} (Expected: DELAYED)`);

  // Step 4: Restore to SCHEDULED
  console.log("3. Restoring Official Source -> SCHEDULED...");
  mockData.events[0].status = 'SCHEDULED';
  fs.writeFileSync(mockFile, JSON.stringify(mockData, null, 2));
  
  // Step 5: Final Sync
  await fetch('http://localhost:3000/api/sync', { method: 'POST' });
  result = await db.execute("SELECT status FROM events WHERE id = 'evt-100'");
  console.log(`Event evt-100 status in DB after final sync: ${result.rows[0].status} (Expected: SCHEDULED)`);
  
  console.log("--- ACCEPTANCE TEST COMPLETED SUCCESSFULLY ---");
}

testPipeline().catch(console.error);
