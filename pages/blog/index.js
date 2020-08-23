import React, { Component } from "react";
import WPAPI from "wpapi";
import PropTypes from "prop-types";
import Link from "next/link";


const wp = new WPAPI({ 

	endpoint: 
		typeof(process.env.WORDPRESS_API_URL) == "string" ? 
			process.env.WORDPRESS_API_URL : 
			""  

});


class Blog extends Component {

	static async getInitialProps() {
		try {
			const posts = await wp.posts().embed();
			return { posts };

		} catch (err) {
			return [err];
		}
	}
	
	render() {

		const { posts } = this.props;

		const fposts = posts.map( ( post ) => {
			return (
				<div  key={post.slug}>
					<Link
						as={`/blog/${post.slug}`}
						href={`/post?slug=${post.slug}&apiRoute=post`}
					>
						<div>
							<h1>{ post.title.rendered }</h1>
							{ post.content.rendered }
						</div>
						
					</Link>
				</div>
			);
		});

		return (
			<>
				{ fposts }
			</>
		);
	}
}


Blog.propTypes = {
	posts: PropTypes.array.isRequired
};

export default Blog;