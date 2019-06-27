function viewConverter(number) {
  if (number > 1000) return Math.floor(number/1000) + ' k'
  else if (number > 1000000) return Math.floor(number/1000000) + ' M' 
  else if (number > 1000000000) return Math.floor(number/1000000000) + ' B' 
  else return number
}

export default viewConverter