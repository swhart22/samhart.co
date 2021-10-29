const sheetsy = require('sheetsy');
const { urlToKey, getSheet } = sheetsy;
const d3 = Object.assign({}, require('d3-time-format'));
const projects = require('./projects.json');

console.log(projects);

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOyamBuK7n70_qiYcP1bxv5Z2msbnWs62FbaEOnsXITHtNMXC2Uz4GGM72NxT7LRUgcN1ObzGecP5P/pubhtml';

const key = urlToKey(SPREADSHEET_URL);

let timeParse = d3.timeParse('%m/%e/%y');
//let timeFormat = d3.timeFormat('%B %Y');
let timeFormat = d3.timeFormat('%m.%d.%y');



let data = [];

function Project(date, desc, img, org, skills, name, slug, type, url){
	this.date = timeFormat(timeParse(date));
	this.description = desc;
	this.image = img;
	this.org = org;
	this.skills = skills;
	this['project-name'] = name;
	this['project-slug'] = slug;
	this.type = type;
	this.url = url;
};

projects.map((d, i) => {
	data.push(new Project(
		d['date'],
		d['description'],
		d['image'],
		d['org'],
		d['skills'],
		d['project-name'],
		d['project-slug'],
		d['type'],
		d['url']
		));
});


export default data;