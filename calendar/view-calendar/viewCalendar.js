const { authorize } = require("../configuration");
const { google } = require("googleapis");
const { prompt } = require('prompt-sync')();

function getUserInput() {
  
  const prompt = require('prompt-sync')();
  
  userInput = prompt("Please enter the number of days you'd like to view on the calendar: (7, 14, 28) ");
  return userInput;
}


function validateInput(input) {
    const validDaysCommand = [7, 14, 28];
    parsedInput = parseInt(input);
    return validDaysCommand.includes(parsedInput);
}


function getUserPrompt() {
  let calendarLength;
  do {
    calendarLength = getUserInput();
    console.log("Please insert the valid number of days. (7, 14, 28)")
  } while (!validateInput(calendarLength));

  return calendarLength;
}


async function listEvents() {
    /**
     * Lists upcoming events on the user's primary calendar 
     */

    // Call the authorize function to obtain an authenticated client
    const auth = await authorize() 
    const now = new Date();
    const numberOfDays = 7;
    const timeMax = new Date(now.getTime() + numberOfDays * 24 * 60 * 60 * 1000);

    const formattedTimeMax = timeMax.toISOString();

    const calendar = google.calendar({version: 'v3', auth});
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      // maxResults: 10,
      timeMax: formattedTimeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return;
    }
    console.log('Upcoming events:');
    events.map((event, i) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`${start} - ${event.summary}`);
    });
}

// export { listEvents };z
module.exports = { listEvents }