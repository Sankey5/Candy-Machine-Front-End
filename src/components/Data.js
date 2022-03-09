import { React, useState } from "react";

const Data = (data) => {
  const [resp, setResp] = useState(null);

  return <div>{JSON.stringify(data)}</div>;
};

export default Data;
