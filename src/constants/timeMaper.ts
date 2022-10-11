export const timeMaper = (time: number | null, units: keyof object | null): string | undefined => {
  if (time && units) {
    const maper = {
      минут: `00 00:${[time]}:00`,
      часов: `00 ${[time]}:00:00`,
      дней: `${[time]} 00:00:00`,
    }
    return maper[units as keyof object]
  }
}
