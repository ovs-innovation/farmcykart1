import React from "react";

const Main = ({ children }) => {
  return (
    <main className="h-full overflow-y-auto">
      <div className="grid px-6 mx-auto w-full">{children}</div>
    </main>
  );
};

export default Main;
