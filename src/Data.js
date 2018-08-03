const sheetsy = require('sheetsy');
const { urlToKey, getWorkbook, getSheet } = sheetsy;
const d3 = Object.assign({}, require('d3-time-format'));


const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1f0Shxx6gJFh8rkNHuyBlRZdH6LehONXZ055OTMrzOg8/edit#gid=0';

const key = urlToKey(SPREADSHEET_URL);

let timeParse = d3.timeParse('%m/%e/%y');
//let timeFormat = d3.timeFormat('%B %Y');
let timeFormat = d3.timeFormat('%m.%d.%y');

const data = getSheet(key, 'od6').then(stuff => {
	
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

	stuff.rows.map((d, i) => {
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
	return data;
});
//console.log(data);
export default data;