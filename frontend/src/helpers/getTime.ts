export const getTime = (date: Date): string => {
  date = new Date(date);

  return date.toLocaleTimeString("ru").slice(0, -3);
};

export const getDayMonth = (date: Date): string => {
  date = new Date(date);

  return date.toLocaleDateString("ru", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
