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
        const promise = MethodsService.registerOneTimeListener(MethodsService.handleGetAuthTokenResponse);
        IframeUtils.sendMessage({
            name: SnippetEventsEnum.GET_AUTH_TOKEN,
        }, window.io3SingleSignIn.origin)
        return promise
    }

    public storeAuthToken(authToken: string) {
        const promise = MethodsService.registerOneTimeListener(MethodsService.handleStoreAuthTokenResponse);
        IframeUtils.sendMessage({
            name: SnippetEventsEnum.STORE_AUTH_TOKEN,
            content: {authToken}
        }, window.io3SingleSignIn.origin)
        return promise;
    }

    public deleteAuthToken(authToken: string) {
        const promise = MethodsService.registerOneTimeListener(MethodsService.handleDeleteAuthTokenResponse);
        IframeUtils.sendMessage({
            name: SnippetEventsEnum.DELETE_AUTH_TOKEN,
            content: {authToken}
        }, window.io3SingleSignIn.origin)
        return promise;
    }
    private static registerOneTimeListener(handler: (e: MessageEventModel, resolve: (string?: any) => void, reject: (string?: string) => void) => void): Promise<string> {
        if (IframeUtils.getIframe()) {
            return new Promise<string>(
                (resolve, reject) => {
                    if (window) {
                        window.addEventListener(
                            'message',
                            function listen(e: MessageEventModel) {
                                if (e.origin !== location.origin) {
                                    handler(e, resolve, reject)
                                    window.removeEventListener('message', listen)
                                }
                            })
                    } else {
                        reject('You need to be in a browser!')
                    }
                });
        } else {
            return new Promise((resolve, reject) => {
                reject("The iframe was not properly initialized");
            })
        }
    }
    private static handleGetAuthTokenResponse(event: MessageEventModel, resolve: (data?: any) => void, reject: (string: string) => void): void {
        if (event.data.name === IframeEventsEnum.AUTH_TOKEN_RESPONSE && event.data.content.authToken && event.data.content.authToken.length) {
            resolve(event.data.content.authToken)
        } else if (event.data.name === IframeEventsEnum.AUTH_TOKEN_MISSING) {
            reject("No authToken present in local storage")
        }
    }
    private static handleStoreAuthTokenResponse(event: MessageEventModel, resolve: (data?: any) => void, reject: (string: string) => void) {
        if (event.data.name === IframeEventsEnum.AUTH_TOKEN_STORED) {
            resolve('Success! Your authToken was stored');
        } else if (event.data.name === IframeEventsEnum.AUTH_TOKEN_STORE_ERROR) {
            reject("An error occurred while storing the auth token")
        }
    }
    private static handleDeleteAuthTokenResponse(event: MessageEventModel, resolve: (data?: any) => void, reject: (string: string) => void) {
        if (event.data.name === IframeEventsEnum.AUTH_TOKEN_DELETED) {
            resolve('Success! Your authToken was deleted');
        } else if (event.data.name === IframeEventsEnum.AUTH_TOKEN_DELETE_ERROR) {
            reject("An error occurred while deleting the auth token")
        }
    }
}
