import axios from "axios";
import appendSerialNumber from "./apiCallAppenders";
import { failureNotification, successNotification } from "./notificationHelper";
import { backendURL } from "./config";

const baseURI = backendURL();

export const getCallWithHeaders = async (endpoint) => {
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "get",
      url: `${baseURI}/${endpoint}`,
    });
    if (!apiResponse.data.error) {
      successNotification(`${apiResponse.data.msg}`);
    } else {
      failureNotification(`${apiResponse.data.msg}`);
    }
    console.log(apiResponse);
    return appendSerialNumber(apiResponse.data.data);
  } catch (error) {
    console.log(error);
    failureNotification(`${error}`);
  }
};
export const getCallSpecificWithHeaders = async (endpoint, id) => {
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "get",
      url: `${baseURI}/${endpoint}/${id}`,
    });
    console.log(apiResponse);
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};

export const postCallWithHeaders = async (endpoint, data) => {
  console.log(data);
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "post",
      url: `${baseURI}/${endpoint}`,
      data: data,
    });
    console.log(apiResponse);
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};
export const postCallWithoutHeaders = async (endpoint, data) => {
  console.log(data);
  try {
    let apiResponse = await axios({
      method: "post",
      url: `${baseURI}/${endpoint}`,
      data: data,
    });
    console.log(apiResponse);
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};
export const editCallWithHeaders = async (endpoint, id, data) => {
  console.log(data);
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "put",
      url: `${baseURI}/${endpoint}/${id}`,
      data: data,
    });
    console.log(apiResponse);
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCallWithHeaders = async (
  endpoint,
  id,
  refresh,
  setRefresh
) => {
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "delete",
      url: `${baseURI}/${endpoint}/${id}`,
    });
    console.log(apiResponse);
    if (!apiResponse.data.error) {
      successNotification(apiResponse.data.msg);
      setRefresh(!refresh);
    } else {
      failureNotification(apiResponse.data.msg);
    }
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};
