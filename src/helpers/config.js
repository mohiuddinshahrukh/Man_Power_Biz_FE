const flag = "dev";

export const backendURL = () => {
  if (flag === "dev") {
    return `http://localhost:8080/api/v1`;
  } else {
    return `https://usprojbe-production.up.railway.app/api/v1`;
  }
};
