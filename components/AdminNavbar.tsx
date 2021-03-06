import { Button, Row } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

const AdminNavbar: React.FC = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const NavButton: React.FC<{ path: string }> = ({ path, children }) => (
    <Button
      clickable={!router.asPath.endsWith(path)}
      onClick={() => {
        navigateTo(path);
      }}
      css={{
        textDecoration: router.asPath.endsWith(path) ? "underline 2px" : "",
      }}
    >
      {children}
    </Button>
  );

  return (
    <Row justify="center">
      <Button.Group size="sm" bordered>
        <NavButton path="/admin">Administrer</NavButton>
        <NavButton path="/admin/scan">Scan billett</NavButton>
      </Button.Group>
    </Row>
  );
};

export default AdminNavbar;
