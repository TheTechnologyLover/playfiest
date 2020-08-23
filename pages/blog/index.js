import React, { Component } from "react";
import WPAPI from "wpapi";
import PropTypes from "prop-types";


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
			console.log(err);
			return err;
		}
	}
	
	render() {

		const { posts } = this.props;
		const fposts = posts.map( ( post ) => {
			return (
				<div key={post.slug}>
					<h1>{post.title.rendered}</h1>
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