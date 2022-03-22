import AdminNavbar from "../../components/AdminNavbar";
import FileUploader from "../../components/FileUploader";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const AdminPage = withPageAuthRequired(() => {
  return (
    <>
      <AdminNavbar />
      <FileUploader />
    </>
  );
});

export default AdminPage;
