export const weightArray = () => {
  const weightArray2 = [];
  for (let i = 40; i <= 120; i++) {
    weightArray2.push({ value: i, text: i.toString() });
  }
  return weightArray2;
};
