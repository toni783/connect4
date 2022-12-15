/**
 * Type for making optional fields required
 */
export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

/**
 * Type for making all fields optional except for the ones that we indicate
 */
export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;
