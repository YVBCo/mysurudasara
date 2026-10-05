const { getEvents, getLiveEvents, saveEvent, getSavedEvents, resetDb } = require('./src/app/actions');

async function runE2ETest() {
  console.log('🧪 Starting End-to-End Simulation Test...');
  const USER_ID = 'test-user-123';
  
  try {
    // 1. Reset Database
    console.log('Resetting database...');
    await resetDb();
    
    // 2. Fetch all events (Home Page load)
    console.log('Fetching live events for Home Page...');
    const liveEvents = await getLiveEvents();
    if (liveEvents.length > 0) {
      console.log(`✅ Success: Found ${liveEvents.length} live events.`);
    } else {
      throw new Error('❌ Failed: No live events found.');
    }
    
    // 3. Search events (Events Page)
    console.log('Searching for "Wrestling"...');
    const searchResults = await getEvents('Wrestling');
    if (searchResults.length === 1 && searchResults[0].title.includes('Kusti')) {
      console.log(`✅ Success: Search found exactly 1 match: ${searchResults[0].title}`);
    } else {
      throw new Error('❌ Failed: Search did not return expected results.');
    }
    
    // 4. Save an event (Interaction)
    const targetEventId = searchResults[0].id;
    console.log(`Saving event ID ${targetEventId} to My Dasara...`);
    const saveRes = await saveEvent(targetEventId, USER_ID);
    if (saveRes.success && saveRes.message === 'Saved to My Dasara') {
      console.log('✅ Success: Event saved successfully.');
    } else {
      throw new Error('❌ Failed: Save event action failed.');
    }
    
    // 5. Fetch saved events (My Dasara Page)
    console.log('Fetching saved events for My Dasara Dashboard...');
    const savedEvents = await getSavedEvents(USER_ID);
    if (savedEvents.length === 1 && savedEvents[0].id === targetEventId) {
      console.log('✅ Success: Saved event appears on My Dasara page.');
    } else {
      throw new Error('❌ Failed: Saved event not found on My Dasara page.');
    }
    
    // 6. Unsave event (Interaction Toggle)
    console.log(`Removing event ID ${targetEventId} from My Dasara...`);
    const unsaveRes = await saveEvent(targetEventId, USER_ID);
    if (unsaveRes.success && unsaveRes.message === 'Removed from My Dasara') {
      console.log('✅ Success: Event removed successfully.');
    } else {
      throw new Error('❌ Failed: Unsave event action failed.');
    }
    
    const finalSaved = await getSavedEvents(USER_ID);
    if (finalSaved.length === 0) {
      console.log('✅ Success: My Dasara dashboard is empty again.');
    } else {
      throw new Error('❌ Failed: Event was not removed properly.');
    }
    
    console.log('\n🎉 ALL END-TO-END TESTS PASSED PERFECTLY 100% 🎉');
    
  } catch (error) {
    console.error('\n💥 TEST FAILED:');
    console.error(error.message);
    process.exit(1);
  }
}

runE2ETest();
