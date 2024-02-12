const { listEvents } = require("../view-calendar/viewCalendar");
const { authorize } = require("../configuration");

function main() {
    /**
     * Function is responsible for orchestrating the execution of the entire program by calling function from
     * other modules
     */
    authorize().then(listEvents).catch(console.error);
}

main();