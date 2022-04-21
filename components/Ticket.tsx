import { Text, Row, Container, Card } from "@nextui-org/react";
import React from "react";
import QRCode from "react-qr-code";
import { AttendantType } from "../lib/types";

const TicketComponent = ({
  ticket,
  status,
}: {
  ticket: AttendantType | null;
  status: string | null;
}) => {
  return (
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
            height: "fit-content",
            width: "400px",
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ticket === null ? (
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
          ) : (
            <Card.Body
              css={{
                p: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card cover={false} css={{ width: "fit-content", m: "10px" }}>
                <Card.Body css={{ padding: "12px" }}>
                  <QRCode value={ticket.id} size={190} />
                </Card.Body>
              </Card>
              <Card cover={false} css={{ width: "fit-content" }}>
                <Card.Body css={{ padding: "12px" }}>
                  <Text
                    h4
                    css={{
                      textAlign: "center",
                      maxW: "190px",
                      wordWrap: "break-word",
                      w: "190px",
                      flex: 1,
                    }}
                    weight={"bold"}
                  >
                    {ticket.group}
                  </Text>
                </Card.Body>
              </Card>
              <Text
                h3
                color="white"
                css={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "30px",
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
          )}
        </Card>
      </Container>
    </Row>
  );
};

export default TicketComponent;
