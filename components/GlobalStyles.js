import React from "react";


const GlobalStyles = ({ children }) => {
    return(
        <>
            { children }

            <style global jsx>{`

                :root {
                    --primary: #000000
                }
            
            `}</style>
        </>
    );
}

export default GlobalStyles;