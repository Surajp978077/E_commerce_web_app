import React, { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "./userInfo/UserInfoContext";
import { vendorInstance } from "../api/axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Home() {
  const [vendor, setVendor] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isVendorCreated, setIsVendorCreated] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const id = userInfo.UserId;
  // console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vendorInstance.get(`/${id}`);
        if (response && response.data) {
          setVendor(response.data);
          setErrorMessage("got");
        }
      } catch (error) {
        setVendor(null);
        setErrorMessage(error.response.data.message);
        if (error.request.status === 404) {
          if (!isVendorCreated) {
            newVendor();
            setIsVendorCreated(true);
          }
        } else {
          setErrorMessage(
            "Error occurred while fetching vendor info, make sure API is working"
          );
        }
      }
    };
    const newVendor = async () => {
      try {
        const response = await vendorInstance.post(`/${id}`, {});
        setVendor(response.data);
        setErrorMessage("");
        console.log("post");
        setIsVendorCreated(true);
      } catch (error) {
        setVendor(null);
        setErrorMessage("Error occurred while creating new vendor");
      }
    };

    fetchData();
    // console.log(vendor);
  }, [id, isVendorCreated]);

  useEffect(() => {
    if (vendor && !userInfo.vendor) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        vendor: {
          vendorId: vendor.Id,
          GSTIN: vendor.GSTIN,
          DeliveryPinCode: vendor.DeliveryPinCode,
        },
      }));
    }
  }, [userInfo.vendor, vendor, setUserInfo]);
  if (errorMessage) {
    console.log(errorMessage);
  }
  function change(event) {
    // console.log(event.target.name + " : " + event.target.value);
    setVendor((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
    console.log(vendor.GSTIN);
  }
  const isAnyFieldNull =
    userInfo.vendor &&
    Object.values(userInfo.vendor).some(
      (value) => value === null || value === 0
    ); // to check if any field in vendor object is null or empty

  return (
    // <>
    //   <form>
    //     <input
    //       type="text"
    //       placeholder="Name"
    //       name="Name"
    //       onChange={change}
    //       value={vendor.Name}
    //     />
    //     <input
    //       type="text"
    //       placeholder="GSTIN"
    //       name="GSTIN"
    //       onChange={change}
    //       value={vendor.GSTIN}
    //     />
    //   </form>
    // </>

    <Container>
      <Row>
        {isAnyFieldNull ? (
          <Col xs={12} md={6}>
            <div style={{ width: "500px", height: "500px" }}>
              <h3>Update your GSTIN number</h3>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>GSTIN</Form.Label>
                  <Form.Control
                    placeholder="Enter GSTIN"
                    value={userInfo.vendor.GSTIN}
                    onChange={change}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" value={vendor.GSTIN}>
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        ) : null}
        <Col xs={12} md={6}>
          <div style={{ width: "500px", height: "500px" }}>
            <h3>Second div</h3>
            <Form>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

// console.log(vendor)

// {
//   "UserId": 6,
//   "UserName": "vendor",
//   "Email": "vendor@gmail.com",
//   "Password": "$2a$11$vPB0965eJYRvFLcOXS.QceiBQLNtctZP7nJnWiG9klFxAfA/USNSC",
//   "Role": "Vendor",
//   "Phone": "01234567890",
//   "AddressId": 5,
//   "Address": {
//       "AddressId": 5,
//       "Street": "sdf",
//       "City": "gagra",
//       "State": "avd",
//       "Pincode": "234567"
//   },
//   "vendor": {
//       "vendorId": 3,
//       "GSTIN": null,
//       "DeliveryPinCode": 0
//   }
// }
