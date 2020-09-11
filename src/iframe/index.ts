import {EventsListenerService} from "./EventsListenerService";
import {canActivateIframe} from "./canActivate";

(function main() {
    if (canActivateIframe()) {
        const eventListenerService = new EventsListenerService();
        eventListenerService.registerEventListeners();
    }
})();
