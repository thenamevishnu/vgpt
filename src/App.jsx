import { BrowserRouter, Route, Routes } from "react-router"
import { ChatPage } from "./pages/ChatPage"
import { HomePage } from "./pages/HomePage"

export const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="" Component={HomePage} />
                <Route path="chat">
                    <Route path=":chat_id" Component={ChatPage} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}