import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter} from "react-router-dom";
 
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./redux/store.ts";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <Provider store={store}>
         <App />
        </Provider> 
      </ThemeProvider> 
    </StrictMode>
  </BrowserRouter>
);
