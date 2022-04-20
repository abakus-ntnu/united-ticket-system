import { Text, Row, Container, Card } from "@nextui-org/react";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { AttendantType } from "../../types/types";

const TicketComponent = ({
  ticket,
  status,
}: {
  ticket?: AttendantType;
  status: string;
}) => {
  return ticket !== undefined ? (
    <Row
      css={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        className="test"
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          css={{
            background: "$cyan900",
            height: "400px",
            width: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card.Body
            css={{
              p: 0,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QRCode
              value={ticket.id}
              fgColor="#FFFFFF"
              bgColor="#206C7A"
              size={190}
            />
            <Text
              h3
              color="white"
              css={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "40px",
              }}
            >
              Her er din billett!
            </Text>
            <Text
              h4
              color="white"
              css={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Må scannes av dørvakt.
            </Text>
          </Card.Body>
        </Card>
      </Container>
    </Row>
  ) : (
    <Row
      css={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        className="test"
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          css={{
            background: "$cyan900",
            height: "400px",
            width: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            h3
            color="white"
            css={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {status}
          </Text>
        </Card>
      </Container>
    </Row>
  );
};

export default TicketComponent;
