import { Row } from "@nextui-org/react";
import type { NextPage } from "next";
import AdminNavbar from "../../components/AdminNavbar";
import FileUploader from "../../components/FileUploader";
import LoginProvider from "../../components/LoginProvider";

const AdminPage: NextPage = () => {
  return (
    <LoginProvider>
      <AdminNavbar />
      <FileUploader />
      <Row css={{ height: "100vh" }} justify="center" align="center">
        Du er logget inn
      </Row>
    </LoginProvider>
  );
};

export default AdminPage;
