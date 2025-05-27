import React from "react"

export default function Button({ children, onClick, className = "", type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded transition ${className}`}
        >
            {children}
        </button>
    )
}