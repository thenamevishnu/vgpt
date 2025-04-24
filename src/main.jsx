import { Fragment } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { Toaster } from "react-hot-toast"
import "./index.css"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./Redux/store"
import { Provider } from "react-redux"

const root = createRoot(document.getElementById("root"))

root.render(<PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
        <App />
        <Toaster toastOptions={{
            duration: 2000
        }}/>
    </Provider>
</PersistGate>)