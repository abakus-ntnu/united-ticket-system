import { Button, Container, Modal, Row, Spacer, Text, useModal } from "@nextui-org/react";
import React, { useState } from "react";
import QrReader from 'react-qr-scanner';

const QRScanner: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const [user, setUser] = useState("No data")

    const handleScan = (result: any) => {
      if (result?.text) {
        setUser(result?.text);
        setVisible(true)
      }
    }
  
    const handleError = (error: any) => {
      console.log(error);
    }

    const registerUser = () => {
      // her sender man request for å regisrerer bruker
      setVisible(false)
    }

  return (
    <Container justify="center">
        <Spacer y={1} />
        <Row justify="center">Scan en billett med kameraet under og slipp inn deltager ved velykket scan</Row>
        <Spacer y={1} />
        <Row css={{ widht: "100vh" }} justify="center" align="center">
            {(typeof window !== "undefined") &&
              <QrReader style={{ width: "100vh" }} onScan={handleScan} onError={handleError} />
            }
        </Row>
        <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>   
            Registrer bruker
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text css={{textAlign:"center"}} b size={30}>{user}</Text>
        </Modal.Body>
        <Modal.Footer css={{justifyContent:"space-between"}}>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onClick={registerUser}>
            Registrer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default QRScanner;
