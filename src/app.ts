import Orchestra from "./orchestra.js"
import * as Engine from "./engine.js"
import * as Audio from "./audio.js"
import Musician from "./musician.js"

const preloadElm = document.querySelector(".preload") as HTMLElement
const canvas = document.querySelector("canvas:nth-of-type(2)") as HTMLCanvasElement
const context = canvas.getContext("2d") as CanvasRenderingContext2D

const mouse = {
  x: 0,
  y: window.innerHeight / 2,
}

// Wait until the JS is running to give the user some indication that their clicks will be received
preloadElm.textContent = "Click To Play"

window.addEventListener("mousedown", init, { once: true })
window.addEventListener("touchstart", init, { once: true })
window.addEventListener("mousemove", (e) => {
  // mouse.x = e.clientX
  // mouse.y = e.clientY
})

function init() {
  Audio.setupAudio()
  preloadElm.remove()
  resize()

  // for (let i = 0; i < 10; i++) Orchestra.spawn()

  window.addEventListener("resize", resize)
  window.requestAnimationFrame((ms) => {
    Engine.firstTick(ms)
    window.requestAnimationFrame(tick)
  })
}

function tick(ms: number) {
  Engine.tick(ms)
  Orchestra.tick(mouse)
  render()
  window.requestAnimationFrame(tick)
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)

  // Draw the horizontal line
  // context.fillStyle = "#333"
  // context.fillRect(0, window.innerHeight / 2 - 1, window.innerWidth, 2)

  Orchestra.render(context)
  Orchestra.allPlayers.forEach((p, index) => {
    context.save()
    p.draw(context, index, Orchestra.allPlayers)
    context.restore()
  })
}

function resize() {
  const dpi = window.devicePixelRatio
  canvas.width = dpi * window.innerWidth
  canvas.height = dpi * window.innerHeight
  context.resetTransform()
  context.scale(dpi, dpi)
  initFont() // Changing canvas width seems to clear this state
  render()
}

function initFont() {
  context.font = "12px sans-serif"
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.lineCap = "round"
  context.lineJoin = "round"
}
