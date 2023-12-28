export function getRandomNumber(range: number, current?: number): number {
  while (true) {
    const num = Math.floor(Math.random() * range)
    if (num !== current) {
      return num
    }
  }
}
