import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

export const Header = ({ setIsOpen }) => {
    return <div className="fixed top-0 px-2 sm:px-5 h-10 bg-primary w-full flex justify-between items-center">
        <div>
            <TbLayoutSidebarLeftExpand size={20} onClick={() => setIsOpen(true)} cursor={"pointer"}/>
        </div>
    </div>
}