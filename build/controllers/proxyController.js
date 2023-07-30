"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require('https');
function responseHandler(res) {
    return (resp) => {
        let data = '';
        if (typeof resp !== 'object' || !resp) {
            return;
        }
        // При получении каждого фрагмента данных
        if ('on' in resp && typeof resp.on === 'function') {
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // Когда ответ полностью получен, выводим результат.
            resp.on('end', () => {
                res.end(data);
            });
        }
    };
}
class FlightRadarApiController {
    async getFlights(req, res) {
        const { bounds } = req.params;
        await https.get(`https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=${bounds}&faa=1&satellite=1&mlat=1&flarm=1&adsb=1&gnd=0&air=1&vehicles=1&estimated=1&maxage=14400`, responseHandler(res));
    }
    async getAllAirports(req, res) {
        await https.get('https://www.flightradar24.com/_json/airports.php', responseHandler(res));
    }
    async getAirport(req, res) {
        const { id } = req.params;
        await https.get(`https://api.flightradar24.com/common/v1/airport.json?code=${id}&plugin[]=details&plugin[]=runways&plugin[]=satelliteImage&plugin[]=scheduledRoutesStatistics&plugin[]=weather&plugin-setting[satelliteImage][scale]=1`, responseHandler(res));
    }
    async getFlightStatus(req, res) {
        const { id } = req.params;
        console.log(id);
        await https.get(`https://data-live.flightradar24.com/clickhandler/?version=1.5&flight=${id}`, responseHandler(res));
    }
    async getShedule(req, res) {
        const { id } = req.params;
        await https.get(`https://api.flightradar24.com/common/v1/airport.json?code=${id}`, responseHandler(res));
    }
}
exports.default = new FlightRadarApiController();
//# sourceMappingURL=proxyController.js.map