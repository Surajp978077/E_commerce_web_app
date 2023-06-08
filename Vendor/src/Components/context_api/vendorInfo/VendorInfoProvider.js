import { React, useContext, useEffect, useState } from "react";
import { VendorInfoContext } from "./VendorInfoContext";
import { UserInfoContext } from "../userInfo/UserInfoContext";
import { vendorInstance } from "../../../api/axios";
import LoadingScreen from "../../LoadingScreen";
import ErrorPage from "../../ErrorPage";
function VendorInfoProvider(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [isVendorCreated, setIsVendorCreated] = useState(false); // to avoid creating new vendor more then once
  const [vendor, setVendor] = useState(null);
  const [isVendorSet, setIsVendorSet] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vendorInstance.get(`/${userInfo.UserId}`);
        if (response && response.data) {
          setVendor(response.data);
          setIsVendorSet(false);
        }
      } catch (error) {
        console.log(error);
        setVendor(null);
        const errorMessage = error.response?.data?.message
          ? `Error: ${error.response.data.message}`
          : error.message;
        setErrorMessage(errorMessage);

        if (error.request.status === 404) {
          if (!isVendorCreated) {
            // to avoid creating new vendor more then once
            newVendor();
            setIsVendorCreated(true);
          }
        } else {
          setErrorMessage(
            error.response.status +
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
        setIsVendorCreated(true);
      } catch (error) {
        setVendor(null);
        setErrorMessage("Error occurred while creating new vendor");
      }
    };
    fetchData();
  }, [userInfo.UserId, isVendorCreated]);

  // Had to seperate these two useeffect because of async behaviour of post and get methods of JS
  useEffect(() => {
    const updateUserInfo = () => {
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
  }, [vendor, setUserInfo, isVendorSet, isVendorCreated]);

  if (errorMessage) {
    return <ErrorPage desc={errorMessage} />;
  }

  if (!userInfo.vendor) {
    return <LoadingScreen />;
  }

  return (
    <VendorInfoContext.Provider
      value={{ setIsVendorSet, setVendor, vendor, userInfo }}
    >
      {props.children}
    </VendorInfoContext.Provider>
  );
}

export default VendorInfoProvider;
