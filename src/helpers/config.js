export const backendURL = () => {
  if (window.location.origin.includes("localhost")) {
    return `http://localhost:8080/api/v1`;
  } else {
    return `https://manpowerbiz-6e2e73b308c8.herokuapp.com/api/v1`;
  }
};
