export const ajax = async (url, requestMethod, jwt, requestBody) => {
  const fetchData = {
    headers: {
      "content-type": "application/json",
      //Authorization: `Bearer ${jwt}`,
    },
    method: requestMethod,
  };
  if (jwt) {
    fetchData.headers.Authorization = `Bearer ${jwt}`;
  }
  if (requestBody) {
    fetchData.body = JSON.stringify(requestBody);
  }
  const response = await fetch(url, fetchData);
  if (response.status === 200) return response.json();
};
