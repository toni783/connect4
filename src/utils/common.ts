/**
 *
 * @param min minimum number for random number between specified range
 * @param max maximum number for random number between specified range
 * @returns a number between the min and max range
 */
export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
