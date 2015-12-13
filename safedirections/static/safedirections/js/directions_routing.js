var routes = [];
var directions_renderers = [];
var Rainbow = require('rainbowvis.js');
var gradient = new Rainbow();
gradient.setSpectrum('#00ff00', '#ff0000');
gradient.setNumberRange(0, 20);

function calculateRoute(from, to) {
    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: from,
        destination: to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        //waypoints: way_pts,
        provideRouteAlternatives: true
    };
    directionsService.route(
        directionsRequest,
        function(response, status)
        {
            response.routes.forEach(function(elem, i) {
                $("#waypoints").append("<option value=" + i + ">" + elem.summary + "</option>");
            });

            for (var i = 0, len = response.routes.length; i < len; i++)
            {
                routes = response.routes;
                if (status == google.maps.DirectionsStatus.OK)
                {
                    directions_renderers.push(new google.maps.DirectionsRenderer({
                        map: map,  // global object set at 'render_map.js' file
                        directions: response,
                        routeIndex: i,
                        grade: RouteWeight(routes[i].overview_path, danger_points)
                    }));
                }
                else
                    $("#error").append("Unable to retrieve your route<br />");
            }
        });
}

