import { Button, Link } from "@nextui-org/react";
import React, { VFC } from "react";
import { ExitOutline } from "react-ionicons";

const LogOutButton: VFC = () => {
  return (
    <Link href={"/api/auth/logout"}>
      <Button
        size={"sm"}
        icon={
          <div style={{ maxHeight: "25px", maxWidth: "25px" }}>
            <ExitOutline
              color={"#00000"}
              style={{ height: "25px", width: "25px" }}
            />
          </div>
        }
        auto
      ></Button>
    </Link>
  );
};

export default LogOutButton;
