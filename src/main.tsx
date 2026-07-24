import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import { AppDirectionProvider } from "@/components/direction-context"
import { I18nProvider } from "@/i18n/I18nProvider"
import "@/styles/globals.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <AppDirectionProvider>
          <App />
        </AppDirectionProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>
)
