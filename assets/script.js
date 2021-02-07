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

       //grabbing temp from the returned dara
       var presentTemp = data.main.temp;
       console.log(data.main.temp);
       //displaying temp in html     
       $("#present-Temp").text(presentTemp);    

       //Grabbing humidity values from data
       var presentHumidity = data.main.humidity;
       console.log(presentHumidity);
       //display humidity
       $("#present-Humidity").text(presentHumidity);





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