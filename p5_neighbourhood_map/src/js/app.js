var errorLoadingMapsAPI, initMap;

(function() {
  'use strict';

  var map, infoWindow;

  /* ------ MODEL ------ */

  /**
   * App data. A list of the places to show in the app.
   * @type {Array}
   */
  var initialPlaces = [{
    yelpId: "koy-shunka-barcelona",
    name: "Koy Shunka",
    location: {
      lat: 41.3857825,
      lng: 2.1753695
    },
    address: "Carrer d'en Copons, 7",
    neighborhood: "Barri Gòtic",
    telephone: "+34 934 127 939",
    website: "http://www.koyshunka.com/"
  }, {
    yelpId: "kuo-barcelona",
    name: "Kuo",
    location: {
      lat: 41.3965255,
      lng: 2.1442039
    },
    address: "Carrer Madrazo, 135",
    neighborhood: "Sant Gervasi",
    telephone: "+34 932 007 783",
    website: "http://www.gruponomo.com/restaurantes/kuo/"
  }, {
    yelpId: "yashima-barcelona",
    name: "Yashima",
    location: {
      lat: 41.3909975,
      lng: 2.1433599
    },
    address: "Av. de Josep Tarradellas, 145",
    neighborhood: "Les Corts",
    telephone: "+34 934 190 697",
    website: null
  }, {
    yelpId: "tempura-ya-barcelona",
    name: "Tempura Ya",
    location: {
      lat: 41.3910347,
      lng: 2.1534075
    },
    address: "Carrer de Muntaner, 153",
    neighborhood: "Esquerra de l'Eixample",
    telephone: "+34 934 193 182",
    website: null
  }, {
    yelpId: "shibui-barcelona",
    name: "Shibui",
    location: {
      lat: 41.3912991,
      lng: 2.1466128
    },
    address: "Carrer del Comte d'Urgell, 272",
    neighborhood: "Esquerra de l'Eixample",
    telephone: "+34 933 219 004",
    website: "http://www.shibuirestaurantes.com/"
  }, {
    yelpId: "shunka-barcelona",
    name: "Shunka",
    location: {
      lat: 41.3851057,
      lng: 2.1751387
    },
    address: "Carrer Sagristans, 5",
    neighborhood: "Barri Gòtic",
    telephone: "+34 934 124 991",
    website: null
  }, {
    yelpId: "ikibana-paralelo-barcelona-5",
    name: "Ikibana Paralelo",
    location: {
      lat: 41.375197,
      lng: 2.158238
    },
    address: "Av. del Paral·lel, 148",
    neighborhood: "Sant Antoni",
    telephone: "+34 934 244 648",
    website: "http://www.ikibana.com/"
  }, {
    yelpId: "kibuka-barcelona",
    name: "Kibuka",
    location: {
      lat: 41.39971,
      lng: 2.157236
    },
    address: "Carrer de Goya, 9",
    neighborhood: "Vila de Gràcia",
    telephone: "+34 932 378 994",
    website: "http://www.kibuka.com/"
  }, {
    yelpId: "nomo-barcelona",
    name: "Nomo",
    location: {
      lat: 41.3981505,
      lng: 2.1571036
    },
    address: "Carrer Gran de Gràcia, 13",
    neighborhood: "Vila de Gràcia",
    telephone: "+34 934 159 622",
    website: "http://restaurantenomo.com"
  }, {
    yelpId: "yamadori-barcelona",
    name: "Yamadori",
    location: {
      lat: 41.3889126,
      lng: 2.1588497
    },
    address: "Carrer d'Aribau, 68",
    neighborhood: "Esquerra de l'Eixample",
    telephone: "+34 934 539 264",
    website: "http://www.yamashitagroup.com/yamadori/entrantes.htm"
  }];

  /**
   * Class used to create place objects.
   * @param  {object} data       An object containing place data: id, name and location.
   * @param  {boolean} [visible] Indicates whether the place is visible or not.
   */
  var Place = function(data, visible) {
    visible = typeof visible !== 'undefined' ? visible : true;
    this.yelpId = data.yelpId;
    this.name = data.name;
    this.location = data.location;
    this.address = data.address;
    this.neighborhood = data.neighborhood;
    this.telephone = data.telephone;
    this.website = data.website;
    this.visible = visible;
    this.yelpStatus = ko.observable();
    this.yelpData = ko.observable();
  };


  /* ------ VIEW MODEL ------ */

  /**
   * Knockout ViewModel logic for the app
   */
  var ViewModel = function() {
    var self = this;

    /**
     * Observable array with the list of all the places in the app.
     * Contains (also observable) Place objects.
     */
    this.places = ko.observableArray(initialPlaces.map(function(placeData) {
      return ko.observable(new Place(placeData));
    }));

    /** Observable that stores the current selected item (if any). */
    this.currentPlace = ko.observable();

    /** Stores the search string entered by the user to filter places */
    this.currentFilter = ko.observable();

    /**
     * Funtion used to retrieve an array with the places that are visible. the
     * ones that matches the search filter.
     * @return {array}           Array of place objects
     */
    this.visiblePlaces = ko.computed(function() {
      return self.places().filter(function(place) {
        return place().visible;
      });
    });

    /**
     * Function used to retreive the number ob reviews in Yelp for currentPlace.
     * If Yelp data isn't available for currentPlace, returns null.
     * @return {number}           Returns the number of reviews in Yelp
     */
    this.getYelpReviewCount = ko.computed(function(param) {
      if (self.currentPlace() && self.currentPlace().yelpData()) {
        return self.currentPlace().yelpData().review_count;
      } else {
        return null;
      }
    });

    /**
     * Function used to retreive the url for the rating image in Yelp for currentPlace.
     * If Yelp data isn't available for currentPlace, returns null.
     * @return {string}           Returns the rating image url with the stars in Yelp
     */
    this.getYelpRatingImg = ko.computed(function(param) {
      if (self.currentPlace() && self.currentPlace().yelpData()) {
        return self.currentPlace().yelpData().rating_img_url;
      } else {
        return null;
      }
    });

    /**
     * Function used to retreive the srcset attribute for the rating image in Yelp
     * for currentPlace.
     * If Yelp data isn't available for currentPlace, returns null.
     * @return {string}  Returns the srcset value for the image with the stars in Yelp
     */
    this.getYelpRatingImgSrcSet = ko.computed(function(param) {
      if (self.currentPlace() && self.currentPlace().yelpData()) {
        return self.currentPlace().yelpData().rating_img_url_large + " 2x, " +
          self.currentPlace().yelpData().rating_img_url + " 1x";
      } else {
        return null;
      }
    });

    /**
     * Function used to retreive the URL for visiting the business in Yelp.
     * If Yelp data isn't available for currentPlace, returns null.
     * @return {string}  Returns the URL for the place in Yelp
     */
    this.getYelpURL = ko.computed(function(param) {
      if (self.currentPlace() && self.currentPlace().yelpData()) {
        return self.currentPlace().yelpData().url;
      } else {
        return null;
      }
    });

    /** Indicates whether the search panel has to be shown or not {Observable boolean} */
    this.visiblePanel = ko.observable(false);

    /** Indicates wheter the search panel is pinned or not (docked on the left side) */
    this.pinnedPanel = ko.observable(false);

    /** Sets visiblePanel to {true} to indicate the view it has to show the panel. */
    this.showPanel = function() {
      self.visiblePanel(true);
    };

    /** Pin and unpins the search panel (dock/undock)*/
    this.togglePinPanel = function() {
      self.pinnedPanel(!self.pinnedPanel());
      recenterMap();
    };

    /** Clear the search filter */
    this.clearFilter = function() {
      self.currentFilter(null);
    };

    /**
     * Method called when the user clicks on the map. Used to hide the search
     * panel if isn't pinned.
     */
    this.mapClick = function() {
      if (!self.pinnedPanel()) {
        self.visiblePanel(false);
      }
      return true; //To tell knockout that it has to allow the default click action
    };

    /**
     * Sets the current selected place, highlight its marker in the map and hides
     * the panel (will still be visible if it has been pinned)
     * @param  {Place object} clickedPlace The place that has to be set as the current seleted
     */
    this.setCurrentPlace = function(clickedPlace) {
      // Reset previous marker: No animation and use default icon
      if (self.currentPlace()) {
        self.currentPlace().marker.setAnimation(null);
        self.currentPlace().marker.setIcon(null);
      }

      // Update currentPlace
      self.currentPlace(clickedPlace);

      if (clickedPlace) {

        // If not already done, call Yelp API to retrieve data info of the place
        if (!clickedPlace.yelpData()) {
          retriveYelpData(clickedPlace);
        }

        // Set the color and the animation for the current marker
        var image = {
          url: 'img/black_marker.png',
          scaledSize: new google.maps.Size(22, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(11, 40)
        };
        clickedPlace.marker.setIcon(image);
        clickedPlace.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          clickedPlace.marker.setAnimation(null);
        }, 2100);

        populateInfoWindow(clickedPlace, infoWindow);

        // Center the map to the current place
        map.panTo(clickedPlace.location);

        // Hides the places panel (if not pinned)
        self.visiblePanel(false);

      } else { // No current place selected (clickedPlace is null)
        showMarkers();
      }

    };

    /**
     * An observer function subscribed to changes on the currentFilter. It updates
     * the visible property for each place in the places observableArray depending
     * on wheter they matches the filter or not. Once updated, refreshes the
     * markers in the map.
     */
    this.currentFilter.subscribe(function() {
      var filterStr = self.currentFilter() || "";
      self.places().forEach(function(place) {
        place().visible = place().name.toLowerCase().includes(filterStr.toLowerCase());
        place(place()); //Update observable place
      });
      infoWindow.close();
      infoWindow.marker = null;
      self.setCurrentPlace(null);
      showMarkers();
    });
  };

  // Bind a new instance of the view model to the page
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);


  /* ------ GOOGLE MAPS SUPPORT CODE ------ */


  /** Shows an alert if Google Maps doesn't respond */
  errorLoadingMapsAPI = function () {
      alert("Couldn't load Google Maps. Check your connection and try reloading the page.");
  };

  /**
   * Google Maps initialization function.
   * It creates the map with all its markers based on the list of places in the
   * app. Once markers are created, they are shown on the map.
   */
  initMap = function() {
    // Creates a new map
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 41.393996,
        lng: 2.176231,
      },
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false
    });

    infoWindow = new google.maps.InfoWindow();
    var marker;

    // Create all the markers
    viewModel.places().forEach(function(place) {
      // Create a marker per place, and put them into the markers array.
      marker = new google.maps.Marker({
        map: map,
        position: place().location,
        title: place().name,
        animation: google.maps.Animation.DROP
      });

      // Attach the marker to the place in the places array.
      place().marker = marker;

      // Create an onclick event to set the current place and to open an
      // infowindow at each marker.
      marker.addListener('click', function() {
        viewModel.setCurrentPlace(place());
      });
    });

    showMarkers();

  };


  /**
   * This function loops through the places array and display the markers for
   * those that are set to visible.
   */
  function showMarkers() {
    var bounds = new google.maps.LatLngBounds();
    var marker;

    viewModel.places().forEach(function(place) {
      // Get the marker of the place
      marker = place().marker;

      // Show or hide the marker depending on place visibility
      if (place().visible) {
        if (!marker.getVisible()) {
          marker.setAnimation(google.maps.Animation.DROP);
          marker.setVisible(true);
        }
        bounds.extend(marker.position);
      } else {
        marker.setVisible(false);
      }

    });
    //Only fit bounds if there are visible places/markers. Else leave the map as it was.
    if (viewModel.visiblePlaces().length > 0) {
      map.fitBounds(bounds);
    }
  }


  /**
   * This function populates the infowindow when the marker is clicked. We'll only allow
   * one infowindow which will open at the marker that is clicked, and populate based
   * on that markers position.
   * @param  {Place}     place     The place associated to the infoWindow
   * @param  {InfoWindow} infowindow The infoWindow that will hold the info
   */
  function populateInfoWindow(place, infoWindow) {
    // Get the infoWindow html from the template
    var content = document.getElementById('iw-template').innerHTML;
    // Check to make sure the infoWindow is not already opened on this marker.
    if (infoWindow.marker != place.marker) {
      infoWindow.marker = place.marker;
      infoWindow.setContent(content);
      infoWindow.open(map, place.marker);
      // Make sure the marker property is cleared if the infoWindow is closed.
      infoWindow.addListener('closeclick', function() {
        infoWindow.marker = null;
      });
      // Apply ko bindings to the dynamicaly generated content
      ko.applyBindings(viewModel, document.getElementById('iw-content'));
    }
  }


  /**
   * Helper function to keep the map centered even when its container size changes.
   */
  function recenterMap() {
    var centerPosition = map.getCenter(); //get the center position
    google.maps.event.trigger(map, 'resize');
    map.setCenter(centerPosition); // re-center the position
  }


  /* ------ YELP API SUPPORT CODE ------ */

  // The code below is based on Mark's Nguyen reply on Udacity forums:
  // https://discussions.udacity.com/t/im-having-trouble-getting-started-using-apis/13597

  /**
   * Generates a random number and returns it as a string for OAuthentication
   * @return {string}
   */
  function nonce_generate() {
    return (Math.floor(Math.random() * 1e12).toString());
  }

  /**
   * Calls Yelp API and gets the data about the place. Uses oauth-signature library.
   * @param  {Place} place  The place of which the info will be retrieved
   */
  function retriveYelpData(place) {

    place.yelpStatus("loading");

    var yelp_url = "https://api.yelp.com/v2/business/" + place.yelpId;

    var parameters = {
      oauth_consumer_key: "xx0hsyOwIU0y1Vq3pRoKzA",
      oauth_token: "llUXjhOIRNdQkYLcYvK851Cod3fxt-te",
      oauth_nonce: nonce_generate(),
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      callback: 'cb' // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
    };

    var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, "jafcYJDzO3Vs8KSZqgcKM2MJAlo", "GfCUDzASwfhKPW1UAXXCPZpm3e4");
    parameters.oauth_signature = encodedSignature;

    var settings = {
      url: yelp_url,
      data: parameters,
      cache: true, // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
      dataType: 'jsonp',
      success: function(results) {
        place.yelpData(results);
        place.yelpStatus("ready");
      },
      error: function() {
        place.yelpStatus("error");
      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);
  }

}());
