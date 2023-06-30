import axios from "axios";
import appendSerialNumber from "./apiCallAppenders";

const baseURI = "http://localhost:8080/api/v1";
export const getCallWithHeaders = async (endpoint) => {
  try {
    let apiResponse = await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
      },
      method: "get",
      url: `${baseURI}/${endpoint}`,
    });
    console.log(apiResponse);
    return appendSerialNumber(apiResponse.data.data);
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
