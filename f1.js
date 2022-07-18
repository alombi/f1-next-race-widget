// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: flag-checkered;
async function getData(){
	let req = await new Request("https://ergast.com/api/f1/current/next.json")
	let json = await req.loadJSON()
	return json
}

function formatDate(date){
	let d = new Date(date)
	d.setHours(00)
	let now = new Date()
	now.setHours(00)
	let difference = (d.getTime() - now.getTime()) / (1000 * 3600 * 24)
	difference = difference.toFixed(0)
	let dateTXT;
	if(difference == "0"){
		dateTXT = "Race is today!"
	}else if(difference == "1"){
		dateTXT = "Race is tomorrow!"
	}else{
		dateTXT = "Race is in " + difference + " days!"
	}
	return dateTXT
}


let json = await getData()
let w = new ListWidget()

let titleStack = w.addStack()
titleStack.layoutHorizontally()


let title = titleStack.addText("Next F1 Race")
title.font = Font.mediumRoundedSystemFont(14.5)

let symbol = titleStack.addImage(SFSymbol.named("flag.2.crossed").image)

let raceName = json.MRData.RaceTable.Races[0].raceName
let race = w.addText(raceName)
race.font = Font.boldSystemFont(14.5)

let date = formatDate(json.MRData.RaceTable.Races[0].date)
let dateText = w.addText(date)
date.font = Font.mediumSystemFont(14)


Script.setWidget(w)
