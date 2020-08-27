import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Div = styled.div`
	margin:  auto;
    max-width: 1520px;
    width: 100%;
    display: flex;
	flex-wrap: wrap;
	@media( max-width: 960px ) {
		padding: 0 20px;
	}
`;

const Content = styled.div`
    flex: 0 0 100%;
	position: relative;
`;

class PageWrapper extends Component {
	render() {
		return (
			<Div>
				<Content>
					{ this.props.children }
				</Content>
			</Div>
		);
	}
}


PageWrapper.propTypes = {
	children: PropTypes.node.isRequired
};

export default PageWrapper;
