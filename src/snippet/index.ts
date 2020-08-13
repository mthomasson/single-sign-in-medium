import {IframeUtils} from "./IframeUtils";
import {MethodsService} from "./methodsService";

const tracker = document.currentScript as HTMLScriptElement;


(function main() {
    const path = tracker.src.replace('/snippet.js', '');
    IframeUtils.createIframe(path);
    const methodService= new MethodsService();
    methodService.registerWindowMethods(path)
})();
