export function validateEmail(email: string): boolean {
  // Регулярное выражение для проверки email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}
