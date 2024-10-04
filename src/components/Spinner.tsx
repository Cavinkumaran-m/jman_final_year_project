import Button from "./Button";

const Spinner = () => {
  return (
    <>
      <Button className="btn btn-lg d-flex align-items-center" type="button">
        <span
          className="spinner-border spinner-border-lg me-3"
          role="status"
          aria-hidden="true"
        ></span>
        <span className="fs-5">Loading...</span>
      </Button>
    </>
  );
};

export default Spinner;
