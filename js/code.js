$("#dateOfBirth").datepicker({
    showOtherMonths: true,
    yearRange: `1900: ${new Date().getFullYear()}`,
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd/mm/yy",
    showWeek: true,
    weekHeader: "Week",
});

let dob, dateTime, userDate, diffMill, renewNeeded;
let momentNow, momentUser;
let weekDaysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

document.body.style = "white-space: pre;";

function convert(userDate) {
    let parts = userDate.split("/");
    let dt = new Date(parseInt(parts[2], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[0], 10));
    return dt;
}

function getDiff(momentStart, momentEnd) {
    let duration = moment.duration(momentEnd.diff(momentStart));
    return duration;
}

function getBirthdayDiff() {
    while (momentUser < momentNow) {
        momentUser.add(1, "year");
    }
    let date = momentUser;
    let duration = getDiff(momentNow, date)
    return duration;
}

function getMilliSecs(duration) {
    return Math.floor(duration.asMilliseconds());
}

function getSecs(duration) {
    return Math.floor(duration.asSeconds());
}

function getMins(duration) {
    return Math.floor(duration.asMinutes());
}

function getHrs(duration) {
    return Math.floor(duration.asHours());
}

function getDays(duration) {
    return Math.floor(duration.asDays());
}

function getWeeks(duration) {
    return Math.floor(duration.asWeeks());
}

function getYears(duration) {
    return Math.floor(duration.asYears());
}

function getMonths(duration) {
    return Math.floor(duration.asMonths());
}

let factNo;

function factMessage(message, canShowFact) {
    if (canShowFact) {
        $("#factBox").append(document.createTextNode(`Fact ${factNo++}: You are ${message} old. \n`));
    }
}

function birthdayMessage(message, canShowFact) {
    if (canShowFact) {
        $("#factBox").append(document.createTextNode(`Fact ${factNo++}: Your next birthday is ${message} away. \n`));
    }
}

function getWeekDay(date) {
    let weekDay = date.day();
    return weekDaysArray[weekDay];
}

function birthDayOfWeek(message) {
    $("#factBox").append(document.createTextNode(`Fact ${factNo++}: ${message} \n`));
}

function zodiacMessage(zodaic) {
    $("#factBox").append(document.createTextNode(`Fact ${factNo++}: Your star sign is ${zodaic}. \n`));
}

function showBirthday(message) {
    $("#factBox").append(document.createTextNode(`Fact ${factNo++}: ${message} \n`));
}

function checkForBirthday() {
    if (momentUser.date() == momentNow.date()
        && momentUser.month() == momentNow.month()
        && momentUser.year() == momentNow.year()) {
        showBirthday(`You were born today! How come you're using this?`)
    } else if (momentUser.date() == momentNow.date()
        && momentUser.month() == momentNow.month()) {
        showBirthday(`It's your birthday today! Happy Birthday!`)
    }
}

function showFacts(dob) {

    factNo = 1;

    let duration = getDiff(momentUser, momentNow);

    $("#errorMessage").empty();

    checkForBirthday();

    zodiacMessage(getZodiac(momentUser.month() + 1, momentUser.date()))

    birthDayOfWeek(`You were born on ${getWeekDay(momentUser)}.`)

    factMessage(`${getYears(duration)} years`, getYears(duration) > 0)

    factMessage(`${getMonths(duration)} months`, getMonths(duration) > 0)

    factMessage(`${getWeeks(duration)} weeks`, getWeeks(duration) > 0)

    factMessage(`${getDays(duration)} days`, getDays(duration) > 0)

    factMessage(`${getHrs(duration)} hours`, getHrs(duration) > 0)

    factMessage(`${getMins(duration)} minutes`, getMins(duration) > 0)

    factMessage(`${getSecs(duration)} seconds`, getSecs(duration) > 0)

    let birthdateDuration = getBirthdayDiff();

    birthDayOfWeek(`Your next birthday is on ${getWeekDay(momentUser)}.`)

    birthdayMessage(`${getMonths(birthdateDuration)} months`, getMonths(birthdateDuration) > 0)

    birthdayMessage(`${getWeeks(birthdateDuration)} weeks`, getWeeks(birthdateDuration) > 0)

    birthdayMessage(`${getDays(birthdateDuration)} days`, getDays(birthdateDuration) > 0)

    birthdayMessage(`${getHrs(birthdateDuration)} hours`, getHrs(birthdateDuration) > 0)

    birthdayMessage(`${getMins(birthdateDuration)} minutes`, getMins(birthdateDuration) > 0)

    birthdayMessage(`${getSecs(birthdateDuration)} seconds`, getSecs(birthdateDuration) > 0)


    $("#factBox").fadeTo(500, 1);
}

function renewElement(elementId) {
    var element = $(elementId);
    element.fadeTo(500, 0);
    element.empty();
}

function createErrorMessage(elementId) {
    const error = document.createElement("div")
    error.id = elementId;
}

function showErrorText(elementId, errorMsg) {
    createErrorMessage();
    let element = $(elementId)
    element.empty();
    element.append(document.createTextNode(errorMsg));
    element.css({ "paddingLeft": "10px", "paddingRight": "10px", "padding": "25px" });
    $("#errorMessage").fadeTo(500, 1);
}

$(".buttons").click(function () {
    renewElement("#factBox");
    dob = $("#dateOfBirth").val();
    momentNow = moment(new Date());
    momentUser = moment(convert(dob));

    if (!dob) {
        showErrorText("#errorMessage", "❗❗ Select your Date of Birth please. ❗❗");
    } else if (momentUser > momentNow) {
        showErrorText("#errorMessage", "❗❗ Please select a date that is not in the future. ❗❗");
    } else if (!momentUser.isValid()) {
        showErrorText("#errorMessage", "❗❗ Please select a valid date. ❗❗");
    } else {
        showFacts(dob);
        getBirthdayDiff();
    }

})

$("#dateOfBirth").click(function () {
    $("#errorMessage").fadeTo(500, 0);
})
