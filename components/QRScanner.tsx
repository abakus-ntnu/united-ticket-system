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
import { OnResultFunction, QrReader } from "react-qr-reader";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const QRScanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [blockScan, setBlockScan] = useState(false);
  const [modalMessage, setModalMessage] = useState("No data");
  const [modalColor, setModalColor] = useState("");

  const count = useSWR(`/api/admin/attendee_count`, fetcher, {
    refreshInterval: 5000,
  });

  const handleScan: OnResultFunction = async (result, error) => {
    if (!!error) return console.error(error);

    if (blockScan) return;

    setBlockScan(true);
    if (result?.getText()) {
      const data = await fetcher(`/api/admin/admit_attendee`, {
        body: JSON.stringify({
          id: result.getText(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      }).catch((e) => console.error(e));

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

  const handleClose = () => {
    setVisible(false);
    setBlockScan(false);
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

      <Row
        className="HALOOO"
        css={{ width: "100%" }}
        justify="center"
        align="center"
      >
        {!blockScan && (
          <QrReader
            onResult={handleScan}
            constraints={{ facingMode: "environment" }}
            containerStyle={{ width: "100%", height: "0" }}
          />
        )}
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
            onClick={() => {
              setVisible(false);
            }}
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
