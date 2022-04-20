import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  Text,
  Row,
  Modal,
  Button,
  Grid,
  Tooltip,
} from "@nextui-org/react";
import { CreateAttendantType } from "../lib/types";
import { CloudUploadOutline } from "react-ionicons";
import { useRouter } from "next/router";
import fetcher from "../lib/fetcher";

const FileUploader = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [attendice, setAttendice] = useState<CreateAttendantType[]>([]);

  const handleFileUpload = async () => {
    const response = await fetcher(`/api/admin/attendees`, {
      method: "POST",
      body: JSON.stringify({
        data: attendice,
      }),
    });
    setVisible(false);
    if (response.code === 200) {
      router.reload();
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      if (typeof e?.target?.result === "string") {
        const tempAttendice: any[] = [];
        const text: String = e.target.result;
        const attendice: String[] = text.split("\n");
        if (attendice.at(-1) === "") {
          attendice.pop();
        }
        attendice.forEach((attendant) => {
          const attendantData = attendant.split(",");
          const newAttendant: CreateAttendantType = {
            name: attendantData[0],
            email: attendantData[1],
            group: attendantData[2],
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
    <Row justify="center">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "10px 0",
          gap: "5px",
        }}
      >
        <div {...getRootProps()} style={{ display: "flex" }}>
          <input {...getInputProps()} />
          <Card
            color="primary"
            bordered
            shadow={false}
            clickable
            css={{ mw: "500px" }}
          >
            <Grid.Container gap={2}>
              <Grid xs={12} sm={2} justify="center">
                <CloudUploadOutline color="#ffffff" height="40x" width="40px" />
              </Grid>
              <Grid xs={12} sm={10} justify="center" alignItems="center">
                <Text color="white" css={{ textAlign: "center" }}>
                  Last opp en en csv fil med brukere.
                </Text>
              </Grid>
            </Grid.Container>
          </Card>
        </div>

        <Tooltip
          trigger="click"
          content={"Per linje: [Fullt Navn],[epost],[linjeforening]"}
        >
          <Card
            shadow={false}
            clickable
            color="primary"
            css={{
              justifyContent: "center",
              backgroundColor: "$gray600",
              width: "fit-content",
            }}
          >
            Format?
          </Card>
        </Tooltip>
      </div>
      <Modal
        closeButton
        blur
        open={visible}
        onClose={() => setVisible(false)}
        style={{ margin: "10px" }}
      >
        <Modal.Header>
          <Text id="Forhåndsvisning" size={18}>
            Forhåndsvisning
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Antall brukere gjennkjent: {attendice.length}</Text>
          <br></br>
          <table>
            <thead>
              <tr>
                <th>Navn</th>
                <th>Epost</th>
                <th>Gruppe</th>
              </tr>
            </thead>
            <tbody>
              {attendice.slice(0, 3).map((attendant, idx) => (
                <tr key={idx}>
                  <td>{attendant["name"]}</td>
                  <td>{attendant["email"]}</td>
                  <td>{attendant["group"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Text css={{ textAlign: "center" }}>...</Text>
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
    </Row>
  );
};

export default FileUploader;
