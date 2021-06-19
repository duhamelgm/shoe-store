export const getHoursAndMinutes = (date: Date): string => {
  let minutes = String(date.getMinutes());
  if (parseInt(minutes) <= 9) minutes = "0" + minutes;

  let seconds = String(date.getSeconds());
  if (parseInt(seconds) <= 9) seconds = "0" + seconds;

  return `${date.getHours()}:${minutes}:${seconds}`;
};
