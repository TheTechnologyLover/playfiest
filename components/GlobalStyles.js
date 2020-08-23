import React from "react";
import PropTypes from "prop-types";

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
		
};

GlobalStyles.propTypes = {
	children: PropTypes.node.isRequired
};

export default GlobalStyles;