import React from "react";
import GlobalStyles from "../components/GlobalStyles";

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
	return (
		<GlobalStyles>
			<Component {...pageProps} /> 
		</GlobalStyles>
	);
};


export default MyApp;