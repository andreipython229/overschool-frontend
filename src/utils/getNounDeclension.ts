export const getNounDeclension = (quantity: number, strVariants: string[]) => {
  let n = quantity
  n %= 100

  if (n >= 5 && n <= 20) return strVariants[2]

  n %= 10

  if (n === 1) return strVariants[0]
  if (n >= 2 && n <= 4) return strVariants[1]

  return strVariants[2]
}
