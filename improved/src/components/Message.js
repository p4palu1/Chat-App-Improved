import React, { useState } from 'react'

const Message = ({text, createdAt}) => {

    const [date, setDate] = useState(new Date(createdAt.seconds * 1000))
    return (
        <div>
                <span><strong>{text} </strong></span>
                <span> {date.toDateString()}</span>
                
        </div>
    )
}

export default Message