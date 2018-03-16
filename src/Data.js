const sheetsy = require('sheetsy');
const { urlToKey, getWorkbook, getSheet } = sheetsy;

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1f0Shxx6gJFh8rkNHuyBlRZdH6LehONXZ055OTMrzOg8/edit#gid=0';

const key = urlToKey(SPREADSHEET_URL);

const data = getSheet(key, 'od6').then(stuff => {
	
	let data = [];

	function Project(date, desc, img, org, name, slug, type, url){
		this.date = date;
		this.description = desc;
		this.image = img;
		this.org = org;
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