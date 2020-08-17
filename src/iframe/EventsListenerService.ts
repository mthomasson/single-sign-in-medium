import {IframeEventsEnum} from "../shared/enums/iframe-events.enum";
import {MessageEventModel} from "../shared/models/MessageEvent.model";
import {MessageEventDataModel} from "../shared/models/MessageEventData.model";
import {LocalStorageUtils} from "../shared/LocalStorageUtils";
import {SnippetEventsEnum} from "../shared/enums/snippet-events.enum";


export class EventsListenerService {
    constructor() {
    }

    public registerEventListeners() {
        if (window) {
            window.addEventListener('message', (messageEvent: MessageEventModel) => {
                if (messageEvent.data && messageEvent.data.name && (Object.values(SnippetEventsEnum) as string[]).includes(messageEvent.data.name)) {
                    EventsListenerService.handleEvent(messageEvent);
                }
            })
            window.parent.postMessage({name: 'IFRAME_LISTENERS_READY'}, '*');
        }
    }

    private static handleEvent(messageEvent: MessageEventModel) {
        switch (messageEvent.data.name) {
            case SnippetEventsEnum.GET_AUTH_TOKEN:
                EventsListenerService.handleAuthTokenRequest();
                break;
            case SnippetEventsEnum.STORE_AUTH_TOKEN:
                EventsListenerService.handleStoreAuthToken(messageEvent.data)
                break;
            case SnippetEventsEnum.DELETE_AUTH_TOKEN:
                EventsListenerService.handleDeleteAuthToken(messageEvent.data)
                break;
            default:
                break;
        }

    }

    private static handleAuthTokenRequest() {

    }

    private static handleStoreAuthToken(data: MessageEventDataModel) {

    }

    private static handleDeleteAuthToken(data: MessageEventDataModel) {

    }
}
