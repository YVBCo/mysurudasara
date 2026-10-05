import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

function hashContent(obj: any) {
  return crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}

export async function POST() {
  try {
    const startedAt = new Date().toISOString();
    
    // 1. Fetch source data (Simulating fetch from https://mysoredasara.gov.in/api)
    const mockFilePath = path.join(process.cwd(), 'official_api_mock.json');
    const rawData = await fs.readFile(mockFilePath, 'utf-8');
    const sourceData = JSON.parse(rawData);
    
    let updatedCount = 0;

    // 2. Parse & Validate & Compare Events
    for (const event of sourceData.events) {
      const contentHash = hashContent(event);
      const retrievedAt = new Date().toISOString();

      // Check if exists and hash matches
      const existing = await db.execute({
        sql: 'SELECT content_hash FROM events WHERE id = ?',
        args: [event.id]
      });

      if (existing.rows.length === 0 || existing.rows[0].content_hash !== contentHash) {
        // Upsert
        await db.execute({
          sql: `
            INSERT INTO events (
              id, title, description, category, start_time, end_time, venue, location, 
              lat, lng, image, status, source_name, source_url, source_type, 
              retrieved_at, last_verified_at, updated_at, content_hash
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET 
              title=excluded.title, description=excluded.description, category=excluded.category,
              start_time=excluded.start_time, end_time=excluded.end_time, venue=excluded.venue,
              location=excluded.location, lat=excluded.lat, lng=excluded.lng, image=excluded.image,
              status=excluded.status, source_name=excluded.source_name, source_url=excluded.source_url,
              source_type=excluded.source_type, retrieved_at=excluded.retrieved_at,
              last_verified_at=excluded.last_verified_at, updated_at=excluded.updated_at,
              content_hash=excluded.content_hash
          `,
          args: [
            event.id, event.title, event.description, event.category, event.start_time, event.end_time,
            event.venue, event.location, event.lat, event.lng, event.image, event.status || 'SCHEDULED',
            event.source_name, event.source_url, event.source_type,
            retrievedAt, retrievedAt, retrievedAt, contentHash
          ]
        });
        updatedCount++;
      } else {
        // Update verified timestamp only
        await db.execute({
          sql: 'UPDATE events SET last_verified_at = ? WHERE id = ?',
          args: [retrievedAt, event.id]
        });
      }
    }

    // 3. Parse Places (similar pattern)
    for (const place of sourceData.places) {
      await db.execute({
        sql: `
          INSERT INTO places (id, name, description, category, image, distance, status, source_name, last_verified_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            name=excluded.name, description=excluded.description, category=excluded.category,
            image=excluded.image, distance=excluded.distance, status=excluded.status,
            source_name=excluded.source_name, last_verified_at=excluded.last_verified_at
        `,
        args: [
          place.id, place.name, place.description, place.category, place.image,
          place.distance, place.status, place.source_name, new Date().toISOString()
        ]
      });
    }

    // 4. Log Sync
    const completedAt = new Date().toISOString();
    await db.execute({
      sql: 'INSERT INTO sync_logs (started_at, completed_at, status, records_updated) VALUES (?, ?, ?, ?)',
      args: [startedAt, completedAt, 'SUCCESS', updatedCount]
    });

    return NextResponse.json({ success: true, updatedCount, completedAt });
  } catch (error: any) {
    console.error('Sync Error:', error);
    await db.execute({
      sql: 'INSERT INTO sync_logs (started_at, status, errors) VALUES (?, ?, ?)',
      args: [new Date().toISOString(), 'FAILED', error.message]
    });
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
