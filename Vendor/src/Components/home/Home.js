import React, { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "../userInfo/UserInfoContext";
import { vendorInstance } from "../../api/axios";
import { Container, Row } from "react-bootstrap";
import VendorForm from "./VendorForm";

function Home() {
  const [vendor, setVendor] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isVendorCreated, setIsVendorCreated] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  // const id = userInfo.UserId;
  // console.log(id);
  const [nullFields, setNullFields] = useState([]);
  const [vendorFields, setVendorFields] = useState([]);
  const [isAnyFieldNull, setIsAnyFieldNull] = useState(false);
  const [isVendorSet, setIsVendorSet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vendorInstance.get(`/${userInfo.UserId}`);
        if (response && response.data) {
          setVendor(response.data);
          console.log("vendor");
          setIsVendorSet(false);
          setErrorMessage("got");
        }
      } catch (error) {
        setVendor(null);
        setErrorMessage(error.response.data.message);
        if (error.request.status === 404) {
          if (!isVendorCreated) {
            console.log("new vendor");
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
        // Posting the new vendor data in database by using the user id column
        const response = await vendorInstance.post(`/${userInfo.UserId}`, {});
        setVendor(response.data);
        console.log("post");
        setIsVendorCreated(true);
      } catch (error) {
        setVendor(null);
        setErrorMessage("Error occurred while creating new vendor");
      }
    };

    fetchData();
    // console.log(vendor);
  }, [userInfo.UserId, isVendorCreated]);

  // Had to seperate these two useeffect because of async behaviour of post and get methods of JS
  useEffect(() => {
    const updateUserInfo = () => {
      console.log("setting vendor in userinfo");
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        vendor: {
          vendorId: vendor.Id,
          GSTIN: vendor.GSTIN,
          DeliveryPinCode: vendor.DeliveryPinCode,
        },
      }));
      setIsVendorSet(true);
    };

    if (
      vendor &&
      JSON.stringify(userInfo.vendor) !== JSON.stringify(vendor) &&
      !isVendorSet
    ) {
      updateUserInfo();
    }

    console.log("second useeffect");
    // Calculate nullFields with updated values
    const fields = userInfo.vendor ? Object.keys(userInfo.vendor) : [];
    const nullFields = fields.filter(
      (field) => userInfo.vendor[field] === null || userInfo.vendor[field] === 0
    );

    // Set the updated values in state
    setVendorFields(fields);
    setNullFields(nullFields);
    setIsAnyFieldNull(
      userInfo.vendor &&
        Object.values(userInfo.vendor).some(
          (value) => value === null || value === 0
        )
    );
  }, [userInfo.vendor, vendor, isVendorSet, setUserInfo]);

  if (errorMessage) {
    console.log(errorMessage);
  }
  console.log(nullFields);
  console.log(vendor);
  console.log(userInfo);

  return (
    <Container>
      <Row>
        {isAnyFieldNull
          ? nullFields.map((field) => (
              <VendorForm
                field={field}
                key={field}
                label={field}
                value={userInfo.vendor[field]}
                setVendor={setVendor}
                vendor={vendor}
                setIsVendorSet={setIsVendorSet}
              />
            ))
          : null}
      </Row>
    </Container>
  );
}

export default Home;
