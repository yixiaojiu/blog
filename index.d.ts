declare module '*.png' {
  export default string
}

declare module '*.webp' {
  const src: string
  export default src
}
