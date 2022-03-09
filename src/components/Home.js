import { React, useState } from "react";
// Components
import Data from "./Data";
// CSS
import "../css/home.css";
// Bootstrap
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Constants
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Candy Machine settings
const defaultCM = {
  price: 2.0,
  number: 10,
  gatekeeper: null,
  solTreasuryAccount: "",
  splTokenAccount: null,
  splToken: null,
  goLiveDate: "25 Dec 2021 00:00:00 GMT",
  endSettings: null,
  whitelistMintSettings: null,
  hiddenSettings: null,
  storage: "arweave-sol",
  ipfsInfuraProjectId: null,
  ipfsInfuraSecret: null,
  nftStorageKey: null,
  awsS3Bucket: null,
  noRetainAuthority: false,
  noMutable: false,
};

const URL = "http://127.0.0.1:3001/cm";

const Home = () => {
  //States
  const [cm, setCM] = useState(defaultCM);
  const [data, setData] = useState(null);
  // Project Specific
  const [project, setProject] = useState({ name: "" });

  // Functions
  const convertDate = (e) => {
    const name = e.target.name;
    const date = e.target.value;
    console.log("Name: ", name);
    console.log("Value: ", date);

    var [year, month, day_Time] = date.split("-");
    var [day, hour_minutes, minutes] = day_Time.split("T");
    var seconds = "00";
    let newDateTime = `${day} ${
      MONTH_NAMES[month - 1]
    } ${year} ${hour_minutes}:${seconds}`;

    setCM({ ...cm, [name]: newDateTime });
  };

  const formChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("Name: ", name);
    console.log("Value: ", value);

    setCM({ ...cm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CM on submit: ", JSON.stringify(cm, null, 2));
    // Send the data to the backend
    const response = await fetch(URL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(cm),
    });
    const cmData = await response.json();
    console.log("Cm data: ", cmData);
    setData(cmData);
  };

  return (
    <Container className="home">
      <Form>
        <Row className="justify-content-md-center">
          <Col xs lg="auto">
            <p className="fs-1">Candy Machine Details</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridNFTPrice">
            <Form.Label>NFT Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder={defaultCM.price}
              onChange={formChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNFTAmount">
            <Form.Label>Number of NFTs</Form.Label>
            <Form.Control
              type="number"
              name="number"
              placeholder={defaultCM.number}
              onChange={formChange}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridTreasuryAccount">
          <Form.Label>Treasury Account</Form.Label>
          <Form.Control
            type="text"
            name="solTreasuryAccount"
            placeholder="DyB8u5uRSKjjgkA5UMtCG2LRXGPZNqZzCqZEuK3kW6Wc"
            onChange={formChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridGoLiveDate">
          <Form.Label>
            Date and time for the Candy Machine to go live
          </Form.Label>
          <Form.Control
            type="datetime-local"
            name="goLiveDate"
            onChange={convertDate}
          />
        </Form.Group>

        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Load your assets + json (Coming soon)</Form.Label>
          <Form.Control type="file" size="lg" disabled />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      {data ? <Data data={data} /> : <div>No Data</div>}
    </Container>
  );
};

export default Home;
