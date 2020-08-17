import {MessageEventDataModel} from "./MessageEventData.model";

export interface MessageEventModel extends MessageEvent {
    data: MessageEventDataModel
}
