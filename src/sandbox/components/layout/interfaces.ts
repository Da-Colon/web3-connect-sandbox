type BorderOptions = "top" | "bottom" | "default"

export interface SectionProps {
  border?: BorderOptions;
  children?: JSX.Element
}

export interface SectionWithTitleProps extends SectionProps {
  title: string;
}

export interface AppWrapperProps {
  children: JSX.Element
}
