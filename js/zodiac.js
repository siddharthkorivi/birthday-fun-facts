function getZodiac(month, day) {
    var datecode = month * 100 + day; //this will give us a number represent month and day
    if (datecode <= 119) {        // Jan 19
        return "Capricorn";
    } else if (datecode <= 219) { // Feb 19
        return "Aquarius";
    } else if (datecode <= 320) { // Mar 20
        return "Pisces";
    } else if (datecode <= 420) { // Apr 20
        return "Aries";
    } else if (datecode <= 520) { // May 20
        return "Taurus";
    } else if (datecode <= 620) { // Jun 20
        return "Gemini";
    } else if (datecode <= 722) { // Jul 22
        return "Cancer";
    } else if (datecode <= 822) {
        return "Leo";
    } else if (datecode <= 922) { // Sept 22
        return "Virgo";
    } else if (datecode <= 1022) { // Oct 22
        return "Libra";
    } else if (datecode <= 1122) { // Nov 22
        return "Scorpio";
    } else if (datecode <= 1221) { // Dec 21
        return "Sagittarius";
    } else { //if we hit this case it means we hava greater date code than Dec 21
        return "Capricorn";
    }
}
