//Updating current date using Moment
var presentDate = moment().format('L');
$("#present-Date").text(presentDate);
//Updating 5 day forcast dates
var dateTwo = moment().add(1, 'days').format('L');
var dateThree = moment().add(2, 'days').format('L');
var dateFour = moment().add(3, 'days').format('L');
var dateFive = moment().add(4, 'days').format('L');
var dateSix = moment().add(5, 'days').format('L');
$("#date-Two").text(dateTwo);
$("#date-Three").text(dateThree);
$("#date-Four").text(dateFour);
$("#date-Five").text(dateFive);
$("#date-Six").text(dateSix);