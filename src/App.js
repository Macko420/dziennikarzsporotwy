import "./App.css";
import AppRoutes from "./routes";
import { HelmetProvider } from "react-helmet-async";

import { disableReactDevTools } from "@fvilers/disable-react-devtools"; // disable react dev tools

disableReactDevTools(); // disable react dev tools
function App() {
  const helmetContext = {};
  return (
    <>
      <HelmetProvider context={helmetContext} defer={true}>
        <AppRoutes />
      </HelmetProvider>
    </>
  );
}

export default App;
