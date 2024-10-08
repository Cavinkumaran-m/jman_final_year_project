import Button from "./Button";
import { useRouter } from "next/navigation";

export default function Table({ data }: { data: [userType] }) {
  const router = useRouter();
  return (
    <table className="table  table-bordered table-responsive">
      <thead className="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Full Name</th>
          <th scope="col">User Name</th>
          <th scope="col">Email</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((datum, i) => (
          // datum.Role !== "admin" && (
          <tr key={i}>
            <th scope="row">{datum.UserID}</th>
            <td>{datum.FullName}</td>
            <td>{datum.UserName}</td>
            <td>{datum.Email}</td>
            <td className="text-center">
              <Button
                className="btn-sm"
                style={{ fontSize: "20px", padding: 0 }}
                onClick={() => router.push("/user/" + datum.UserID)}
              >
                📝
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
