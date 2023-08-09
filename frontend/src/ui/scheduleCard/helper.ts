export const dateChange = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);

  const min = minutes - hours * 60;

  return `${hours} ч ${min} мин`;
};
