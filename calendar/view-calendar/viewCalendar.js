const { authorize } = require("../configuration");
const { google } = require("googleapis");

async function listEvents() {
    /**
     * Lists upcoming events on the user's primary calendar 
     */

    // Call the authorize function to obtain an authenticated client
    const auth = await authorize() 

    const calendar = google.calendar({version: 'v3', auth});
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return;
    }
    console.log('Upcoming 10 events:');
    events.map((event, i) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`${start} - ${event.summary}`);
    });
}

// export { listEvents };
module.exports = { listEvents }