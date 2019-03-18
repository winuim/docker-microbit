let uptime = 0
let viewType = 0
let displayMode = 0
input.onButtonPressed(Button.A, function () {
    viewType += 1
    if (viewType > 4) {
        viewType = 0
    }
})
input.onButtonPressed(Button.B, function () {
    displayMode += 1
    if (displayMode > 1) {
        displayMode = 0
        viewType = 0
    }
})
serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    outputAllSensor()
})
function displayTemperature() {
    basic.showNumber(input.temperature())
    basic.showLeds(`
        # . # # .
        . # . . #
        . # . . .
        . # . . #
        . . # # .
        `)
}
function displayLightLevel() {
    basic.showNumber(input.lightLevel())
    basic.showString("lx")
}
function displayRoll() {
    basic.showNumber(input.rotation(Rotation.Roll))
    basic.showString("roll")
}
function displayAcceleration() {
    basic.showNumber(input.acceleration(Dimension.Strength))
    basic.showString("mG")
}
function displayPitch() {
    basic.showNumber(input.rotation(Rotation.Pitch))
    basic.showString("pitch")
}
function outputAllSensor() {
    serial.writeString("{")
    serial.writeString("\"temperature\":" + input.temperature() + ",")
    serial.writeString("\"lightLevel\":" + input.lightLevel() + ",")
    serial.writeString("\"acceleration\":" + input.acceleration(Dimension.Strength) + ",")
    serial.writeString("\"pitch\":" + input.rotation(Rotation.Pitch) + ",")
    serial.writeString("\"roll\":" + input.rotation(Rotation.Roll) + ",")
    serial.writeString("\"uptime\":" + input.runningTime())
    serial.writeLine("}")
}
basic.showIcon(IconNames.Happy)
uptime = input.runningTime()
viewType = 0
displayMode = 0
basic.forever(function () {
    if (uptime + 1000 < input.runningTime()) {
        if (displayMode == 0) {
            if (viewType == 1) {
                displayLightLevel()
            } else if (viewType == 2) {
                displayAcceleration()
            } else if (viewType == 3) {
                displayPitch()
            } else if (viewType == 4) {
                displayRoll()
            } else {
                displayTemperature()
            }
            basic.clearScreen()
        }
        uptime = input.runningTime()
    }
})
