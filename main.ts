radio.setTransmitPower(7)
// radio.setFrequencyBand(10)
radio.setGroup(128)
// radio.setTransmitSerialNumber(true)

let tma = 0
let cas = 0
let ready=false
// let timer = false
// let cas = 0


function kalibrace(): void {
    tma = 0
    for (let i = 0; i < 5; i++) {
        tma += input.lightLevel()
        basic.pause(400)
    }
    tma = tma / 5

    console.log("=======" + tma)

}



input.onButtonPressed(Button.A, function() {
    kalibrace()
    radio.sendNumber(15)
    
})
radio.onReceivedNumber(function (receivedNumber: number) {
    if (receivedNumber == 17) {
        basic.showNumber(1)
        ready = true
    }})



input.onButtonPressed(Button.B, function() {
    if(ready){
    for(let odpocet=3;odpocet>0;odpocet-=1){
        whaleysans.showNumber(odpocet)
    basic.pause(1000)}
        cas = 0
    basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
    // music.ringTone(Note.C)
    
        music.playTone(Note.C, music.beat(BeatFraction.Whole))
        do {
            cas += 0.1
            // basic.showNumber(cas)
            basic.pause(10)
        } while (input.lightLevel() > tma - 60)
    radio.sendNumber(16)
    whaleysans.showNumber(cas)
}})