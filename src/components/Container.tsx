import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 md:px-0">{children}</div>
  );
}

export default Container;
