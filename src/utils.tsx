export function formatTime(timeInS: number): string {
  const [h, m, s] = getHoursMinutesSeconds(timeInS);

  return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}

export function getHoursMinutesSeconds(
  totalInSeconds: number,
): [number, number, number] {
  const hours = Math.floor(totalInSeconds / 3600);
  const minutes = Math.floor((totalInSeconds % 3600) / 60);
  const seconds = totalInSeconds % 60;

  return [hours, minutes, seconds];
}
