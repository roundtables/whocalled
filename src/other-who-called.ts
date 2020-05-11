import { exec } from 'child_process'

export const otherWhoCalled = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const cmd = `ps -p ${process.ppid} -ww -o args`
  
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err)
                return
            }
            const stderrText = stderr.toString().trim()
            if (stderrText) {
                reject(stderrText)
                return
            }

            resolve(stdout.split(/\s/g).splice(1))
        })
    })
}

