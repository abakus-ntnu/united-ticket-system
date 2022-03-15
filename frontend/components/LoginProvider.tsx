import { Button, Col, Input, Row, Spacer, useInput } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const LoginProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const { value, bindings } = useInput("");

  useEffect(() => {
    // provide authentication with e.g. oauth
    if (!localStorage.getItem("utstoken")) setLoggedIn(false);
    else setLoggedIn(true);
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    localStorage.setItem("utstoken", value);
    setLoggedIn(true);
  };

  return loggedIn ? (
    <>{children}</>
  ) : (
    <Row justify="center" align="center" css={{ height: "100vh" }}>
      <Col>
        <Row justify="center">Vennligst skriv passord</Row>
        <Spacer y={1} />
        <form onSubmit={handleSubmit}>
          <Row justify="center" gap={1}>
            <Input.Password
              aria-label="passord"
              {...bindings}
              placeholder="passord"
            />
          </Row>
          <Spacer y={0.5} />
          <Row justify="center">
            <Button size={"sm"} type="submit">
              Logg in
            </Button>
          </Row>
        </form>
      </Col>
    </Row>
  );
};

export default LoginProvider;
