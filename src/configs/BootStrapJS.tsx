"use client";

import { useEffect } from "react";

function BootstrapJS() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  return null;
}

export default BootstrapJS;
