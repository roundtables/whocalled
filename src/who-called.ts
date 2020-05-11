import { otherWhoCalled } from './other-who-called'
import { windowsWhoCalled } from './windows-who-called'

const platformSpecificWhoCalled = () => {
    const platform = process.platform
    if (platform === 'win32') {
        return windowsWhoCalled()
    }
    return otherWhoCalled()
}

export const whoCalled = async (): Promise<string[]> => {
    return platformSpecificWhoCalled()
}
