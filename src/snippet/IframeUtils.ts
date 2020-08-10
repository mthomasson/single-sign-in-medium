
export class IframeUtils {

    public static createIframe(rootUrl): HTMLIFrameElement {
        const iframe = document.createElement('iframe')
        iframe.src = `${rootUrl}/index.html`
        iframe.id = 'io3-single-sign-in-iframe';
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

    public static getIframe(): HTMLIFrameElement {
        return document.getElementById('io3-single-sign-in-iframe') as HTMLIFrameElement;
    }

    public static sendMessage(data: any, origin: string) {
        this.getIframe().contentWindow.postMessage(data, origin)
    }
}
