angular
    .module('MyApp')
    .controller('GMapsCtrl', ['$scope', 'Sensor', '$mdToast', '$animate', '$state', '$mdDialog', '$timeout', function($scope, Sensor, $mdToast, $animate, $state, $mdDialog, $timeout) {
        $scope.freqRefresh = 3;
        $scope.map = {
            center: {
                latitude: 38.991703,
                longitude: -3.919787
            },
            zoom: 17
        };

        $scope.colors = [{
            noiseLvl: 'Very low noise level',
            color: '#01DF3A'
        },
        {
            noiseLvl: 'Low noise level',
            color: '#BFFF00'
        },
        {
            noiseLvl: 'Moderate noise level',
            color: '#FFBF00'
        },
        {
            noiseLvl: 'High noise level',
            color: '#DF7401'
        },
        {
            noiseLvl: 'Very high noise level',
            color: '#DF0101'
        }];

        var timer = $timeout(function refresh() {

            Sensor.query(function(sensors) {

                for (var i = 0; i < sensors.length; i++) {
                    if (sensors[i].noiseLvl < 200)
                        sensors[i].color = '#01DF3A'
                    else if (sensors[i].noiseLvl < 400)
                        sensors[i].color = '#BFFF00'
                    else if (sensors[i].noiseLvl < 600)
                        sensors[i].color = '#FFBF00'
                    else if (sensors[i].noiseLvl < 800)
                        sensors[i].color = '#DF7401'
                    else if(sensors[i].noiseLvl <= 1000)
                        sensors[i].color = '#DF0101'
                };


                // success handler +
                console.log(sensors[0].coords.split(',')[1])

                $scope.options = {
                    scrollwheel: false
                };
                $scope.circles = [{
                    id: sensors[0].identificator,
                    center: {
                        latitude: sensors[0].coords.split(',')[0],
                        longitude: sensors[0].coords.split(',')[1]
                    },
                    radius: 50,
                    stroke: {
                        color: '#2E2E2E',
                        weight: 2,
                        opacity: 1
                    },
                    fill: {
                        color: sensors[0].color,
                        opacity: 0.5
                    },
                    geodesic: true, // optional: defaults to false
                    draggable: false, // optional: defaults to false
                    clickable: true, // optional: defaults to true
                    editable: false, // optional: defaults to false
                    visible: true, // optional: defaults to true
                    control: {}
                },{
                    id: sensors[1].identificator,
                    center: {
                        latitude: sensors[1].coords.split(',')[0],
                        longitude: sensors[1].coords.split(',')[1]
                    },
                    radius: 50,
                    stroke: {
                        color: '#2E2E2E',
                        weight: 2,
                        opacity: 1
                    },
                    fill: {
                        color: sensors[1].color,
                        opacity: 0.5
                    },
                    geodesic: true, // optional: defaults to false
                    draggable: false, // optional: defaults to false
                    clickable: true, // optional: defaults to true
                    editable: false, // optional: defaults to false
                    visible: true, // optional: defaults to true
                    control: {}
                },{
                    id: sensors[2].identificator,
                    center: {
                        latitude: sensors[2].coords.split(',')[0],
                        longitude: sensors[2].coords.split(',')[1]
                    },
                    radius: 50,
                    stroke: {
                        color: '#2E2E2E',
                        weight: 2,
                        opacity: 1
                    },
                    fill: {
                        color: sensors[2].color,
                        opacity: 0.5
                    },
                    geodesic: true, // optional: defaults to false
                    draggable: false, // optional: defaults to false
                    clickable: true, // optional: defaults to true
                    editable: false, // optional: defaults to false
                    visible: true, // optional: defaults to true
                    control: {}
                },{
                    id: sensors[3].identificator,
                    center: {
                        latitude: sensors[3].coords.split(',')[0],
                        longitude: sensors[3].coords.split(',')[1]
                    },
                    radius: 50,
                    stroke: {
                        color: '#2E2E2E',
                        weight: 2,
                        opacity: 1
                    },
                    fill: {
                        color: sensors[3].color,
                        opacity: 0.5
                    },
                    geodesic: true, // optional: defaults to false
                    draggable: false, // optional: defaults to false
                    clickable: true, // optional: defaults to true
                    editable: false, // optional: defaults to false
                    visible: true, // optional: defaults to true
                    control: {}
                },{
                    id: sensors[4].identificator,
                    center: {
                        latitude: sensors[4].coords.split(',')[0],
                        longitude: sensors[4].coords.split(',')[1]
                    },
                    radius: 50,
                    stroke: {
                        color: '#2E2E2E',
                        weight: 2,
                        opacity: 1
                    },
                    fill: {
                        color: sensors[4].color,
                        opacity: 0.5
                    },
                    geodesic: true, // optional: defaults to false
                    draggable: false, // optional: defaults to false
                    clickable: true, // optional: defaults to true
                    editable: false, // optional: defaults to false
                    visible: true, // optional: defaults to true
                    control: {}
                }];



                console.log(sensors)
            }, function(error) {
                console.log(error);
                // error handler
            });
            timer = $timeout(refresh, $scope.freqRefresh*1000);

        }, 1);

        $scope.$on('$destroy', function() {
            $timeout.cancel(timer);
        });
    }]);
