import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, Text, Row, Modal, Button } from "@nextui-org/react";
import { attendantType } from "../types";

const FileUploader = () => {
  const [visible, setVisible] = useState(false);
  const [attendice, setAttendice] = useState<attendantType[]>([]);

  const handleFileUpload = () => {
    console.log("JEG SENDER JSON TIL SERVEREN HER");
    setVisible(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      if (typeof e?.target?.result === "string") {
        const tempAttendice: any[] = [];
        const text: String = e.target.result;
        const attendice: String[] = text.split("\n");
        attendice.forEach((attendant) => {
          const attendantData = attendant.split(",");
          const newAttendant: attendantType = {
            name: attendantData[0],
            mail: attendantData[1],
            group: attendantData[2],
            ticket_sent: false,
            registered: true,
            attended: false,
            foto_consent: false,
          };
          tempAttendice.push(newAttendant);
        });
        setAttendice(tempAttendice);
      }
    };
    reader.readAsText(acceptedFiles[0]);
    setVisible(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: "text/csv",
  });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Card
          color="primary"
          bordered
          shadow={false}
          clickable
          css={{ mw: "500px" }}
        >
          <Row justify="space-between">
            <p>Icon her</p>
            <Text color="white">
              Last opp en en csv fil av brukere. (Se formatering)
            </Text>
          </Row>
        </Card>
      </div>
      <Modal closeButton blur open={visible} onClose={() => setVisible(false)}>
        <Modal.Header>
          <Text id="Forhåndsvisning" size={18}>
            Forhåndsvisning
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Antall brukere: {attendice.length}</Text>
          <table>
            <thead>
              <tr>
                <th>Navn</th>
                <th>Epost</th>
                <th>Gruppe</th>
              </tr>
            </thead>
            <tbody>
              {attendice.map((attendant, idx) => (
                <tr key={idx}>
                  <td>{attendant["name"]}</td>
                  <td>{attendant["mail"]}</td>
                  <td>{attendant["group"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Row justify="space-between">
            <Button auto flat color="error" onClick={() => setVisible(false)}>
              Lukk
            </Button>
            <Button auto onClick={() => handleFileUpload()}>
              Registrer
            </Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FileUploader;
