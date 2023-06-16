exports.getCdpEndpoint = (userCapabilities) => {
    const defaultCapabilities = {
        'tb:options': {
            key: process.env.TB_KEY,
            secret: process.env.TB_SECRET
        }
    }
    const capabilities = Object.assign(userCapabilities, defaultCapabilities)
    const cdpUrl = `wss://cloud.testingbot.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    return cdpUrl
}
