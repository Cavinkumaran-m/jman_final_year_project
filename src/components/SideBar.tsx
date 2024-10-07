import Link from "next/link";
import { useAuthContext } from "@/configs/Context";

export const SideBar = () => {
  const { isAdmin } = useAuthContext();
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
        {!isAdmin && (
          <Link href={"/"} style={{ textDecoration: "none" }}>
            HOME
          </Link>
        )}
        {isAdmin && (
          <Link href={"/dashboard"} style={{ textDecoration: "none" }}>
            DASHBOARD
          </Link>
        )}
        <Link href={"/course"} style={{ textDecoration: "none" }}>
          BROWSE COURSE
        </Link>
        {isAdmin && (
          <Link href={"/user"} style={{ textDecoration: "none" }}>
            ADMINISTRATION
          </Link>
        )}
        <Link href={"/tree"} style={{ textDecoration: "none" }}>
          COURSE TREE
        </Link>
        <Link href={"/path"} style={{ textDecoration: "none" }}>
          LEARNING PATH
        </Link>
      </div>
    </div>
  );
};
