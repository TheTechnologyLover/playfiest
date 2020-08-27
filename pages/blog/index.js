import React, { Component } from "react";
import WPAPI from "wpapi";
import PropTypes from "prop-types";
import Link from "next/link";
import Layout from "../../components/Layout";
import { PageWrapper } from "../../components";
import Grid from "../../components/layout/grid/Grid";
import styled from "styled-components";
import Moment from "react-moment";
import "moment-timezone";

const wp = new WPAPI({ 

	endpoint: 
		typeof(process.env.WORDPRESS_API_URL) == "string" ? 
			process.env.WORDPRESS_API_URL : 
			""  

});


// const Header = styled.div`
// 	width: 100%;
// 	height: 100vh;
// `;

// const TextStroke = styled.div`
// 	text-transform: uppercase;
// 	font-weight: 700;
// 	position: absolute;
// 	z-index: 0;
// 	top: 100px;
// 	& span {
// 		line-height: 200px;
// 		font-size: 250px;
// 		display: block;
// 		-webkit-text-fill-color: transparent;
// 		-webkit-text-stroke-width: 1px;
// 		-webkit-text-stroke-color: #212932;
// 	}

// 	@media( max-width: 900px ) {
// 		& span {
// 			line-height: 70px;
// 			font-size: 80px;
// 		}
// 	}
// `;

// const HeadText = styled.div`
// 	text-transform: uppercase;
// 	font-weight: 700;
// 	position: relative;
// 	z-index: 0;
// 	top: 150px;
// 	& h1 {
// 		font-size: 125px;
// 		z-index: 1;
// 		text-transform: uppercase;
// 		font-weight: 700;
// 		margin: 100px 80px;
// 	}

// 	@media( max-width: 900px ) {
// 		& h1 {
// 			font-size: 75px;
// 			margin: 0;
// 		}
// 	}
// }
// `;

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

const PostTitle = styled.h2`
	font-size: 38px;
	margin-top: 15px;
	color: #fff;
	cursor: pointer;
`;

const Ahref = styled.a`
	font-size: 20px;
	font-weight: 700;
	background: -webkit-linear-gradient(90deg, rgba(241,80,0,1) 0%, rgba(243,139,4,1) 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	cursor: pointer;
`;


const Post = styled.div`
	padding: 45px 0;
`;

class Blog extends Component {

	static async getInitialProps() {
		try {
			const posts = await wp.posts().embed();
			console.log(posts);
			return { posts };

		} catch (err) {
			return [err];
		}
	}
	
	render() {

		const { posts } = this.props;

		const fposts = posts.map( ( post ) => {
			
			return (
				<Post key={post.slug}>
					
					<div>

						<div>
							<PrimaryCategory>Story</PrimaryCategory>
							<Date><Moment format="LL">{ post.date }</Moment></Date>
						</div>
						<Link
							as={`/blog/${post.slug}`}
							href={`/post?slug=${post.slug}&apiRoute=post`}
						>
							<PostTitle>{ post.title.rendered }</PostTitle>
						</Link>

						<div 
							dangerouslySetInnerHTML={{
								__html: post.excerpt.rendered,
							}}
						/>
						<Link
							as={`/blog/${post.slug}`}
							href={`/post?slug=${post.slug}&apiRoute=post`}
						><Ahref>Read Article</Ahref></Link>

					</div>
							
				</Post>
			);
		});

		return (
			<Layout
				title={ "Blog" }
				description={ "This is Blog" }
			>
				{/* <Header>
					<TextStroke>
						<span>We are team</span>
						<span>PlayFiest</span>
					</TextStroke>
					<HeadText>
						<h1>Blog</h1>
					</HeadText>
				</Header> */}
				<PageWrapper>
					<Grid>
						<Grid item md={7}>
							{ fposts }
						</Grid>
					</Grid>
				</PageWrapper>
			</Layout>
		);
	}
}


Blog.propTypes = {
	posts: PropTypes.array.isRequired
};

export default Blog;