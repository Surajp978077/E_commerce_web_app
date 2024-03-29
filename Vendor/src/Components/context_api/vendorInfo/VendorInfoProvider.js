import { React, useContext, useEffect, useState } from "react";
import { VendorInfoContext } from "./VendorInfoContext";
import { UserInfoContext } from "../userInfo/UserInfoContext";
import { QCInstance, vendorInstance } from "../../../api/axios";
import LoadingScreen from "../../Common/LoadingScreen";
import ErrorPage from "../../Common/ErrorPage";

function VendorInfoProvider(props) {
  const {
    userInformation,
    setUserInformation,
    setUserInfoUpdated,
    userInfoUpdated,
  } = useContext(UserInfoContext);
  const [isVendorCreated, setIsVendorCreated] = useState(false); // to avoid creating new vendor more then once
  const [vendor, setVendor] = useState(null);
  const [isVendorSet, setIsVendorSet] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [rejectedStatusCount, setRejectedStatusCount] = useState();
  const [pendingStatusCount, setPendingStatusCount] = useState();
  const [userInfo, setUserInfo] = useState(userInformation);
  useEffect(() => {
    setUserInfo(userInformation);
  }, [userInformation]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vendorInstance.get(`/${userInfo.UserId}`);
        if (response && response.data) {
          setVendor(response.data);
          setIsVendorSet(false);
          setErrorMessage(null);
        }
      } catch (error) {
        setVendor(null);
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
        const errorMessage = error.response?.data?.message
          ? `Error: ${error.response.data.message}`
          : error.message;
        setErrorMessage(errorMessage);
      }
    };
    const newVendor = async () => {
      try {
        // Posting the new vendor data in database by using the user id column
        const response = await vendorInstance.post(`/${userInfo.UserId}`, {
          name: userInfo.UserName,
        });
        setVendor(response.data);
        setIsVendorCreated(true);
        setErrorMessage(null);
      } catch (error) {
        setVendor(null);
        setErrorMessage("Error occurred while creating new vendor");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.UserId, isVendorCreated]);

  // Had to seperate these two useeffect because of async behaviour of post and get methods of JS
  useEffect(() => {
    const updateUserInfo = () => {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        vendor: {
          VendorId: vendor.Id,
          VendorName: vendor.Name,
          GSTIN: vendor.GSTIN,
          DeliveryPinCode: vendor.DeliveryPinCode,
        },
      }));
      setIsVendorSet(true);
    };

    if (
      (vendor &&
        JSON.stringify(userInfo.vendor) !== JSON.stringify(vendor) &&
        !isVendorSet) ||
      userInfoUpdated
    ) {
      updateUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor, setUserInfo, isVendorSet, isVendorCreated, userInformation]);

  useEffect(() => {
    const listingPendingStatus = async () => {
      if (vendor) {
        try {
          const response = await QCInstance.get(`/count-rejected/${vendor.Id}`);
          if (response.status === 200 && response.data) {
            setRejectedStatusCount(response.data.rejectedCount);
            setPendingStatusCount(response.data.pendingCount);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    listingPendingStatus();
  }, [vendor]);

  if (errorMessage) {
    return <ErrorPage desc={errorMessage} />;
  }

  if (!userInfo.vendor) {
    return <LoadingScreen />;
  }

  return (
    <VendorInfoContext.Provider
      value={{
        setIsVendorSet,
        setVendor,
        vendor,
        userInfo,
        setUserInfo,
        rejectedStatusCount,
        setRejectedStatusCount,
        pendingStatusCount,
        setUserInfoUpdated,
        setUserInformation,
      }}
    >
      {props.children}
    </VendorInfoContext.Provider>
  );
}

export default VendorInfoProvider;
