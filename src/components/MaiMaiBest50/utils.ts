export const getTransparentColor = (color: string, opacity = 0.95) => {
  return color.replace(')', `, ${opacity})`).replace('rgb(', 'rgba(')
}
