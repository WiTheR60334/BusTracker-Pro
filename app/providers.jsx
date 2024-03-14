import React from "react";
import { AntdRegistry } from "./antd";

function Providers({ children }) {
  return (
    <>
      <AntdRegistry>{children}</AntdRegistry>
    </>
  );
}

export default Providers;
