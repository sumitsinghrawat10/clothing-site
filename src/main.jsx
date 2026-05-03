import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from './redux/store';

// import { PublicClientApplication } from "@azure/msal-browser"
// import { MsalProvider } from "@azure/msal-react"
// import { msalConfig } from './authConfig.js';

// const msalInstance = new PublicClientApplication(msalConfig)
// await msalInstance.initialize();

createRoot(document.getElementById("root")).render(
  <StrictMode>

       {/* <MsalProvider instance={msalInstance}> */}
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
       {/* </MsalProvider> */}

  </StrictMode>,
);
