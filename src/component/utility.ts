export const shffleArr = (array: any) =>
  [...array].sort(() => Math.random() - 0.5);
