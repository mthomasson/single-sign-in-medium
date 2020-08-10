
export class IframeUtils {
    private static iframeId: string = 'io3-single-sign-in-iframe';
    /**
     * method that spawns an iframe on the document's body
     * @param rootUrl
     */
    public static createIframe(rootUrl): HTMLIFrameElement {
        const iframe = document.createElement('iframe')
        iframe.src = `${rootUrl}/index.html`
        iframe.id = IframeUtils.iframeId;
        // hide the iframe
        iframe.style.visibility = 'hidden';
        iframe.style.position = 'fixed';
        iframe.style.top = '-10000px';
        iframe.style.left = '-10000px';
        iframe.width = '1px';
        iframe.height = '1px';
        document.body.appendChild(iframe)
        return iframe
    }

    /**
     * Method that returns
     */
    public static getIframe(): HTMLIFrameElement {
        return document.getElementById(IframeUtils.iframeId) as HTMLIFrameElement;
    }

    public static sendMessage(data: any, origin: string) {
        this.getIframe().contentWindow.postMessage(data, origin)
    }
}
