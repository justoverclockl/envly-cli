import figlet from 'figlet'
import gradient from 'gradient-string'

export const printBanner = () => {
    const banner = figlet.textSync('ENVLY CLI', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
    })

    if (process.stdout.isTTY && !process.env.NO_COLOR) {
        console.log(
            gradient(['#ff2bd6', '#8b5cf6'])(banner),
        )
    } else {
        console.log(banner)
    }

    console.log()
}
