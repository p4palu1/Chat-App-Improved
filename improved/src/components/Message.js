import React, { useState, useContext } from 'react'
import { Image } from "react-bootstrap"
import { userContext } from "../context/context"

const Message = ({msg}) => {

    const { user, setUser } = useContext(userContext)

    return (
        <>
        { user.displayName === msg.displayName 
        ?   <div className="message bg-secondary rounded text-black-50 w-50 m-2 p-2 align-self-end text-end">
                <span className="m-1"><strong> {msg.displayName}</strong></span><Image src={msg.photoUrl} width="35px" roundedCircle />
                <div className="mr-4 mt-1 text-black"> {msg.text}</div>                
            </div> 
        :   <div className="message bg-light rounded text-black-50 w-50 m-2 p-2">
                <Image src={msg.photoUrl} width="35px" roundedCircle /><span className="m-1"><strong> {msg.displayName}</strong></span>
                <div className="ml-4 mt-1 text-black"> {msg.text}</div>                
            </div> 
        }
        </>
    )
}

export default Message