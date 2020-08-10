import {IframeUtils} from "./IframeUtils";

const tracker = document.currentScript as HTMLScriptElement;


(function main() {
    const path = tracker.src.replace('/snippet.js', '');
    IframeUtils.createIframe(path);
})();
