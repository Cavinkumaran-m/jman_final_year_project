"use client";

import Button from "./Button";

export const PlaceHolder = () => {
  return (
    <div className="p-1 col-6 col-md-4 col-lg-3 mt-3">
      <div className="card" style={{ height: "100%" }}>
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title placeholder-glow mb-3">
            <span className="placeholder col-12"></span>
          </h5>
          <div className="card-title placeholder-glow mb-2">
            <span className="placeholder col-8 mb-2"></span>
            <span className="placeholder col-12 mb-2"></span>
          </div>
          <Button className="disabled placeholder col-12 btn-sm p-2">
            Loading
          </Button>
        </div>
      </div>
    </div>
  );
};
