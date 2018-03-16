import React, { Component } from 'react';
import './App.css';
import data from './Data.js';
import face from './face_copy.png';
import * as Scroll from 'react-scroll';

let Link = Scroll.Link;

class Intro extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			type: 'visual'
		};
	}
	/*componentDidMount(){
		const types = ['visual','data','investigative'];
		let init = 1;
		
		setInterval(()=>{
			this.setState({
				type: types[init++ % types.length]
			})
		}, 3000)
	}*/

	render(){
		return(
			<div id="intro-cont">
				<div id="intro">
					<div id="intro-flex-left">
						<img src={face}></img>
					</div>
					<div id="intro-flex-right">
						<p id="intro-name">Sam Hart</p>
						<p><span id="journo">{this.state.type}</span> journalist</p>
						<Link to="projects" smooth={true}>Projects</Link>
						<Link to="writing" smooth={true}>Writing</Link>
					</div>
				</div>
			</div>

			)
	}
}
//list item component
class Item extends React.Component{
	render(){
		return (
			<div className="item-project">
				<p className="item-date"><span></span>{this.props.date}</p>
				<p><a href={this.props.url} target="_blank">{this.props.name}</a></p>
				
				<img src={this.props.image} />
			</div>
			);
	}
}
//generate list fromd data
class Projects extends React.Component {
	constructor(props){
		super(props);
		
			this.state = {
				projects:[],
			};	
	}
	componentDidMount(){	
		data.then(data => {
			this.setState({
				projects: data
			});
		})
	}
	render(){

		const thelist = this.state.projects.map((e, i) =>
			<Item 
				key={i} 
				name={e['project-name']}
				date={e['date']}
				image={e['image']}
				url={e['url']}
			/>
		);
		
		
		return (<div id="projects">{thelist}</div>);
	};
}
class Writing extends React.Component{
	render(){
		return (
			<div id="writing">
			</div>
		)
	}
}
//put it all together
class App extends React.Component {
	render(){
		return (
			<div id="container">
				<Intro />
				<Projects name="projects"/>
				<Writing name="writing"/>
			</div>)
	}
}

export default App;