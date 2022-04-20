import {
  Button,
  Card,
  Container,
  Modal,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import React, { useState } from "react";
// @ts-ignore
import QrReader from "react-qr-scanner";
import useSWR from "swr";
import fetchWithToken from "../lib/fetchWithToken";

const QRScanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState("No data");
  const [modalColor, setModalColor] = useState("");

  const count = useSWR(
    `${process.env.API_URL}/admin/attendees/count`,
    fetchWithToken,
    { refreshInterval: 5000 }
  );

  const handleScan = async (result: any) => {
    if (id) {
      return;
    }
    if (result?.text) {
      setId(result.text);

      const data = await fetchWithToken(
        `${process.env.API_URL}/admin/attendees/${result.text}/admitted/`,
        {
          method: "PATCH",
        }
      ).catch((e) => console.error(e));

      if (!data) {
        setModalMessage("No data");
        setModalColor("$red100");
      }

      switch (data.code) {
        case 200:
          setModalMessage("Deltaker registrert");
          setModalColor("$green100");
          break;

        case 403:
          if (!data.message.active) {
            setModalMessage(`Deltaker har meldt seg av: ${data.message.name}`);
            setModalColor("$red100");
          } else if (data.message.admitted) {
            setModalMessage(
              `Deltaker allerede registrert: ${data.message.name}`
            );
            setModalColor("$yellow100");
          } else {
            setModalMessage(
              `Kunne ikke registrere deltaker: ${data.message.name}`
            );
            setModalColor("$red100");
          }
          break;

        case 404:
          setModalMessage("Deltaker ikke funnet");
          setModalColor("$red100");
          break;

        default:
          setModalMessage(
            "Unknown error: " + data.code + (typeof data.message == "string")
              ? `, ${data.message}`
              : ""
          );
          console.error(data.message);
          setModalColor("$red100");
          break;
      }
      setVisible(true);
    }
  };

  const handleError = (error: any) => {
    console.log(error);
  };

  const handleClose = () => {
    setId(null);
    setVisible(false);
    setModalColor("");
    setModalMessage("No data");
  };

  return (
    <Container justify="center" display="flex">
      <Spacer y={1} />
      <Row justify="center">
        <Text css={{ textAlign: "center" }}>
          Scan en billett med kameraet under og slipp inn deltager ved velykket
          scan
        </Text>
      </Row>
      <Spacer y={1} />
      {!count.error && count.data ? (
        <Card
          bordered
          shadow={false}
          css={{
            justifyContent: "center",
            margin: "10px 0",
            flexDirection: "column",
            width: "fit-content",
          }}
        >
          <Text css={{ textAlign: "center" }} weight="bold" size={"$sm"}>
            Totalt antall registrerte: {count.data.total}
          </Text>
          <Text css={{ textAlign: "center" }} weight="bold">
            Totalt siste 10 minutter: {count.data.last_ten_minutes}
          </Text>
        </Card>
      ) : null}

      <Row css={{ width: "100%" }} justify="center" align="center">
        <QrReader
          style={{ width: "100vh" }}
          onScan={handleScan}
          onError={handleError}
          delay={500}
        />
      </Row>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={handleClose}
        // @ts-ignore // Docs specifies this property exists
        css={{ backgroundColor: modalColor }}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Registrer deltaker
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text css={{ textAlign: "center" }} b size={30}>
            {modalMessage}
          </Text>
        </Modal.Body>
        <Modal.Footer justify="center">
          <Button
            auto
            flat
            css={{ backgroundColor: "$gray100" }}
            onClick={handleClose}
            bordered
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default QRScanner;