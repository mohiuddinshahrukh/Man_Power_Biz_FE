import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MantineProvider
    theme={{ colorScheme: "dark" }}
    withGlobalStyles
    withNormalizeCSS
  >
    <Notifications />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
  // </React.StrictMode>
);
