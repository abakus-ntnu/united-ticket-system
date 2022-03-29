import AdminNavbar from "../../components/AdminNavbar";
import FileUploader from "../../components/FileUploader";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import UserTable from "../../components/UserTable";

const AdminPage = withPageAuthRequired(() => {
  return (
    <>
      <AdminNavbar />
      <FileUploader />
      <UserTable />
    </>
  );
});

export default AdminPage;
