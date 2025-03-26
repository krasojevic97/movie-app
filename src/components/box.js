import {useState} from 'react';

export default function Box({children, nightMode}){
    
    const buttonStyle= {
        border:"none",
                padding:"1px",
                borderRadius:"10px",
                width:"20px",
                height:"20px",
                justifySelf:"right",
                top:'10px',
                right:'20px',
                cursor:'pointer'
    }
    
    const [isOpen, setIsOpen] = useState(true);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <section className={`movie-wrapper ${nightMode ? "dark-mode-background":""}`}>  
           {children}
        </section>
    )
}