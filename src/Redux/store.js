import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { chatReducer } from "./chats.slice";
import { configureStore } from "@reduxjs/toolkit";

const persistConfigChats = {
    key: "chats",
    storage
}

const persistedChatsReducer = persistReducer(persistConfigChats, chatReducer)

export const store = configureStore({
    reducer: {
        chats: persistedChatsReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ["persist/PERSIST"]
        }
    })
})

export const persistor = persistStore(store)