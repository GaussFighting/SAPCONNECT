import React from "react";

const Error = ({ error }) => (
  <>
    {" "}
    {/* Just "div" tag might be fine :D */}
    <div className="error p-2 m-2">Error: {error}</div>
  </>
);
export default Error;
