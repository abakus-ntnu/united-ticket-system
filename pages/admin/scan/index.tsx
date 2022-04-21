import AdminNavbar from "../../../components/AdminNavbar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import QRScanner from "../../../components/QRScanner";
import LogOutButton from "../../../components/LogOutButton";

const AdminPage = withPageAuthRequired(() => {
  return (
    <>
      <AdminNavbar />

      <div style={{ position: "absolute", top: "5px", right: "5px" }}>
        <LogOutButton />
      </div>
      <QRScanner />
    </>
  );
});

export default AdminPage;
