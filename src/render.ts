import type Plot from "./plot.js"
import * as math from "./math.js"

export type Stack = { x: number; y: number }

export function beginStack(x: number, y: number): Stack {
  return { x, y }
}

export function stackH(context: CanvasRenderingContext2D, stack: Stack, text: any) {
  context.fillText(text, stack.x, stack.y)
  stack.x += 20 + context.measureText(text).width
}

export function stackV(context: CanvasRenderingContext2D, stack: Stack, text: any) {
  context.fillText(text, stack.x, stack.y)
  stack.y += 20
}

export function drawPlot(context: CanvasRenderingContext2D, history: Plot, x: number, y: number, width: number, height: number) {
  if (history.values.length > 1) {
    context.beginPath()
    context.strokeStyle = history.color
    let drawFn = "moveTo"

    for (let i = 0; i < history.values.length; i++) {
      const _x = math.renormalized(i, 0, history.values.length - 1, x, x + width)
      const _y = math.renormalized(history.values[i], history.min, history.max, y + height, y)
      context[drawFn](_x, _y)
      drawFn = "lineTo"
    }

    if (drawFn === "lineTo") context.stroke()
  }
}
