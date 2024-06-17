import { API_END_POINT, STATUS_CODES } from "../global/constant";

const getRequest = async (
  methodName: string,
  payload?: { [key: string]: string }
) => {
  let queryData;
  if (payload) {
    queryData = new URLSearchParams();

    for (let key in payload) {
      if (payload.hasOwnProperty(key)) {
        queryData.append(key, payload[key]);
      }
    }
  }

  queryData = queryData ? "?" + queryData : "";
  return fetch(API_END_POINT + "" + methodName + "" + queryData, {
    method: "GET",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => {
      if (res.status == STATUS_CODES.SUCCESS) return res.json();
      if (res.status == STATUS_CODES.NOT_FOUND)
        throw new Error("No Data found!!!");
      throw new Error("Something went wrong!!!");
    })
    .then((res) => {
      return res.responseData;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

const postRequest = async (
  methodName: string,
  payload: { [key: string]: string } | any
) => {
  return fetch(API_END_POINT + "" + methodName, {
    method: "POST",
    body: payload,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.responseData;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

const deleteRequest = async (
  methodName: string,
  payload?: { [key: string]: string }
) => {
  const urlencoded = new URLSearchParams(payload);
  return fetch(API_END_POINT + "" + methodName, {
    method: "DELETE",
    body: urlencoded,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.responseData;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

const putRequest = async (
  methodName: string,
  payload: { [key: string]: string }
) => {
  const urlencoded = new URLSearchParams(payload);

  return fetch(API_END_POINT + "" + methodName, {
    method: "PUT",
    body: urlencoded,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.responseData;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export { getRequest, postRequest, deleteRequest, putRequest };
