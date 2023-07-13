export const backendURL = () => {
  if (!window.location.pathname.includes("production")) {
    return `http://localhost:8080/api/v1`;
  } else {
    return `https://usprojbe-production.up.railway.app/api/v1`;
  }
};
