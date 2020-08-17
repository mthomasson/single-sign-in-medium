import {IframeEventsEnum} from "../shared/enums/iframe-events.enum";
import {SnippetEventsEnum} from "../shared/enums/snippet-events.enum";
import {IframeUtils} from "./IframeUtils";
import {MessageEventModel} from "../shared/models/MessageEvent.model";

export class MethodsService {
    constructor() {
    }

    public registerWindowMethods(path: string) {
        if (window) {
            window.io3SingleSignIn = {
                getAuthToken: this.getAuthToken,
                storeAuthToken: this.storeAuthToken,
                deleteAuthToken: this.deleteAuthToken,
                origin: path,
            }
        } else {
            throw new Error('You need to be in a browser!')
        }
    }

    public getAuthToken(): Promise<string> {
        return new Promise(()=>{});
    }

    public storeAuthToken(authToken: string) {
        return new Promise(()=>{});
    }

    public deleteAuthToken(authToken: string) {
        return new Promise(()=>{});
    }
}
