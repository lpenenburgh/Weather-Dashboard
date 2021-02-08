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


//searching for city
var latestSearches = $("#latestSearches");
var citiesSearched = [];


function cityLookup(event) {
    event.preventDefault();
    city = $.trim($("#city-name").val());
    var requests = {
        method: 'GET',
        redirect: 'follow'
    };


    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c8223055e64b383b6a680afb8cf0f2e3'
    console.log(requestURL);
    fetch(requestURL, requests)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            
            //city name user entered apperears in current weather card 
            $("#present-City").text(city);

            //current city icon
            
            var presentIcon = data.weather[0].icon;
            console.log(presentIcon);
            $("#present-Icon").attr('src', "http://openweathermap.org/img/wn/" + (presentIcon) + "@2x.png" );
         
            
            
            
           


            //grabbing temp from the returned dara
            var presentTemp = data.main.temp;
            console.log(data.main.temp);
            //displaying temp in html     
            $("#present-Temp").text(presentTemp + " °F");

            //Grabbing humidity values from data
            var presentHumidity = data.main.humidity;
            console.log(presentHumidity);
            //display humidity
            $("#present-Humidity").text(presentHumidity);

            //grabbing wind speed then displaying it
            var presentWind = data.wind.speed;
            $("#present-Wind").text(presentWind);

            //variables for second fetch from onecall API

            var cityLat = data.coord.lat;
            var cityLon = data.coord.lon;
            //console.log(cityLat);
            var requestURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + '&lon=' + cityLon + "&units=imperial&exclude=minutely&appid=" + "c8223055e64b383b6a680afb8cf0f2e3";
            //console.log(requestURL2);
            fetch(requestURL2, requests)
            .then((response) => {
                return response.json();
            })
            .then(function (data) {
               // console.log(data);

                //grabbing UV index
                var presentUv = data.current.uvi;

                //displaying UV index
                $("#present-Index").text(presentUv);


                //day 2 temp and humidity
                var dateTwoTemp = data.daily[0].feels_like.day;
                var dateTwoHumid = data.daily[0].humidity;


                $("#temp-Two").text(dateTwoTemp);
                $("#humid-Two").text(dateTwoHumid);

                //day 3 temp and humidity
                var dateThreeTemp = data.daily[1].feels_like.day;
                var dateThreeHumid = data.daily[1].humidity;


                $("#temp-Three").text(dateThreeTemp);
                $("#humid-Three").text(dateThreeHumid);

                //day 4 temp and humidity
                var dateFourTemp = data.daily[2].feels_like.day;
                var dateFourHumid = data.daily[2].humidity;


                $("#temp-Four").text(dateFourTemp);
                $("#humid-Four").text(dateFourHumid);

                //day 5 temp and humidity
                var dateFiveTemp = data.daily[3].feels_like.day;
                var dateFiveHumid = data.daily[3].humidity;


                $("#temp-Five").text(dateFiveTemp);
                $("#humid-Five").text(dateFiveHumid);

                //day 6 temp and humidity
                var dateSixTemp = data.daily[4].feels_like.day;
                var dateSixHumid = data.daily[4].humidity;
                console.log(dateSixHumid);


                $("#temp-Six").text(dateSixTemp);
                $("#humid-Six").text(dateSixHumid);















            })






        })

    //saving user input into local storage
    citiesSearched.push(city)
    window.localStorage.setItem("cities", JSON.stringify(citiesSearched));
    //console.log(cityName);



    //function to display user input from local storage

    function renderUserInput() {
        citiesSearched = JSON.parse(window.localStorage.getItem("cities"));
        var listedCities = document.createElement("div");
        listedCities.classList.add("dropdown-item");
        listedCities.textContent = city;
        latestSearches.append(listedCities);

        // $("#latestSearches").html(citiesSearched.cityName);
    }

    renderUserInput();


}


//event listener for search button
var searchButton = $("button");

searchButton.click(cityLookup);