export const ajax = (url, requestMethod, jwt, requestBody) => {
  const fetchData = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    method: requestMethod,
  };
  if (jwt) {
    fetchData.headers.Authorization = `Bearer ${jwt}`;
  }
  if (requestBody) {
    fetchData.body = JSON.stringify(requestBody);
  }
  return fetch(url, fetchData).then((response) => {
    if (response.status === 200) return response.json();
  });
};
