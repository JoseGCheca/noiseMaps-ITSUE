angular.module('MyApp')
    .factory('Sensor', ['$resource', function($resource) {
        return $resource('/api/sensor/:id');
    }]);
