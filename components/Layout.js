import React, { Component } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import NavBar from "./partials/NavBar";
import styled, { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
	:root {
		--primary: #F15000;
		--background: #080A0E;
		--white: #f2f2f2;
	}

	* {
		font-family: atten-new, sans-serif;
		letter-spacing: 0.05em
	}

	body {
		background-color: var(--background);
	}

	body::-webkit-scrollbar {
		width: 8px;
		background-color: var(--background);
	}
	   
	body::-webkit-scrollbar-track {
		box-shadow: none
	}
	   
	body::-webkit-scrollbar-thumb {
		background: rgb(241,80,0);
		background: linear-gradient(0deg, rgba(241,80,0,1) 0%, rgba(243,139,4,1) 100%);
		border-radius: 4px 0 4px 0;
	}

	h1 {
		font-family: solano-gothic-pro-mvb, sans-serif;
		font-weight: 700;
		font-style: normal;
	}

	p {
		font-size: 20px;
		line-height: 1.8
	}
`;


const Root = styled.div`
	width: 100%;
	min-height: 100vh;
	background-color: var(--background);
	color: var(--white);	
`;

const Main = styled.div`
	margin-top: 150px;
`;

class Layout extends Component {
	render() {

		const { children, title, description } = this.props;

		return (
			<>
				<GlobalStyle />
				<Root>
					<Head>
						<meta name="theme-color" content="#080A0E" />
						<link rel="manifest" href="manifest.json" />
						<link rel="stylesheet" href="normalize.css" />
						<link rel="stylesheet" href="https://use.typekit.net/foo3tmk.css" />
						<link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,200;0,400;0,600;0,700;1,300&display=swap" rel="stylesheet" />

						{/* SEO Tags */}
						<title> { title } | PlayFiest</title>
						<meta name="description" content={description} />

					</Head>

					<NavBar />

					<Main>
						{ children }
					</Main>
				</Root>
			</>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

export default Layout;
