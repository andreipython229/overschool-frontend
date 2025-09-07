export function validatePhone(phoneNumber: string): boolean {
  if (phoneNumber.length !== 13) {
    return false
  }

  const prefix = phoneNumber.slice(0, 4)
  if (prefix !== '+375') {
    return false
  }

  const operatorCode = phoneNumber.slice(4, 6)
  const validOperatorCodes = ['29', '33', '44', '25']

  if (!validOperatorCodes.includes(operatorCode)) {
    return false
  }

  return true
}
