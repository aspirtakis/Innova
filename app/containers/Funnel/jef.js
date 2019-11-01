function() {
   var myTimeZone = +1;
   var userTime = new Date();
   var utc = userTime.getTime() + (userTime.getTimezoneOffset() * 60000);
   var currentDate = new Date(utc + (3600000 * myTimeZone));
    var daysOfWeek = new Array(7);
    daysOfWeek[0]=  "Sunday";
    daysOfWeek[1] = "Monday";
    daysOfWeek[2] = "Tuesday";
    daysOfWeek[3] = "Wednesday";
    daysOfWeek[4] = "Thursday";
    daysOfWeek[5] = "Friday";
    daysOfWeek[6] = "Saturday";
   var today = new Date();
   var Hour = today.getHours();
   if ((daysOfWeek[currentDate.getDay()] == "Saturday" || daysOfWeek[currentDate.getDay()] == "Sunday") || (Hour < 11 || Hour > 14)){
       return (1);
   } else {
       return (0);
   }
}
