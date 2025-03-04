let randomSeed = 84392;

export const seededRandom = () => {
  const x = Math.sin(randomSeed++) * 10000;
  return x - Math.floor(x);
};
