import { useEffect } from "react";
import { useNavigate } from "react-router";

export const HomePage = () => {

    const redirect = useNavigate()

    useEffect(() => {
        redirect(`/chat/${crypto.randomUUID()}`)
    }, [])

    return null
}