"use client"
/*
This is a client component.
This toast component will wrap the entire app and provide a visually appealing way of displaying messages
*/

import { Toaster } from "react-hot-toast"

export const ToastProvider = () => {
    return <Toaster />;
}