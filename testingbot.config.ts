export function getConnectWsEndpoint(userCapabilities: any) {
    const defaultCapabilities = {
        'tb:options': {
            key: process.env.TB_KEY,
            secret: process.env.TB_SECRET
        }
    }
    const capabilities = { ...defaultCapabilities, ...userCapabilities }
    const connectUrl = `wss://cloud.testingbot.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    return connectUrl
}
