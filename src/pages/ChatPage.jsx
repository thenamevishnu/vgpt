import { gemini } from "../Lib/Gemini";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loading } from "../components/Loading";
import { IoSendOutline } from "react-icons/io5";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import MarkdownWithHighlight from "../components/MarkdownHighlight";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../Redux/chats.slice";
import { SideBar } from "../components/SideBar";
import { getThreePrompts, prompts } from "../constants/prompts";

export const ChatPage = () => {

    const { chat_id } = useParams();
    const promptList = useMemo(() => getThreePrompts(), [])
    const {chats} = useSelector(state => state.chats);
    const [messages, setMessages] = useState([]);
    const [isThinking, setIsThinking] = useState(false);
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef(null);
    const [isLoaded, setLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setLoaded(false)
        setMessages(chats.filter(chat => chat.chat_id == chat_id))
        setLoaded(true)
    }, [chat_id, chats])

    const handleFormSubmit = useCallback(async (e) => {
        if(isThinking) return;
        e.preventDefault();
        const value = e.target.message.value?.trim().replace(/[\s\n]+$/g, "");
        if(!value) return;
        setQuery("");
        setIsThinking(true);
        let completed_response = ""
        const id = crypto.randomUUID();
        setMessages(messages => [...messages, { text: value, id, chat_id, is_user: true }])
        await gemini.ask(value, (text, id) => {
            if (text) {
                setMessages(messages => {
                    const newMessages = [...messages];
                    const index = newMessages.findIndex(message => message.id === id);
                    if (index !== -1) {
                        newMessages[index].text += text;
                    } else {
                        newMessages.push({ text, id, chat_id, is_user: false });
                    }
                    completed_response += text
                    return newMessages;
                })
            }
        }, id => {
            dispatch(addChat([{text: value, id, chat_id, is_user: true}, { text: completed_response, id, chat_id, is_user: false }]));
            setIsThinking(false);
        })
    }, [query])

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTo({top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [messages])

    return <div className={`flex px-2 tracking-wide flex-col sm:px-5 pt-10 gap-1 items-center h-screen ${isLoaded && messages.length == 0 && "justify-center"}`}>
        <Header setIsOpen={setIsOpen}/>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        {isLoaded && messages.length > 0 && <div ref={scrollRef} className="h-full overflow-y-auto break-words w-full max-w-[850px] px-2">
            {
                messages && messages.map((message, index) => {
                    return <div key={index} className={`flex w-full ${message.is_user ? "justify-end" : "justify-start"} gap-2 my-2`}>
                        <div className={`${message.is_user && "bg-secondary"} p-2 rounded-xl text-wrap ${!message.is_user && "w-full"} max-w-[850px]`}>
                            <div className="whitespace-pre-wrap break-words w-full rounded-xl" ><MarkdownWithHighlight content={message.text}/></div>
                        </div>
                    </div>
                })
            }
            {
                isThinking && <div className="flex w-full justify-start gap-2 my-2">
                    <div className="p-2 rounded-xl overflow-x-scroll max-w-[500px]">
                        <Loading />
                    </div>
                </div>
            }
        </div>}
        {
            isLoaded && messages.length == 0 && <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-2">What can I help with?</h2>
                <div className="grid my-2 grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 max-w-[700px]">
                    {
                        promptList.map((item, idx) => {
                            return <div key={idx} onClick={() => {
                                setQuery(item)
                                handleFormSubmit({ target: { message: { value: item } }, preventDefault: () => { } })
                            }} className="text-center bg-secondary p-2 rounded-xl cursor-pointer">
                                {item.length < 50 ? item : item.slice(0, 50) + "..." }
                            </div>
                        })
                    }
                </div>    
            </div>
        }
        <form onSubmit={handleFormSubmit} className={`w-full mb-2 bg-white/10 flex max-w-[824px] items-end rounded-xl`}>
            <textarea onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleFormSubmit({ target: { message: { value: e.target.value } }, preventDefault: () => { } })
                }
            }} onChange={(e) => setQuery(e.target.value)} value={query} rows={3}  placeholder="Ask Anything" name="message" className="resize-none p-2 rounded-xl bg-transparent w-full"></textarea>
            <div className="p-2 flex justify-between items-center gap-2">
                {!isThinking && <IoSendOutline size={25} className="text-white cursor-pointer" />}
            </div>
        </form>
    </div>
}