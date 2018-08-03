import React, { Component } from 'react';
import './App.css';
import data from './Data.js';
import face from './face_copy.png';
import * as Scroll from 'react-scroll';
import ResumePDF from './resume.pdf';

const d3 = Object.assign({}, require('d3-time-format'));

let Link = Scroll.Link;



class Intro extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			type: 'visual'
		};
	}
	componentDidMount(){
		const types = ['visual','data','digital'];
		let init = 1;
		
		setInterval(()=>{
			this.setState({
				type: types[init++ % types.length]
			})
		}, 3000)
	}

	render(){
		return(
			
				<div id="intro">
					<div id="intro-flex-left">
						<img src={face}></img>
					</div>
					<div id="intro-flex-right">
						<p id="intro-name">Sam Hart</p>
						<p><span id="journo">{this.state.type}</span> journalist</p>
						
					</div>
				</div>
			

			)
	}
}
//create about me section
class About extends React.Component{
	render() {
		//<Link to="writing" smooth={true}><span className="about-nav" id="about-writing">Writing/Reporting</span></Link>
		//<Link to="resume" smooth={true}><span className="about-nav" id="about-resume">Resume</span></Link>
		return (
			<div id="about">
				<div>
				I'm a journalist who loves to code and design. I currently do so as a multimedia editor for NBC's Owned Television Stations. Check out my: <br /><br />
					<Link to="projects" smooth={true}><span className="about-nav" id="about-gfx">Projects</span></Link>
					<a href={ResumePDF} target="_blank"><span className="about-nav" id="about-resume">Resume</span></a>
				</div>
			</div>
			)
	}
}

//list item component, used in Projects and Writing
class Item extends React.Component{
	render(){
		const skillslist = this.props.skills.map((d, i) => {
			
			<Skill
				key={i}
				skill={d}
			/>
		});
		
		return (
			<a href={this.props.url} target="_blank">
				<div className="item-project">
					<p className="item-date"><span>{this.props.date}</span></p>
					<img className="item-image" src={process.env.PUBLIC_URL + 'assets/' + this.props.image} />
					<p className="item-title">{this.props.name}</p>
					<p className="skills">{skillslist}</p>
				</div>
			</a>
			);
	}
}
class Skill extends React.Component{
	render(){
		console.log(this.props.skill);
		return (
			<span>
				{this.props.skill}
			</span>
		);
	}
}
//generate list from data
class Projects extends React.Component {
	constructor(props){
		super(props);
		
			this.state = {
				projects:[],
			};	
	}
	componentDidMount(){	
		data.then(data => {
			// console.log(data);
			this.setState({
				projects: data
			});
		});
	}
	render(){

		const thelist = this.state.projects.map((e, i) =>
			<Item 
				key={i} 
				name={e['project-name']}
				date={e['date']}
				image={e['image']}
				url={e['url']}
				skills={e['skills'].split(', ')}
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
				<div id="intro-cont">
					<Intro />
					<About />
				</div>
					<Projects name="projects"/>
					<Writing name="writing"/>
					
			</div>)
	}
}

export default App;