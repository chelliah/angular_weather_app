var myApp = angular.module('myApp', ['ngAnimate']);
var skycons = new Skycons({color: 'pink'});

myApp.controller('WeatherController', ['$scope', '$http', '$animate', function($scope, $http, $animate){
    $scope.search = {};
    $scope.storeLocation = {};
    $scope.forecast = {};
    $scope.daytime = true;

    $scope.getForecast = function(search){
        console.log(search);
        $http.get('/forecast/data', {params: search}).then(function(response){

            if(response.data){
                console.log('hi');
                $scope.forecast = response.data;
                skycons.set('icon', getIcon($scope.forecast.currently.icon));
                $scope.storeLocation = search;
                document.getElementById("forecast").className = 'well';
                console.log($scope.forecast);
                skycons.play();
            }else{
                alert('Sorry, we could not find the weather for ' + search.place)
            }
        });
        $scope.search = {};
    };

    $scope.checkTime = function(data){

    }
}]);


function getIcon(icon){
    switch(icon){
        case "clear-day":
            return Skycons.CLEAR_DAY;
            break;
        case "clear-night":
            return Skycons.CLEAR_NIGHT;
            break;
        case "partly-cloudy-day":
            return Skycons.PARTLY_CLOUDY_DAY;
            break;
        case "partly-cloudy-night":
            return Skycons.PARTLY_CLOUDY_NIGHT;
            break;
        case "cloudy":
            return Skycons.CLOUDY;
            break;
        case "rain":
            return Skycons.RAIN;
            break;
        case "sleet":
            return Skycons.SLEET;
            break;
        case "snow":
            return Skycons.SNOW;
            break;
        case "wind":
            return Skycons.WIND;
            break;
        case "fog":
            return Skycons.FOG;
            break;
    }
}