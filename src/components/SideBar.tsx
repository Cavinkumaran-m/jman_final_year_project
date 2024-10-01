import Link from "next/link";

export const SideBar = () => {
  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex={-1}
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          JLearn
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body d-flex flex-column">
        <Link href={"/"} style={{ textDecoration: "none" }}>
          HOME
        </Link>
        <Link href={"/browse"} style={{ textDecoration: "none" }}>
          BROWSE COURSE
        </Link>
      </div>
    </div>
  );
};
