import React, { Component } from "react";
import PropTypes from "prop-types";
import  "./Grid.module.css";


class Grid extends Component {


	render() {

		if( this.props.item ) {

			let className = "";

			if ( this.props.xs )
				if (this.props.xs === "auto")
					className += ("col-xs ");
				else
					className += ("col-xs-" + this.props.xs + " ");

			if ( this.props.sm )
				if (this.props.sm === "auto")
					className += ("col-sm ");
				else
					className += ("col-sm-" + this.props.sm + " ");

			if ( this.props.md )
				if (this.props.md === "auto")
					className += ("col-md ");
				else
					className += ("col-md-" + this.props.md + " ");

			if ( this.props.lg )
				if (this.props.lg === "auto")
					className += ("col-lg ");
				else
					className += ("col-lg-" + this.props.lg + " ");

			className = className.substring( 0, className.length - 1 );

			return (
				<div className={className}>
					{ this.props.children }
				</div>
			);
		}


		/*
            justify
                - start
                - center
                - end
                - around
                - between
            alignItems
                - top
                - middle
                - bottom
        */

		let className = "row ";

		if ( this.props.reverse )
			className += ("reverse ");
		if ( this.props.justify )
			if ( this.props.justify === "start" || this.props.justify === "center" || this.props.justify === "around" || this.props.justify === "end" || this.props.justify === "between" )
				className += (this.props.justify + "-xs ");
		if ( this.props.alignItems )
			if ( this.props.alignItems === "top" || this.props.alignItems === "middle" || this.props.alignItems === "bottom" )
				className += (this.props.alignItems + "-xs ");

		className = className.substring( 0, className.length - 1 );


		return (

			<div className={className}>
				{ this.props.children }
			</div>
		);
	}
}


Grid.propTypes = {
	children: PropTypes.node.isRequired,
	item: PropTypes.bool,
	xs: PropTypes.number,
	lg: PropTypes.number,
	alignItems: PropTypes.string,
	justify: PropTypes.string,
	reverse: PropTypes.string,
	sm: PropTypes.number,
	md: PropTypes.number
};


export default Grid;