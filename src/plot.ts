export default class Plot {
  public min = Infinity
  public max = -Infinity
  public values: Array<number> = []
  private count = 0

  constructor(private skip = 0, private limit = 10_000, public color = "#FFF") {}

  add(value: number) {
    if (this.count++ % this.skip === 0) {
      this.values.push(value)
      this.min = Math.min(value, this.min)
      this.max = Math.max(value, this.max)
    }
    if (this.values.length > this.limit) this.values.shift()
  }
}
