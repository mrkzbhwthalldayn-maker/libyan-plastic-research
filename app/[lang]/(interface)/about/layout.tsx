import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <div className="md:pt-5 bg-secondary">{children}</div>;
};

export default layout;
