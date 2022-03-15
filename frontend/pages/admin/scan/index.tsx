import { Row } from "@nextui-org/react";
import type { NextPage } from "next";
import AdminNavbar from "../../../components/AdminNavbar";
import LoginProvider from "../../../components/LoginProvider";

const AdminPage: NextPage = () => {
  return (
    <LoginProvider>
      <AdminNavbar />
      <Row css={{ height: "100vh" }} justify="center" align="center">
        Scan
      </Row>
    </LoginProvider>
  );
};

export default AdminPage;
