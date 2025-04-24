import { TbLayoutSidebarRightExpand, TbPlus, TbTrash } from "react-icons/tb"
import { HiBars3BottomLeft } from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { IoClose, IoEllipsisVertical } from "react-icons/io5";
import { useState } from "react";
import { removeChat } from "../Redux/chats.slice";

export const SideBar = ({ isOpen, setIsOpen }) => {

    const { list } = useSelector(state => state.chats);
    const [isMenuOpen, setIsMenuOpen] = useState("")
    const redirect = useNavigate()
    const dispatch = useDispatch()

    const handleNewChat = () => {
        setIsOpen(false)
        const id = crypto.randomUUID()
        redirect(`/chat/${id}`)
    }

    return <div className={`h-screen fixed top-0 left-0 z-[1] overflow-x-hidden duration-300 ease-linear max-w-[300px] ${isOpen ? "w-full px-2" : "w-0"} bg-secondary py-2`}>
        <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-widest text-start">VGPT</h1>
            <div>
                <TbLayoutSidebarRightExpand size={20} onClick={() => setIsOpen(false)} cursor={"pointer"}/>
            </div>
        </div>
        <div className="mt-5">
            <button onClick={handleNewChat} className="flex cursor-pointer items-center p-2 rounded-full hover:bg-white/10 px-3">
                <div>
                    <TbPlus /> 
                </div>
                New Chat
            </button>
            <h3 className="mt-8">Recent</h3>
            <div className="mt-4 w-full flex flex-col">
                {
                    list.map(item => {
                        return <div key={item.id} className="flex justify-between rounded-full w-full items-center hover:bg-white/10">
                            <div className="p-2">
                                <HiBars3BottomLeft /> 
                            </div>
                            <div key={item.chat_id} onClick={() => {
                                setIsOpen(false)
                                redirect(`/chat/${item.chat_id}`)
                            }} className="truncate p-2 cursor-pointer w-full">{item.title?.slice(0,10)}...</div>
                            <div className="p-2 relative">
                                {
                                    isMenuOpen == item.chat_id ? <IoClose cursor={"pointer"} onClick={() => setIsMenuOpen("")}/> : <IoEllipsisVertical cursor={"pointer"} onClick={() => setIsMenuOpen(item.chat_id)}/>
                                }
                                <div className={`absolute right-6 top-0.5 ${isMenuOpen == item.chat_id ? "flex" : "hidden"}`}>
                                    <div onClick={()=>dispatch(removeChat(item.chat_id))} className="p-1 px-2 bg-red-500/90 flex cursor-pointer items-center gap-1 rounded text-sm"><TbTrash /> Delete</div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}