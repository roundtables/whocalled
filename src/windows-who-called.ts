import { spawn } from 'child_process'
import { createInterface } from 'readline'

export const windowsWhoCalled = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const cmd = `WMIC path Win32_Process where ProcessId='${process.ppid}' get Name`
        const outputLines = []
  
        const childProcess = spawn('cmd', ['/c', cmd], { detached: false, windowsHide: true })
        const byLineStream = createInterface({ input: childProcess.stdout })
        let lineCount: number = 1
        byLineStream.on('line', line => {
            if (lineCount === 2) { // Skip first line
                const lineBits = line.split(/\s/g)
                resolve(lineBits)
                return
            }
            lineCount++
        })
        childProcess.on('close', returnCode => {
            if (returnCode !== 0) {
                return reject(new Error(`Command ${cmd} terminated with code: ${returnCode}`))
            }
        })
    })
}
