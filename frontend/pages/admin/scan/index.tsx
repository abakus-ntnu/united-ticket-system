import AdminNavbar from "../../../components/AdminNavbar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import QRScanner from "../../../components/QRScanner";

const AdminPage = withPageAuthRequired(() => {
    return (
        <>
            <AdminNavbar />
            <QRScanner />
        </>
    );
});

export default AdminPage;
