import React, { Component } from "react";
import WPAPI from "wpapi";
import PropTypes from "prop-types";
import Link from "next/link";
import Layout from "../../components/Layout";
import { PageWrapper, FeaturedPosts } from "../../components";
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


const Header = styled.div`
	width: 100%;
	padding: 0 0 50px;
`;

const TextStroke = styled.div`
	text-transform: uppercase;
	font-weight: 700;
	position: absolute;
	z-index: 0;
	top: 125px;
	& span {
		line-height: 200px;
		font-size: 250px;
		display: block;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: #212932;
	}

	@media( max-width: 900px ) {
		& span {
			line-height: 70px;
			font-size: 80px;
		}
	}
`;

const HeadText = styled.div`
	text-transform: uppercase;
	font-weight: 700;
	position: relative;
	z-index: 0;
	& h1 {
		font-size: 125px;
		z-index: 1;
		text-transform: uppercase;
		font-weight: 700;
	}

	@media( max-width: 900px ) {
		& h1 {
			font-size: 75px;
			width: 80%;
			word-wrap: break-down
		}
	}
}
`;

const PrimaryCategory = styled.span`
	font-size: 16px;
	font-weight: 700
`;

const Date = styled.span`
	font-size: 16px;
	opacity: 0.5;
	margin-left: 15px;
	font-weight: 300
`;

const PostTitle = styled.h2`
	margin-top: 15px;
	color: #fff;
	cursor: pointer;
`;

const Ahref = styled.a`
	font-weight: 700;
	background: -webkit-linear-gradient(90deg, rgba(241,80,0,1) 0%, rgba(243,139,4,1) 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	cursor: pointer;
`;


const Post = styled.div`
	padding: 15px 0;
	
	@media(min-width: 1200px) {
		position: relative;
		
		&:nth-child(2n) {
			right: 100px;
		}

		&:nth-child(2n - 1) {
			left: 100px;
		}
	}
`;

const Content = styled.div`
	padding: 50px 20px;
	position: relative;

	& .text {
		position: relative;
	}

	& .excerpt {
		font-size: 15px;
	}
`;

const PostBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url(
		${ props => props.bg }
	);
	background-repeat: no-repeat;
	background-size: cover;

	&:after {
		background: rgb(8,10,14);
		background: radial-gradient(circle, rgba(8,10,14,0.88) 0%, rgba(8,10,14,1) 75%);
		content: "";
		position: absolute;
		top: -0.5%;
		left: -0.5%;
		height: 101%;
		width: 101%;
	}
`;


class Blog extends Component {

	static async getInitialProps() {
		try {
			const [ posts, featuredPosts ] = await Promise.all([

				wp.posts().embed(),

				wp.categories().slug( "wordpress" )
					.then(function( cats ) {
						var featuredCat = cats[0];
						return wp.posts().categories( featuredCat.id ).embed();
					})

			]);

			return { posts, featuredPosts };

		} catch (err) {
			return [err];
		}
	}
	
	render() {

		const { posts, featuredPosts } = this.props;

		let allPosts = "";
		
		if ( posts ) {
			allPosts = posts.map( ( post ) => {

				const heroUrl = (
					post._embedded &&
					post._embedded["wp:featuredmedia"] &&
					post._embedded["wp:featuredmedia"][0] &&
					post._embedded["wp:featuredmedia"][0].source_url
				) ? post._embedded["wp:featuredmedia"][0].source_url : false;
				
				return (
					<Post key={post.slug}>
	
						<Content>					
						
							{
								heroUrl ? <PostBackground bg={ heroUrl } /> : ""
							}
	
							<div className="text">
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
	
								<div className="excerpt"
									dangerouslySetInnerHTML={{
										__html: post.excerpt.rendered,
									}}
								/>
								<Link
									as={`/blog/${post.slug}`}
									href={`/post?slug=${post.slug}&apiRoute=post`}
								><Ahref>Read Article</Ahref></Link>
							</div>
	
						</Content>
								
					</Post>
				);
			});
		}

		return (
			<Layout
				title={ "Blog" }
				description={ "This is Blog" }
			>
				<Header>
					<TextStroke>
						<span>We are team</span>
						<span>PlayFiest</span>
					</TextStroke>
					<PageWrapper>
						<HeadText>
							<h1>Featured Posts</h1>
						</HeadText>
						<FeaturedPosts posts={ featuredPosts } />
					</PageWrapper>
				</Header>
				<PageWrapper>
					<Grid>
						<Grid item md={3}>
							
						</Grid>
						<Grid item md={7}>
							{ allPosts }
						</Grid>
					</Grid>
				</PageWrapper>
			</Layout>
		);
	}
}


Blog.propTypes = {
	posts: PropTypes.array.isRequired,
	featuredPosts: PropTypes.array.isRequired
};

export default Blog;