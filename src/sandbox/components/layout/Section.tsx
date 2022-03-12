import { FC, Fragment } from "react";
import { SectionProps, SectionWithTitleProps } from "./interfaces";
import classnames from "classnames";

/**
 *
 * @param border
 * @param children
 * @returns section container
 */
const Section: FC<SectionProps> = ({ border, children }) => {
  const _border = classnames(
    { "border-gray-100": !!border },
    {
      "border-t": border === "top",
      "border-b": border === "bottom",
      "border-t border-b": border === "default",
    }
  );
  return <div className={classnames("px-4 py-8 my-8 mx-8 relative", _border)}>{children}</div>;
};

/**
 *
 * @param title
 * @returns section container with title on border
 */
export const SectionWithTitle: FC<SectionWithTitleProps> = ({ title, children, ...rest }) => {
  // @todo title should appear on border
  return (
    <Section border="default" {...rest}>
      <Fragment>
        <h2 className="absolute -top-3.5 bg-gray-900 px-2">{title}</h2>
        {children}
      </Fragment>
    </Section>
  );
};

export default Section;
