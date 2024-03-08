export const clip = (i: number, min = 0, max = 1) => Math.min(Math.max(i, min), max)
export const normalized = (i: number, min: number, max: number) => (max === min ? min : (i - min) / (max - min))
export const denormalized = (i: number, min: number, max: number) => i * (max - min) + min
export const renormalized = (i: number, min1: number, max1: number, min2: number, max2: number) => denormalized(normalized(i, min1, max1), min2, max2)
export const rand = (min = 0, max = 1) => denormalized(Math.random(), min, max)
export const randInt = (min = 0, max = 1) => Math.round(rand(min, max))
export const mod = (n: number, m: number) => ((n % m) + m) % m
export const arrRand = (arr: Array<any>) => arr[rand(0, arr.length) | 0]
export const hsl = (h: number, s: number, l: number): string => `hsl(${mod(h, 360)}, ${s}%, ${l}%)`
