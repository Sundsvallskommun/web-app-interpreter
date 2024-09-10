import { cx } from "@sk-web-gui/react";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {}

export const Card: React.FC<CardProps> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <div
      className={cx(
        "p-16 sm:p-32 flex gap-16 shadow-50 rounded-cards max-w-full",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
