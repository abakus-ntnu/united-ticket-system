import { Card, Container, Row, Spacer } from "@nextui-org/react";
import React, { useState } from "react";
import QrReader from 'react-qr-scanner';

const QRScanner: React.FC = () => {
    const [data, setData] = useState('No result');

    const handleScan = (result) => {
      setData(result?.text);
    }
  
    const handleError = (error) => {
      console.log(error);
    }

  return (
    <Container justify="center">
        <Spacer y={1} />
        <Row justify="center">Scan en billett med kameraet under og slipp inn deltager ved velykket scan</Row>
        <Spacer y={1} />
        <Row css={{ widht: "100vh" }} justify="center" align="center">
            {(typeof window !== "undefined") &&
            <QrReader style={{ width: "100vh" }} delay={1000} onScan={handleScan} onError={handleError} />
            }
        </Row>
        <Row css={{ widht: "100vh" }} justify="center" align="center">
        {data && 
            <Card css={{ mw: "400px" }} color={"success"}>
            <p>{data}</p>
            </Card>
        }
        </Row>        
    </Container>
  );
};

export default QRScanner;
