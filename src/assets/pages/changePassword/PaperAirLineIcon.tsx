 import React from "react"

 interface IPaperAirLineIconProps {
  classNames?: string
}

 export const PaperAirLineIcon = ({ classNames }: IPaperAirLineIconProps) => {
    return (
      
        <svg  className={classNames} width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M91.0365 46.1838L2.0434 2.35302L18.7832 46.5245M91.0365 46.1838L2.45873 90.7327L18.7832 46.5245M91.0365 46.1838L18.7832 46.5245" stroke="#DCDDDD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
  }
