import {EventsListenerService} from "./EventsListenerService";

(function main() {
    const eventListenerService = new EventsListenerService();
    eventListenerService.registerEventListeners();
})();
