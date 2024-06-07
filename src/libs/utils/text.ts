export const toShortName = (name: string | null | undefined) => {
  if (!name) {
    return 'CL'
  }
  const words = name.split(' ').filter((w) => w.length > 1)
  if (words.length > 1) {
    return words[words.length - 2][0].toUpperCase() + words[words.length - 1][0].toUpperCase()
  } else if (words.length === 1) {
    return words[0][0].toUpperCase() + words[0][words[0].length - 1].toUpperCase()
  }
  return 'CL'
}

export default { toShortName }
