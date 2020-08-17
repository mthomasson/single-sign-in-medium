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
        LocalStorageUtils.checkLocalStorageExistence();
        if (localStorage.getItem('authToken') && localStorage.getItem('authToken').length) {
            window.parent.postMessage({
                name: IframeEventsEnum.AUTH_TOKEN_RESPONSE,
                content: {
                    authToken: localStorage.getItem('authToken')
                }
            }, '*');
        } else {
            window.parent.postMessage({
                name: IframeEventsEnum.AUTH_TOKEN_MISSING
            }, '*');
        }
    }

    private static handleStoreAuthToken(data: MessageEventDataModel) {
        LocalStorageUtils.checkLocalStorageExistence();
        if (data.content && data.content.authToken) {
            localStorage.setItem('authToken', data.content.authToken)
            window.parent.postMessage({
                name: IframeEventsEnum.AUTH_TOKEN_STORED
            }, '*');
        } else {
            window.parent.postMessage({
                name: IframeEventsEnum.AUTH_TOKEN_STORE_ERROR
            }, '*');
        }
    }

    private static handleDeleteAuthToken(data: MessageEventDataModel) {
        LocalStorageUtils.checkLocalStorageExistence();
        if (data.content && data.content.authToken && data.content.authToken === localStorage.getItem('authToken')) {
            localStorage.removeItem('authToken')
            window.parent.postMessage({
                name: IframeEventsEnum.AUTH_TOKEN_DELETED
            }, '*');
        } else {
            window.parent.postMessage({
                name: IframeEventsEnum.AUTH_TOKEN_DELETE_ERROR
            }, '*');
        }
    }
}
