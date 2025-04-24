import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chats",
    initialState: {
        chats: [],
        list: []
    },
    reducers: {
        addChat: (state, action) => {
            state.chats = [...state.chats, ...action.payload]
            if (!state.list.some(item => item.chat_id == action.payload[0].chat_id)) {
                state.list = [{ id: crypto.randomUUID(), chat_id: action.payload[0].chat_id, title: action.payload[0].text }, ...state.list]
            }
        },
        removeChat: (state, action) => {
            state.chats = state.chats.filter(chat => chat.chat_id != action.payload)
            state.list = state.list.filter(chat => chat.chat_id != action.payload)
        }
    }
})

export const { addChat, removeChat } = chatSlice.actions;
export const { reducer: chatReducer } = chatSlice