import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

interface ContainerProps<T extends ElementType> {
  as?: T;
  className?: string;
  children: ReactNode;
}

/** Shared max-width + horizontal padding wrapper used by every section. */
export function Container<T extends ElementType = "div">({
  as,
  className = "",
  children,
  ...rest
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Tag = as || "div";
  return (
    <Tag
      className={`mx-auto w-full max-w-[1340px]  ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
