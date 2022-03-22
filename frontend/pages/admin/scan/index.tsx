import { Row } from "@nextui-org/react";
import AdminNavbar from "../../../components/AdminNavbar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const AdminPage = withPageAuthRequired(() => {
  return (
    <>
      <AdminNavbar />
      <Row css={{ height: "100vh" }} justify="center" align="center">
        Scan
      </Row>
    </>
  );
});

export default AdminPage;
