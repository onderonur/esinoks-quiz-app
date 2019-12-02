import React from "react";
import ErrorFallback from "components/ErrorFallback";

const NotFound404 = () => {
  return <ErrorFallback title="404" subtitle="Aradığınız içeriği bulamadık." />;
};

export default NotFound404;
