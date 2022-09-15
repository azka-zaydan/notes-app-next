export const stringSplitter = (word: string) => {
  const half = Math.ceil(word.length / 2);
  const firstHalf = word.slice(0, half);
  const secondHalf = word.slice(-half);
  return {
    firstHalf,
    secondHalf,
  };
};
