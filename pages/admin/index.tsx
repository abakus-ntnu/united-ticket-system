import AdminNavbar from "../../components/AdminNavbar";
import FileUploader from "../../components/FileUploader";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import UserTable from "../../components/UserTable";
import MailButton from "../../components/MailButton";
import { Row } from "@nextui-org/react";
import LogOutButton from "../../components/LogOutButton";

const AdminPage = withPageAuthRequired(() => {
  return (
    <>
      <Row justify="center">
        <AdminNavbar />
        <div style={{ position: "absolute", top: "5px", right: "5px" }}>
          <LogOutButton />
        </div>
      </Row>
      <FileUploader />
      <MailButton />
      <UserTable />
    </>
  );
});

export default AdminPage;
