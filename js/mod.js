let modInfo = {
	name: "The Plant Tree",
	id: "thenonymous-theplanttree17586745",
	author: "thenonymous",
	pointsName: "Plant Points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1",
	name: "Plants & Gardens I",
}

let changelog = `<h1>Version History:</h1><br>
	<h3>v1.1</h3><br>
		Achievements - 1 Achievement with reward.<br>
	<h3>v1</h3><br>
		Plants - Added with 12 Upgrades and 2 Buyables.<br>
		Gardens - Added with 8 Upgrades.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasMilestone('p', 0)) gain=gain.times(player.p.points.add(1))
	gain=gain.times(gainUpgradeEffect('p', 11))
	gain=gain.times(gainUpgradeEffect('p', 12))
	gain=gain.times(gainUpgradeEffect('p', 14))
	if(hasUpgrade('p', 24)) gain=gain.times(2)
	gain=gain.times(gainUpgradeEffect('g', 11))
	if(hasUpgrade('g', 12)) gain=gain.times(buyableEffect('p', 11))
	gain=gain.times(gainUpgradeEffect('p', 31))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

// Functions I have created:
function gainUpgradeEffect(x, y) {
	let gain=new Decimal(1)
	if(hasUpgrade(x, y)) gain=gain.times(upgradeEffect(x, y))
	return gain
}