export const getTransparentColor = (color: string, opacity = 0.95) => {
  return color.replace(')', `, ${opacity})`).replace('rgb(', 'rgba(')
}

export const getTrophyColor = (color: string) => {
  color = color.toLowerCase()
  if (color == 'bronze' || color == 'copper') {
    return '#F06418'
  } else if (color == 'normal') {
    return '#656A7E'
  } else if (color == 'gold') {
    return '#FFAB09'
  } else if (color == 'platina') {
    return '#D9D02F'
  } else if (color == 'silver') {
    return '#09B8FF'
  }
  return '#8931B2'
}

export const getDeluxeRatingGradient = (rating: number) => {
  if (rating < 1000) {
    return { from: 'lightblue', to: 'lightblue' }
  } else if (rating < 2000) {
    return { from: '#228be6', to: '#228be6' }
  } else if (rating < 4000) {
    return { from: 'lime', to: '#40c057' }
  } else if (rating < 7000) {
    return { from: '#fab005', to: '#fd7e14' }
  } else if (rating < 10000) {
    return { from: 'lightcoral', to: '#fa5252' }
  } else if (rating < 12000) {
    return { from: 'mediumorchid', to: 'purple' }
  } else if (rating < 13000) {
    return { from: 'peru', to: 'brown' }
  } else if (rating < 14000) {
    return { from: 'lightblue', to: '#228be6' }
  } else if (rating < 14500) {
    return { from: 'gold', to: 'goldenrod' }
  } else if (rating < 15000) {
    return { from: 'khaki', to: 'goldenrod' }
  }
  return { from: 'grape', to: 'cyan' }
}
