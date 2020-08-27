import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../";


import Burger from "@animated-burgers/burger-squeeze";
import "@animated-burgers/burger-squeeze/dist/styles.css";


const Nav = styled.div`
	padding: 30px 0;
	background-color: var(--background);
	position: fixed;
	top: 0;
	left:0;
	right: 0;
	z-index: 999;
`;

const Flex = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Logo = styled.div`
	width: 175px;
	height: auto;
	display: block;
`;



const DesktopMenu = styled.ul`
	list-style: none;
	display: block;

	& li {
		display: inline;
		margin-left: 50px;
		font-size: 20px;
	}

	@media( max-width: 960px ) {
		display: none;
	}
`;


const MobileMenu = styled.div`
	list-style: none;
	display: none;
	font-size: 20px;
	position: relative;

	& .burger {
		margin-left: 30px;
	}
	& > div {
		justify-content: flex-start;
	}

	@media( max-width: 960px ) {
		display: block;
		width: 80px;
		position: absolute;
		right: 0;
		transform: translateX(-100%);
	}
`;
const NavBar = () => {
	return (
		<Nav>
			<PageWrapper>
				<Flex>
					<Logo>
						<img src="logo-text.svg" alt="PlayFiest Logo" />
					</Logo>

					<DesktopMenu>
						<li>Home</li>
						<li>Blog</li>
						<li>About</li>
						<li>Contact</li>
					</DesktopMenu>


					<MobileMenu>
						<Flex>
							<div>Blog</div>
							<div><Burger isOpen={ false } /></div>
						</Flex>
					</MobileMenu>

				</Flex>
			</PageWrapper>
		</Nav>
	);
};

export default NavBar;