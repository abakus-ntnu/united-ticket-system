import { Button, Container, Modal, Row, Spacer, Text } from "@nextui-org/react";
import React, { useState } from "react";
// @ts-ignore
import QrReader from "react-qr-scanner";
import fetchWithToken from "../lib/fetchWithToken";

const QRScanner: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState("No data");
    const [modalColor, setModalColor] = useState("");

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

            switch (data.code) {
                case 200:
                    setModalMessage("Påmelding registrert");
                    setModalColor("$green100");
                    break;

                case 403:
                    setModalMessage(
                        `Påmedling er allerede registrert: ${data.message}`
                    );
                    setModalColor("$yellow100");
                    break;

                case 404:
                    setModalMessage("Påmelding ikke funnet");
                    setModalColor("$red100");
                    break;

                default:
                    setModalMessage(
                        "Unknown error: " + data.code + ", " + data.message
                    );
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
        <Container justify="center">
            <Spacer y={1} />
            <Row justify="center">
                <Text css={{ textAlign: "center" }}>
                    Scan en billett med kameraet under og slipp inn deltager ved
                    velykket scan
                </Text>
            </Row>
            <Spacer y={1} />
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
            >
                <Modal.Header css={{ backgroundColor: modalColor }}>
                    <Text id="modal-title" size={18}>
                        Registrer påmelding
                    </Text>
                </Modal.Header>
                <Modal.Body css={{ backgroundColor: modalColor }}>
                    <Text css={{ textAlign: "center" }} b size={30}>
                        {modalMessage}
                    </Text>
                </Modal.Body>
                <Modal.Footer
                    justify="center"
                    css={{ backgroundColor: modalColor }}
                >
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
