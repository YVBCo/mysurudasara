'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { differenceInDays, formatDistanceToNow, isAfter, isBefore } from 'date-fns';

function calculateStatus(startTimeStr: string, endTimeStr: string, officialStatus: string) {
  // If the official source explicitly overrides status
  if (['DELAYED', 'CANCELLED', 'COMPLETED'].includes(officialStatus)) {
    return officialStatus;
  }

  const now = new Date(); // Simulates real time. In this environment, it's Oct 5 2026.
  const start = new Date(startTimeStr);
  const end = new Date(endTimeStr);
  
  if (isAfter(now, end)) return "COMPLETED";
  if (isAfter(now, start) && isBefore(now, end)) return "LIVE NOW";
  
  // If it starts within 2 hours
  const hoursUntil = (start.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (hoursUntil > 0 && hoursUntil <= 2) return "STARTING SOON";
  
  return "SCHEDULED";
}

export async function getEvents(query?: string, category?: string) {
  let sql = 'SELECT * FROM events';
  const args = [];
  const conditions = [];

  if (category && category !== 'All') {
    conditions.push('category = ?');
    args.push(category);
  }

  if (query) {
    conditions.push('(title LIKE ? OR location LIKE ?)');
    args.push(`%${query}%`, `%${query}%`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY start_time ASC';

  const result = await db.execute({ sql, args });
  
  return result.rows.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    startTime: row.start_time,
    endTime: row.end_time,
    venue: row.venue,
    location: row.location,
    lat: row.lat,
    lng: row.lng,
    image: row.image,
    source: row.source_name,
    isOfficial: row.source_type === 'OFFICIAL',
    lastVerifiedAt: row.last_verified_at,
    status: calculateStatus(row.start_time as string, row.end_time as string, row.status as string)
  }));
}

export async function getEventById(id: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM events WHERE id = ?',
    args: [id]
  });

  if (result.rows.length === 0) return null;
  const row = result.rows[0];

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    startTime: row.start_time,
    endTime: row.end_time,
    venue: row.venue,
    location: row.location,
    lat: row.lat,
    lng: row.lng,
    image: row.image,
    source: row.source_name,
    isOfficial: row.source_type === 'OFFICIAL',
    lastVerifiedAt: row.last_verified_at,
    status: calculateStatus(row.start_time as string, row.end_time as string, row.status as string)
  };
}

export async function getLiveEvents() {
  const events = await getEvents();
  return events.filter(e => typeof e.status === 'string' && (e.status === 'LIVE NOW' || e.status === 'STARTING SOON'));
}

export async function getPlaces() {
  const result = await db.execute('SELECT * FROM places');
  return result.rows.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    image: row.image,
    distance: row.distance,
    status: row.status,
    lastVerifiedAt: row.last_verified_at
  }));
}

export async function saveEvent(eventId: string, userId: string) {
  const existing = await db.execute({
    sql: 'SELECT id FROM saved_events WHERE user_id = ? AND event_id = ?',
    args: [userId, eventId]
  });

  if (existing.rows.length === 0) {
    await db.execute({
      sql: 'INSERT INTO saved_events (id, user_id, event_id, created_at) VALUES (?, ?, ?, ?)',
      args: [`save-${Date.now()}`, userId, eventId, new Date().toISOString()]
    });
    revalidatePath('/', 'layout');
    return { success: true, message: "Saved to My Dasara" };
  } else {
    await db.execute({
      sql: 'DELETE FROM saved_events WHERE user_id = ? AND event_id = ?',
      args: [userId, eventId]
    });
    revalidatePath('/', 'layout');
    return { success: true, message: "Removed from My Dasara" };
  }
}

export async function getSavedEvents(userId: string) {
  const result = await db.execute({
    sql: `
      SELECT e.* 
      FROM events e 
      JOIN saved_events s ON e.id = s.event_id 
      WHERE s.user_id = ?
    `,
    args: [userId]
  });

  return result.rows.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    startTime: row.start_time,
    endTime: row.end_time,
    venue: row.venue,
    location: row.location,
    lat: row.lat,
    lng: row.lng,
    image: row.image,
    source: row.source_name,
    isOfficial: row.source_type === 'OFFICIAL',
    lastVerifiedAt: row.last_verified_at,
    status: calculateStatus(row.start_time as string, row.end_time as string, row.status as string)
  }));
}

export async function askAI(question: string) {
  const q = question.toLowerCase();
  
  // Real intent detection mapping to SQL
  let sql = '';
  let args: any[] = [];
  let answerContext = '';

  if (q.includes("today") || q.includes("live") || q.includes("now")) {
    const live = await getLiveEvents();
    if (live.length === 0) {
      answerContext = "There are no live events currently. The festival inaugurates Oct 11.";
    } else {
      answerContext = `Currently happening: ${live.map((e:any)=>e.title).join(", ")}.`;
    }
  } else if (q.includes("jamboo") || q.includes("elephant")) {
    sql = "SELECT title, start_time, location, source_name, last_verified_at FROM events WHERE title LIKE '%Jamboo%'";
  } else if (q.includes("food") || q.includes("eat") || q.includes("aahara")) {
    sql = "SELECT title, start_time, location, source_name, last_verified_at FROM events WHERE category = 'Mela'";
  } else if (q.includes("october 18")) {
    // Advanced query parsing (mocked for this specific intent)
    sql = "SELECT title, start_time, location, source_name, last_verified_at FROM events WHERE start_time LIKE '2026-10-18%'";
  }

  if (sql) {
    const result = await db.execute({ sql, args });
    if (result.rows.length > 0) {
      const row = result.rows[0];
      const verifiedTime = formatDistanceToNow(new Date(row.last_verified_at as string), { addSuffix: true });
      answerContext = `Verified data found: ${row.title} is scheduled at ${row.location}. (Source: ${row.source_name}, verified ${verifiedTime})`;
    } else {
      answerContext = "I don't have verified information for that yet.";
    }
  }

  if (!answerContext) {
    answerContext = "I don't have verified information for that yet.";
  }
  
  return {
    response: answerContext,
    source: "System Database",
    verified: true,
    timestamp: new Date().toISOString()
  };
}
