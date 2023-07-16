export const backendURL = () => {
  console.log("Pathname: ", window.location);
  if (window.location.origin.includes("localhost")) {
    return `http://localhost:8080/api/v1`;
  } else {
    return `https://usprojbe-production.up.railway.app/api/v1`;
  }
};
