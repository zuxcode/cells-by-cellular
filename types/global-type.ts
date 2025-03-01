export type Element<T extends React.ElementType = "div"> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
  };
