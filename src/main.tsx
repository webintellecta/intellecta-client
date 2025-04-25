import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider} from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={CLIENTID}>
        <App />
      </GoogleOAuthProvider>
      <ToastContainer 
      position="bottom-right"
      />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
