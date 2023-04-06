function createEmployeeRecord(employee) {

    return {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);


  function createEmployeeRecords(employeeOfemployees) {
    return employeeOfemployees.map((employee) => createEmployeeRecord(employee));
  }
  function createTimeInEvent(record, dateTime) {
    let [date, hour] = dateTime.split(" ");
    record.timeInEvents.push({ type: "TimeIn", date: date, hour: parseInt(hour) });
    return record;
  }
  function createTimeOutEvent(record, dateTime) {
    let [date, hour] = dateTime.split(" ");
    record.timeOutEvents.push({ type: "TimeOut", date: date, hour: parseInt(hour) });
    return record;
  }
  function hoursWorkedOnDate(record, date) {
    let timeInEvent = record.timeInEvents.find((e) => e.date === date);
    let timeOutEvent = record.timeOutEvents.find((e) => e.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date);
    return hours * record.payPerHour;
  }
  function allWagesFor(record) {
    let dates = record.timeInEvents.map((e) => e.date);
    let wages = dates.reduce((acc, date) => acc + wagesEarnedOnDate(record, date), 0);
    return wages;
  }
  function calculatePayroll(records) {
    return records.reduce((acc, record) => acc + allWagesFor(record), 0);
  }