import { spawn } from 'child_process'

export const windowsWhoCalled = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const cmd = `WMIC path Win32_Process where ProcessId='${process.ppid}' get Name`
        const outputLines = []
  
        const childProcess = spawn('cmd', ['/c', cmd], { detached: false, windowsHide: true })
        childProcess.stdout.on('data', data => {
            outputLines.push(data.toString())
        })
        childProcess.on('close', returnCode => {
            if (returnCode !== 0) {
                return reject(new Error('Command \'' + cmd + '\' terminated with code: ' + returnCode))
            }
            resolve(outputLines.join(' ').split(/\s/g))
        })
    })
}
