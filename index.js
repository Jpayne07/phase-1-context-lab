let testEmployee = ["Gray", "Worm", "Security", 2];

function createEmployeeRecord(details) {
    return {
      firstName: details[0],
      familyName: details[1],
      title: details[2],
      payPerHour: details[3],
      timeInEvents: [],
      timeOutEvents: [],
      timeIn: createTimeInEvent,
      timeOut: createTimeOutEvent,
      hoursWorked: hoursWorkedOnDate,
      wagesEarned: wagesEarnedOnDate,
      allWagesFor: allWagesFor,
      findEmployeeByFirstName: findEmployeeByFirstName
      
    };
  }
  
  function createEmployeeRecords(testEmployees) {
    return testEmployees.map(createEmployeeRecord);
  }

  function createTimeInEvent(date) {
    let clockIn = {
      type: "TimeIn",
      hour: parseInt(date.slice(11, 15)),
      date: date.slice(0, 10)
    };    
    this.timeInEvents.push(clockIn);
    return this
  }
  

  function createTimeOutEvent(date) {
    let clockOut = {
      type: "TimeOut",
      hour: parseInt(date.slice(11, 15)),
      date: date.slice(0, 10)
    };    
    this.timeOutEvents.push(clockOut);
    return this;
  }

function hoursWorkedOnDate(date) {
    let hoursWorked = 0;
    let timeInDate = this.timeInEvents.find(obj => obj.date === date);
    let timeOutDate = this.timeOutEvents.find(obj => obj.date === date);
    let timeInHour = 0
    let timeOutHour = 0
  
    if (timeInDate && timeOutDate) {
      timeOutHour = parseInt(timeOutDate.hour.toString().replace(/0{2}$/, ''));
      console.log(`TimeOut:${timeOutHour}`)
      timeInHour = parseInt(timeInDate.hour.toString().replace(/0{2}$/, ''));
      console.log(`TimeIn:${timeInHour}`)
      hoursWorked = timeOutHour - timeInHour ;
      console.log(`Hours Worked: ${hoursWorked}`)
    }
    
    return hoursWorked;
  }

function wagesEarnedOnDate(date) {
    let hours  = hoursWorkedOnDate.call(this, date)
    let dailyPay = 0
    dailyPay = hours * this.payPerHour
    debugger
    
    return dailyPay

}

function findEmployeeByFirstName(src, firstName){
    let array = src.find(obj => obj.firstName === firstName);
    return array
}

function calculatePayroll(employees) {
    let totalWages = 0;
  
    employees.forEach(function(employee) {
      const wages = employee.allWagesFor();
      totalWages += wages;
    });
  
    return totalWages;
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    console.log(payable)
    console.log(this.hoursWorked())
    debugger
    return payable
}
      let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
      let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

      let sTimeData = [
        ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
        ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
      ]

      let rTimeData = [
        ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
        ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 30 ===> 70 total ||=> 770
      ]

      sTimeData.forEach(function (d) {
        let [dIn, dOut] = d
        createTimeInEvent.call(sRecord, dIn)
        createTimeOutEvent.call(sRecord, dOut)
      })

      rTimeData.forEach(function (d, i) {
        let [dIn, dOut] = d
        createTimeInEvent.call(rRecord, dIn)
        createTimeOutEvent.call(rRecord, dOut)
      })

      let grandTotalOwed = [sRecord, rRecord].reduce((m, e) => m + allWagesFor.call(e), 0)
      expect(grandTotalOwed).to.equal(770)
