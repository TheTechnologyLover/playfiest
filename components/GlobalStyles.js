import React from "react";
import PropTypes from "prop-types";

const GlobalStyles = ({ children }) => {
	return(
		<>
			{ children }

			<style global jsx>{`

				:root {
					--primary: #F15000;
					--background: #080A0E;
					--white: #f2f2f2;
				}

				body {
					background-color: var(--background);
					color: var(--white)
				}
			
			`}</style>
		</>
	);
		
};

GlobalStyles.propTypes = {
	children: PropTypes.node.isRequired
};

export default GlobalStyles;