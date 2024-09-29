import Link from "next/link";

export const DropDown = () => {
  return (
    <div
      className="d-flex justify-content-around p-3"
      style={{ listStyleType: "none" }}
    >
      <Link href={"/404"}>Page 1</Link>
      <Link href={"/404"}>Page 2</Link>
      <Link href={"/404"}>Page 3</Link>
      <Link href={"/404"}>Page 4</Link>
    </div>
  );
};
