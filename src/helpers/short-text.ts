export const shortText = (text: string, size = 100) => {
  return text.length > size ? text.substring(0, size - 3).concat('...') : text
}