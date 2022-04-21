import {
  Button,
  Container,
  Card,
  Col,
  Text,
  Row,
  Grid,
  Spacer,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import fetcher from "../lib/fetcher";

const GdprComponent: React.FC = ({ children }) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const router = useRouter();
  const ticketId = router.query.ticketId;
  const setPhotoConsent = async (consent: boolean) => {
    await fetcher(`/api/attendees/update_photo_consent`, {
      method: "PATCH",
      body: JSON.stringify({
        id: ticketId,
        consent,
      }),
    });
  };

  const handleAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHasAnswered(true);
    setPhotoConsent(true);
  };

  const handleDenial = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHasAnswered(true);
    setPhotoConsent(false);
  };

  return hasAnswered ? (
    <>{children}</>
  ) : (
    <Row
      className="row"
      css={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Card className="card" css={{ background: "$cyan900" }}>
          <Col
            css={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Text h1 color="white" css={{ m: 0, textAlign: "center" }}>
              GDPR
            </Text>
            <Text h4 color="white" css={{ m: 0, textAlign: "center" }}>
              Jeg samtykker til at det kan tas bilder av meg ved dette
              arrangementet, og til at disse kan publiseres på linjeforeningenes
              nettsider.
            </Text>
          </Col>
          <Spacer y={3} />
          <Grid.Container
            gap={2}
            css={{
              display: "flex",
              justifyContent: "center",
              "@smMax": { flexDirection: "column" },
            }}
          >
            <Button
              flat
              css={{ color: "$cyan900", background: "$cyan200" }}
              onClick={handleAccept}
            >
              JA, jeg samtykker
            </Button>
            <Spacer x={3} />
            <Button
              flat
              css={{ color: "$cyan900", background: "$cyan200" }}
              onClick={handleDenial}
            >
              NEI, jeg samtykker IKKE
            </Button>
          </Grid.Container>
        </Card>
      </Container>
    </Row>
  );
};

export default GdprComponent;
