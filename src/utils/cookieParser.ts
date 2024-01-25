// copied from GFG
export default function cookieParser(cookieString: string) {
    console.log('COOKE: ', cookieString);
    if (cookieString === '') return {};
    const pairs = cookieString.split(';');
    const splittedPairs = pairs.map((cookie) => cookie.split('='));
    const cookieObj = splittedPairs.reduce((obj, cookie) => {
        // @ts-ignore
        obj[decodeURIComponent(cookie[0].trim())] = decodeURIComponent(
            cookie[1].trim(),
        );
        return obj;
    }, {});
    return cookieObj as Record<string, string>;
}
