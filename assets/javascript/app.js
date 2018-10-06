// TODO: Add the following content to the park.html page
// CAMPGROUNDS
// TODO: DRY on-click functions by attaching a class and running getWeatherData(data-category). 
//Buttons share the same class but unique data-category

$('document').ready(function () {
    
    
    var $content = $('#content')
    
    var lat = 0;
    var lon = 0;

    $(document).on("click", '#5-day-forecast', function () {
        getWeatherData('forecast');
    });
    $(document).on("click", '#current-weather', function () {
        getWeatherData('weather');
    });
    $(document).on("click", '#park-description', function () {
        getData('parks');
    });
    $(document).on("click", '#park-visitors', function () {
        getData('visitorcenters');
    });
    $(document).on("click", '#park-events', function () {
        getData('events');
    });
    $(document).on("click", '#park-alerts', function () {
        getData('alerts');
    });
    $(document).on("click", '#park-articles', function () {
        getData('articles');
    });
    $(document).on("click", '#park-header', function () {
        $content.empty();
    });

    //Incrementing this counter within various loops allows each element added to the DOM to have a unique id
    var globalCounter = 0;

    // The following Object pairs the park names to their respective link addresses 
    var parksNameURL = {
        'Acadia National Park': 'acadia.html',
        'Arches National Park': 'arches.html',
        'Badlands National Park': 'badlands.html',
        'Big Bend National Park': 'big-bend.html',
        'Biscayne National Park': 'biscayne.html',
        'Black Canyon of the Gunnison National Park': 'black-canyon-of-the-gunnison.html',
        'Bryce Canyon National Park': 'bryce-canyon.html',
        'Canyonlands National Park': 'canyonlands.html',
        'Capitol Reef National Park': 'capitol-reef.html',
        'Carlsbad Caverns National Park': 'carlsbad-caverns.html',
        'Channel Islands National Park': 'channel-islands.html',
        'Congaree National Park': 'congaree.html',
        'Crater Lake National Park': 'crater-lake.html',
        'Cuyahoga Valley National Park': 'cuyahoga-valley.html',
        'Death Valley National Park': 'death-valley.html',
        'Denali National Park': 'denali.html',
        'Dry Tortugas National Park': 'dry-tortugas.html',
        'Everglades National Park': 'everglades.html',
        'Gates of the Arctic National Park': 'gates-of-the-arctic.html',
        'Glacier National Park': 'glacier.html',
        'Glacier Bay National Park': 'glacier-bay.html',
        'Grand Canyon National Park': 'grand-canyon.html',
        'Grand Teton National Park': 'grand-teton.html',
        'Great Basin National Park': 'great-basin.html',
        'Great Sand Dunes National Park': 'great-sand-dunes.html',
        'Great Smoky Mountains National Park': 'great-smoky-mountains.html',
        'Guadalupe Mountains National Park': 'guadalupe-mountains.html',
        // 'Haleakalᾱ National Park': 'haleakala.html',
        'Hawaii Volcanoes National Park': 'hawaii-volcanoes.html',
        'Hot Springs National Park': 'hot-springs.html',
        'Isle Royale National Park': 'isle-royale.html',
        'Joshua Tree National Park': 'joshua-tree.html',
        'Katmai National Park': 'katmai.html',
        'Kenai Fjords National Park': 'kenai-fjords.html',
        'Kings Canyon National Park': 'kings-canyon.html',
        'Kobuk Valley National Park': 'kobuk-valley.html',
        'Lake Clark National Park': 'lake-clark.html',
        'Lassen Volcanic National Park': 'lassen-volcanic.html',
        'Mammoth Cave National Park': 'mammoth-cave.html',
        'Mesa Verde National Park': 'mesa-verde.html',
        'National Park of American Samoa': 'american-samoa.html',
        'North Cascades National Park': 'north-cascades.html',
        'Olympic National Park': 'olympic.html',
        'Petrified Forest National Park': 'petrified-forest.html',
        'Pinnacles National Park': 'pinnacles.html',
        'Redwood National and State Parks': 'redwood.html',
        'Rocky Mountain National Park': 'rocky-mountain.html',
        'Saguaro National Park': 'saguaro.html',
        'Sequoia & Kings Canyon National Park': 'sequoia.html',
        'Shenandoah National Park': 'shenandoah.html',
        'Theodore Roosevelt National Park': 'theodore-roosevelt.html',
        'Virgin Islands National Park': 'virgin-islands.html',
        'Voyageurs National Park': 'voyageurs.html',
        'Wind Cave National Park': 'wind-cave.html',
        'Wrangell - St Elias National Park & Preserve': 'wrangell-st-elias.html',
        'Yellowstone National Park': 'yellowstone.html',
        'Yosemite National Park': 'yosemite.html',
        'Zion National Park': 'zion.html'
    }

    // When the user chooses a park, open the respective page
    $('#search-3').on('click', function (event) {
        var parkChosen = $('#search-2').val();
        localStorage.clear();
        localStorage.setItem('park-name', parkChosen);
        window.location.assign('park.html')
    })

    //===============================================================
    //NPS API
    //===============================================================

    // API keys
    var parkDescription = '';
    var NPSkey = '7MdKWFV9urqKPc9MCwPZQ0QNbopENRTWAYjJ7aKH';

    // NPS API has 10 different categories, so create an array with categories
    var NPSCategories = [
        'alerts',
        'articles',
        'campgrounds',
        'events',
        'lessonplans',
        'newsreleases',
        'parks',
        'people',
        'places',
        'visitorcenters'
    ]

    // Each API category returns different data structures, so create a unique method for each category
    // Nearly 400 lines so collapse for easier navigation
    var NPSContentBuilderMethods = {
        // each following method name matches the API call category exactly
        alerts: function (element, cat) { //passing in the element(object returned by the API call) and the cat(category)
            // create a new variable for each piece of data
            var title = element.title;
            var category = element.category;
            var description = element.description;
            var parkCode = element.parkCode;
            var url = element.url;
            // content has a header of cat(category) and individual divs with the content
            var header = buildCardHeader(title);
            buildCard(header, description, url);

        },
        articles: function (element, cat) {
            var listingDescription = element.listingDescription;
            var listingImage = element.listingImage.url;
            var relatedParks = element.relatedParks;
            var title = element.title;
            var url = element.url;
            var id = element.id;
            var latLong = element.latLong;
            var header = buildCardHeader(title);
            buildCard(header, listingDescription, url)
        },
        campgrounds: function (element, cat) {
            //BINGO
            var accessibility = `
<br>accessRoads:  ${element.accessibility.accessRoads}
<br>adaInfo:  ${element.accessibility.adaInfo}
<br>additionalInfo:  ${element.accessibility.additionalInfo}
<br>cellPhoneInfo:  ${element.accessibility.cellPhoneInfo}
<br>classifications:  ${element.accessibility.classifications}
<br>fireStovePolicy:  ${element.accessibility.fireStovePolicy}
<br>internetInfo:  ${element.accessibility.internetInfo}
<br>rvAllowed:  ${element.accessibility.rvAllowed}
<br>rvMaxLength:  ${element.accessibility.rvMaxLength}
<br>trailerAllowed:  ${element.accessibility.trailerAllowed}
<br>trailerMaxLength:  ${element.accessibility.trailerMaxLength}
<br>wheelChairAccess:  ${element.accessibility.wheelChairAccess}`
            var amenities = `
<br>amphitheater:  ${element.amenities.amphitheater}
<br>ampitheater:  ${element.amenities.ampitheater}
<br>campStore:  ${element.amenities.campStore}
<br>cellPhoneReception:  ${element.amenities.cellPhoneReception}
<br>dumpStation:  ${element.amenities.dumpStation}
<br>THERE ARE MANY MORE OF THESE`;
            var campsites = element.campsites.totalSites;
            var description = element.description;
            var directionsOverview = element.directionsOverview;
            var directionsUrl = element.directionsUrl;
            var id = element.id;
            var latLong = element.latLong;
            var name = element.name;
            var parkCode = element.parkCode;
            var regulationsOverview = element.regulationsOverview;
            var regulationsUrl = element.regulationsUrl;
            var reservationsDescription = element.reservationsDescription;
            var reservationsSitesFirstCome = element.reservationsSitesFirstCome;
            var reservationsSitesReservable = element.reservationsSitesReservable;
            var reservationsUrl = element.reservationsUrl;
            var weatherOverview = element.weatherOverview;
            var card = `
      <div class="card">
      <div class="card-header">
          <h5 class="mb-0">
              Campgrounds - ${name}
          </h5>
      </div>
      <div class="card-body">
          <div class="campground-accessibility"><strong>Campground accessibility: </strong>${accessibility}</div>
          <br>
          <div class="campground-amenities">Campground amenities: ${amenities}</div>
          <br>
          <div class="campground-campsites">Campground campsites: ${campsites}</div>
          <br>
          <div class="campground-description">Campground description: ${description}</div>
          <br>
          <div class="campground-directionsOverview">Campground directionsOverview: ${directionsOverview}</div>
          <br>
          <div class="campground-directionsUrl">Campground directionsUrl: ${directionsUrl}</div>
          <br>
          <div class="campground-id">Campground id: ${id}</div>
          <br>
          <div class="campground-latLong">Campground latLong: ${latLong}</div>
          <br>
          <div class="campground-name">Campground name: ${name}</div>
          <br>
          <div class="campground-parkCode">Campground parkCode: ${parkCode}</div>
          <br>
          <div class="campground-regulationsOverview">Campground regulationsOverview: ${regulationsOverview}</div>
          <br>
          <div class="campground-regulationsUrl">Campground regulationsUrl: ${regulationsUrl}</div>
          <br>
          <div class="campground-reservationsDescription">Campground reservationsDescription:
              ${reservationsDescription}</div>
          <br>
          <div class="campground-reservationsSitesFirstCome">Campground reservationsSitesFirstCome:
              ${reservationsSitesFirstCome}</div>
          <br>
          <div class="campground-reservationsSitesReservable">Campground reservationsSitesReservable:
              ${reservationsSitesReservable}</div>
          <br>
          <div class="campground-reservationsUrl">Campground reservationsUrl: ${reservationsUrl}</div>
          <br>
          <div class="campground-weatherOverview">Campground weatherOverview: ${weatherOverview}</div>
      </div>
  </div>
     `
            $content.prepend(card);
        },
        parks: function (element, cat) {
            var description = element.description;
            console.log("here");
            var directionsInfo = element.directionsInfo;
            var directionsUrl = element.directionsUrl;
            var fullName = element.fullName;
            var latLong = element.latLong;
            var name = element.name;
            var states = element.states;
            var url = element.url;
            var weatherInfo = element.weatherInfo;
            $(document).on("click", '#park-website', function () {
                window.location.assign(url);
            });
            $(document).on("click", '#park-directions', function () {
                window.location.assign(directionsUrl);
            });
            var latLongSplit = latLong.split(', long:');
            lat = latLongSplit[0].substring(4,latLongSplit[0].length);
            lon = latLongSplit[1];

            // console.log(latLong);
            // var gpsURL = 'https://www.google.com/maps/?q='+lat+','+lon;
            var gpsURL = 'https://www.google.com/maps/@'+lat+','+lon+',12z';
            $(document).on("click", '#park-gps-location', function () {
                window.location.assign(gpsURL);
            });

            var header = buildCardHeader('PARK DESCRIPTION');
            buildCard(header, description, url);
        },
        events: function (element, cat) {
            var abstract = element.abstract;
            var dates = element.dates.substring(0, 98); //there are 40,000+ dates for recurring events
            var feeInformation = element.feeInformation;
            var id = element.id;
            var image = element.image.url;
            var location = element.location;
            var parkCode = element.parkCode;
            var url = element.url;
            var recurrence = element.recurrence.frequency;
            var time = element.time;
            var title = element.title;
            var header = buildCardHeader(title);
            buildCard(header, abstract, url);
        },
        lessonplans: function (element, cat) {
            var commonCore = element.commonCore.stateStandards;
            var gradeLevel = element.gradeLevel;
            var questionObjective = element.questionObjective;
            var subject = element.subject;
            var title = element.title;
            var duration = element.duration;
            var url = element.url;
            var parks = element.parks;
            var id = element.id;
            var card = `
      <div class="card">
      <div class="card-header">
          <h5 class="mb-0">
              Lesson Plans - ${title}
          </h5>
      </div>
      <div class="card-body">
          <div class="lessonplans-commonCore">
              Lessonplans Common Core: ${commonCore}
          </div>
          <br>
          <div class="lessonplans-gradeLevel">
              Lessonplans Grade Level: ${gradeLevel}
          </div>
          <br>
          <div class="lessonplans-questionObjective">
              Lessonplans Question Objective: ${questionObjective}
          </div>
          <br>
          <div class="lessonplans-subject">
              lessonplans-subject: ${subject}
          </div>
          <br>
          <div class="lessonplans-title">
              lessonplans-title: ${title}
          </div>
          <br>
          <div class="lessonplans-duration">
              lessonplans-duration: ${duration}
          </div>
          <br>
          <div class="lessonplans-url">
              lessonplans-url: ${url}
          </div>
          <br>
          <div class="lessonplans-parks">
              lessonplans-parks: ${parks}
          </div>
          <br>
          <div class="lessonplans-ID">
              lessonplans-ID: ${id}
          </div>
          <br>
      </div>
  </div>
      `
            $content.prepend(card);

        },
        newsreleases: function (element, cat) {
            console.log(element);
            console.log('here');
            var abstract = element.abstract;
            var id = element.id;
            var parkCode = element.parkCode;
            var imageURL = element.image.url;
            var releaseDate = element.releaseDate;
            var title = element.title;
            var url = element.url;
            card = `
      <div class="card">
      <div class="card-header">
          <h5 class="mb-0">
              News Relases - ${title}
          </h5>
      </div>
      <div class="card-body">
          <div class="places-abstract">
              Places Abstract: ${abstract}
          </div>
          <br>
          <div class="places-id">
              Places Listing Image Title: ${id}
          </div>
          <br>
          <div class="places-parkCode">
              Places Listing Image Caption: ${parkCode}
          </div>
          <br>
          <div class="places-releaseDate">
              Places Related Parks: ${releaseDate}
          </div>
          <br>
          <div class="places-title">
              Places Title: ${title}
          </div>
          <br>
          <div class="places-imageURL">
              Places imageURL: ${imageURL}
          </div>
          <br>
          <div class="places-url">
              Places URL: ${url}
          </div>
          <br>
      </div>
  </div>
      `
            $content.prepend(card);
        },
        people: function (element, cat) {
            //passing in the element(object returned by the API call) and the cat(category)
            // create a new variable for each piece of data
            var latLong = element.latLong;
            var listingImageCredit = element.listingImage.credit;
            var listingImageAltText = element.listingImage.altText;
            var listingImageTitle = element.listingImage.title;
            var listingImageCaption = element.listingImage.caption;
            var listingImageUrl = element.listingImage.url;
            var relatedParks = element.relatedParks;
            var title = element.title;
            var url = element.url;
            var card = `
      <div class="card">
      <div class="card-header">
          <h5 class="mb-0">
              People - ${title}
          </h5>
      </div>
      <div class="card-body">
          <div class="people-listingImageCredit">People Listing Image Credit: ${listingImageCredit}</div>
          <br>
          <div class="people-listingImageAltText">People Listing Image Alt Text: ${listingImageAltText}</div>
          <br>
          <div class="people-listingImageTitle">People Listing Image Title: ${listingImageTitle}</div>
          <br>
          <div class="people-listingImageCaption">People Listing Image Caption: ${listingImageCaption}</div>
          <br>
          <div class="people-listingImageUrl">People Listing Image URL: ${listingImageUrl}</div>
          <br>
          <div class="people-listingImageUrl">People Related Parks: ${relatedParks}</div>
          <br>
          <div class="people-URL">People URL: ${url}</div>
          <br>
      </div>
  </div>
      `
            $content.prepend(card);
        },
        places: function (element, cat) {
            var listingDescription = element.listingDescription;
            var listingImageCredit = element.listingImage.credit;
            var listingImageAltText = element.listingImage.altText;
            var listingImageTitle = element.listingImage.title;
            var listingImageCaption = element.listingImage.caption;
            var listingImageUrl = element.listingImage.url;
            var relatedParks = element.relatedParks;
            var title = element.title;
            var url = element.url;
            card = `
      <div class="card">
      <div class="card-header">
          <h5 class="mb-0">
              Places - ${title}
          </h5>
      </div>
      <div class="card-body">
          <div class="places-listingDescription">
              <p>Places Listing Description: ${listingDescription}</p>
          </div>
          <br>
          <div class="places-listingImageCredit">
              <p>Places Listing Image Credit: ${listingImageCredit}</p>
          </div>
          <br>
          <div class="places-listingImageAltText">
              <p>Places Listing Description: ${listingImageAltText}</p>
          </div>
          <br>
          <div class="places-listingImageTitle">
              <p>Places Listing Image Title: ${listingImageTitle}</p>
          </div>
          <br>
          <div class="places-listingImageCaption">
              <p>Places Listing Image Caption: ${listingImageCaption}</p>
          </div>
          <br>
          <div class="places-listingImageURL">
              <p>Places Listing Image URL: ${listingImageUrl}</p>
          </div>
          <br>
          <div class="places-relatedParks">
              <p>Places Related Parks: ${relatedParks}</p>
          </div>
          <br>
          <div class="places-title">
              <p>Places Title: ${title}</p>
          </div>
          <br>
          <div class="places-url">
              <p>Places URL: ${url}</p>
          </div>
          <br>
      </div>
  </div>
      `
            $content.prepend(card);
        },
        visitorcenters: function (element, cat) {
            var contactsPhoneNumbers = element.contacts.phoneNumbers;
            var contactsEmailAddresses = element.contacts.emailAddresses;
            var latLong = element.latLong;
            var description = element.description;
            var parkCode = element.parkCode;
            var id = element.id;
            var directionsInfo = element.directionsInfo;
            var directionsUrl = element.directionsUrl;
            var url = element.url;
            var name = element.name;
            var header = buildCardHeader(name);
            buildCard(header, description, url);
        }
    };

    //Build a card functions allow for easier styling changes across all 50 parks pages.
    function buildCard(header, inner, link) {
        var $card = $('<div>');
        $card.addClass('card');
        var cardHeader = buildCardHeader(header);
        var cardInner = buildCardInner(inner);
        var cardLink = buildCardLink(link);

        $card.prepend(cardHeader);
        $card.append(cardInner);
        $card.append(cardLink);

        $content.prepend($card)
    }
    function buildCardHeader(header) {
        var headerHtml = `
      <div class="card-header">
      <h5 class="mb-0">
          ${header}
      </h5>
        </div>
      `
        return headerHtml;
    };
    function buildCardInner(inner) {
        var innerHtml = `
      <div class="card-body">
      <div>${inner}</div>
      </div>
      `
        return innerHtml;
    };
    function buildCardLink(link) {
        if (link) {
            var linkHtml = `
      <div class="card-body">
      <div><a href='${link}'>Click here for more info.</a></div>
      </div>
      `
            return linkHtml;
        }
    };    
    
    // Use localStorage to see which park we chose on the home-page
    var park = localStorage.getItem('park-name');
    $('#park-header').text(park)
    $('#park-title').text(park)

    parkURL = parksNameURL[park];           //equal to the html associated with each park
                                            //substring to extract characters from the html names. - 5 is to subtract the .html characters so you can add .jpg characters to the end
    var backgroundImageURL = 'assets/images/parks/' + parkURL.substring(0, parkURL.length - 5) + '.jpg';
    //sets the attribute of background and uses the image for the background
    $('#park-body').attr('background', backgroundImageURL)

    // This function returns data about the category passed in
    function getData(category, flag) {
        globalCounter++
        $content.empty();
        var queryURL = `https://api.nps.gov/api/v1/${category}?`;

        // TODO: decide how to handle the limit 
        // REMEMBER: the API returns 1 more than the limit e.g. 1 will return [0,1]
        var queryParams = {
            "api_key": NPSkey,
            "q": park,
            "limit": 0
        };
        queryURL += $.param(queryParams);
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //Make sure there is data to display
            console.log(response);
            if (response.data.length > 0) {
                // The .ajax call will potentially return multiple items for each call
                // Run each one through the appropriate Method  
                response.data.forEach(item => {
                    globalCounter++;
                    NPSContentBuilderMethods[category](item, category);

                    if(flag){
                        console.log('flag');
                        $content.empty();
                    }
                });
            }
            //If not, build a card with a message
            else buildCard(category.toUpperCase(), 'No information available at this time.', '');
        });
    }
    getData('parks', true);
    //===============================================================
    //WEATHER
    //===============================================================

    var currentWeather = '';
    var openWeatherKey = '22de199405e9bc855be8a60cd5dbae04';
    // API categories
    var openWeatherCategories = [
        'weather',
        'forecast'
    ]

    // Each API category returns different data structures, so create a unique method for each category
    var openWeatherContentBuilderMethods = {
        // each following method name matches the API call category exactly
        weather: function (element) {
            var temperatureK = (element.main.temp);
            var temperature = Math.floor(temperatureK * 9 / 5 - 459.67);
            buildCard('Current Temperature', temperature)
            var card = `
      <div class="card">
            <h5 class="mb-0">
            Current temperature
            </h5>
        <div class="card-body">
            <div class='current-temperature'>Current temperature : ${temperature}</div>
            <br>
          </div>
        </div>
      </div>
          `
            // $content.append(card);
        },
        // TODO: Forecast is a copy of weather, change forecast
        forecast: function (element) {
            var forecast = '';
            element.list.forEach(element => {
                var convertedDate = moment.unix(element.dt);
                var time = moment(convertedDate).format("MM/DD/YY hh:mm a");
                var tempK = element.main.temp;
                var temp = Math.floor(tempK * 9 / 5 - 459.67);
                forecast += time + '  -  Temperature: ' + temp + ' Fahrenheit<br>';
            });
            buildCard('5-Day Forecast:', forecast)
            var card = `
      <div class="card">
      <h5 class="mb-0">
      5-day Forecast
            </h5>
        <div class="card-body">
        <div class='current-weather'>Forecast: ${forecast}</div>
        <br>
        </div>
        </div>
        `
            // $content.append(card);
        }
    }

//Displays API data for the user-chosen category
    function getWeatherData(category) {
        $content.empty();
        var queryURL = `https://api.openweathermap.org/data/2.5/${category}?`;

        // TODO: decide how to handle the limit 
        // REMEMBER: the API returns 1 more than the limit e.g. 1 will return [0,1]
        var queryParams = {
            "appid": openWeatherKey,
            "lat": lat,
            "lon": lon
        };
        queryURL += $.param(queryParams);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            globalCounter++;
            openWeatherContentBuilderMethods[category](response, category);
        });
    }

    //===============================================================
    //FIREBASE
    //===============================================================
    var config = {
        apiKey: "AIzaSyAyokywaeTWJGdIlVUL08yV6do6usm9MwE",
        authDomain: "group-project-1-5af97.firebaseapp.com",
        databaseURL: "https://group-project-1-5af97.firebaseio.com",
        projectId: "group-project-1-5af97",
        storageBucket: "group-project-1-5af97.appspot.com",
        messagingSenderId: "97025325136"
    };
    firebase.initializeApp(config);

});
