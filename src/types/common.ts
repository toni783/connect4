/**
 * Type for making optional fields required
 */
export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};
