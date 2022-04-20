import AdminNavbar from "../../components/AdminNavbar";
import FileUploader from "../../components/FileUploader";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import UserTable from "../../components/UserTable";
import MailButton from "../../components/MailButton";

const AdminPage = withPageAuthRequired(() => {
  return (
    <>
      <AdminNavbar />
      <FileUploader />
      <MailButton />
      <UserTable />
    </>
  );
});

export default AdminPage;
