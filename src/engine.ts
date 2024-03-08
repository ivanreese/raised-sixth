export let wallTime = 0
export let time = 0
export let count = 0
export let dt = 0

export function tick(ms: number) {
  const lastWallTime = wallTime
  wallTime = ms / 1000
  dt = 0.1 * Math.min(wallTime - lastWallTime, 0.1) // Don't allow dt to be bigger than some small-ish value, like 100ms
  time += dt
  count++
}

export function firstTick(ms: number) {
  wallTime = ms / 1000
}
