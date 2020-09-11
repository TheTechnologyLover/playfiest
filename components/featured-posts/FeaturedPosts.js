import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Moment from "react-moment";
import "moment-timezone";


const PrimaryCategory = styled.span`
	font-size: 20px;
	font-weight: 700
`;

const Date = styled.span`
	font-size: 20px;
	opacity: 0.5;
	margin-left: 15px;
	font-weight: 300
`;

const Flex = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;

	@media( max-width: 900px ) {
		display: block;
		padding: 0;

		& .metaData {
			padding: 0 10px;
			margin-top: 15px
		}
	}
`; 

const Slider = styled.div`

	width: min(800px, 90%);
	margin: 0 auto;
	margin-top: -125px;
	& item {
		float: left
	}

	& h2 {
		width: 400px;
		line-height: 1.6;
		float: right;
		word-wrap: break-word;
		margin-top: 10px;
	}
	
	@media( max-width: 900px ) {
	}
`;

const HeaderImage = styled.div`
	width: 100%;
	height: 500px;
	background-image: url(${props => props.bg});
	background-size: cover;
	background-repeat: no-reapt;
	background-position: center;
	border: 1px solid #fff;
`;

class FeaturedPosts extends Component {

	constructor( props ) {

		super( props );

		this.state = {
			activePostIndex: 0
		};

	}

	handleNextSlide = () => {
		const noOfPosts = this.props.posts.length;
		const { activePostIndex } = this.state;

		if ( activePostIndex < noOfPosts - 1 )

			this.setState({
				activePostIndex: activePostIndex + 1
			});

		else 

			this.setState({
				activePostIndex: 0
			});
	}

	handlePrevSlide = () => {
		
		const noOfPosts = this.props.posts.length;
		const { activePostIndex } = this.state;

		if ( activePostIndex > 0 )

			this.setState({
				activePostIndex: activePostIndex - 1
			});

		else 

			this.setState({
				activePostIndex: noOfPosts - 1
			});

	}

	render() {

		const { posts } = this.props;
		const { activePostIndex } = this.state;


		const heroUrl = (
			posts[activePostIndex]._embedded &&
			posts[activePostIndex]._embedded["wp:featuredmedia"] &&
			posts[activePostIndex]._embedded["wp:featuredmedia"][0] &&
			posts[activePostIndex]._embedded["wp:featuredmedia"][0].source_url
		) ? posts[activePostIndex]._embedded["wp:featuredmedia"][0].source_url : false;


		return (
			<div>


				<Slider>
					{/* <HeaderImage bg={heroUrl} /> */}
					<HeaderImage bg={'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blta23632fd38fa91c1/5f447e3b7194ac0fc4c9f847/askval6_banner.jpg'} />
					<Flex>
						<div className="metaData">
							<PrimaryCategory>Story</PrimaryCategory>
							<Date><Moment format="LL">{ posts[activePostIndex].date }</Moment></Date>
						</div>
						<h2> { posts[activePostIndex].title.rendered} </h2>
					</Flex>
					{/* <button onClick={ this.handlePrevSlide }>Prev</button>
					<button onClick={ this.handleNextSlide }>Next</button> */}
				</Slider>
			</div>
		);
	}
}


FeaturedPosts.propTypes = {
	posts: PropTypes.array.isRequired
};


export default FeaturedPosts;