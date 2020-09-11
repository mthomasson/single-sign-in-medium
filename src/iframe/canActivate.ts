export const domainWhiteList = ["localhost", "abc.com", "def.com"];
export const canActivateIframe = () => {
    if (document && document.referrer && document.referrer.length) {
        const url = new URL(document.referrer);
        const domain = url.hostname;
        return domainWhiteList.includes(domain);
    }
    // TEst case with static html file opened from the file system
    return true;
};
