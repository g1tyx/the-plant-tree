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
	num: "2",
	name: "Plants & Gardens I",
}

let changelog = `<h1>Version History:</h1><br>
    <h3>v2</h3><br>
        Plants - Added Many Upgrades and 1 Buyable.<br>
        Gardens - Added Upgrades and Milestones.<br>
        Zones - Added with 4 Challenges and Milestones.<br>
        Achievements - Added Many more.<br>
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
	gain=gain.times(gainUpgradeEffect('g', 33))
	gain=gain.times(gainUpgradeEffect('p', 42))
    gain=gain.times(gainUpgradeEffect('p', 51))
    gain=gain.times(gainUpgradeEffect('p', 53))
    gain=gain.times(gainUpgradeEffect('p', 54))
    gain=gain.times(buyableEffect('g', 11))
    gain=gain.times(buyableEffect('g', 12))
    gain=gain.times(buyableEffect('g', 13))
    if(hasAchievement('a', 33) && player.z.points.lt(3)) gain=gain.times(2)
	if(inChallenge('z', 11)) gain=gain.dividedBy(player.p.points.add(1))
	if(inChallenge('z', 12)) gain=gain.dividedBy((getBuyableAmount('p', 11)).add(1))
    if(inChallenge('z', 21)) gain=gain.dividedBy(player.points.add(10).log(10))
    
    if(gain.gte(new Decimal("1.80e308"))) gain=gain.dividedBy(new Decimal("1.80e308")).pow(0.95).times(new Decimal("1.80e308"))
    if(false){
    gain=gain.add(3)
    gain=new Decimal(1).add(gain.minus(player.points.add(1).pow(0.5)))
    gain=gain.dividedBy(player.points.add(10).log(10))
    } //being kept for challenge ideas
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
	return challengeCompletions('z', 22) >= 3
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