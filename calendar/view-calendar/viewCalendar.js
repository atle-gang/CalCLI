const { authorize } = require("../configuration");
const { google } = require("googleapis");
const { prompt } = require('prompt-sync')();

function getUserPrompt() {
  const validDaysCommand = [7, 14, 28]


  const calendarLength = prompt("Please enter the number of days you'd like to view on the calendar: (7, 14, 28) ");
  console.log(parseInt(calendarLength))
}

// getUserPrompt()

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

// export { listEvents };z
module.exports = { listEvents }