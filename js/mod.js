let modInfo = {
	name: "The Plant Tree",
	id: "thenonymous-theplanttree17586745",
	author: "thenonymous",
	pointsName: "Plant Points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "The Plant Tree Discussion",
	discordLink: "https://discord.com/channels/762036407719428096/1106927101300453467",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "6.1",
	name: "Ecosystems I",
}

let changelog = `<h1>Version History:</h1><br>
    <h3>v6.1</h3><br>
        Ecosystems - Added a cap on 'Recycling'.<br>
    <h3>v6</h3><br>
        Ecosystems - Added With 10 Milestones, 4 Upgrades, 1 Buyable and 5 Achievements.<br>
        Zones - Added 4 Milestones.<br>
        Plants - Added 2 Upgrades.<br>
    <h3>v5.1</h3><br>
        Wildlife - Rewritten with minor Balancing.<br>
        General - Option to Change Max Tick Length between 1 Hour and 0.5 Seconds.<br>
    <h3>v5</h3><br>
        Trees - Added with Many Upgrades, 3 Buyables and 5 Milestones.<br>
        Research - Added 3 Upgrades.<br>
        Zones - Added 1 Milestone.<br>
        Plants - Added 1 New Subtab.<br>
    <h3>v4</h3><br>
        Research - Added with 10 Upgrades and 9 Buyables.<br>
        Wildlife - Added 8 Upgrades.<br>
        Zones - Added 1 Milestone.<br>
        Gardens - Added 1 Buyable.<br>
    <h3>v3</h3><br>
        Wildlife - Added with 24 Upgrades and 1 Buyable.<br>
        Plants - Added 2 Upgrades.<br>
    <h3>v2</h3><br>
        Plants - Added Many Upgrades and 1 Buyable.<br>
        Gardens - Added Upgrades and Milestones.<br>
        Zones - Added with 4 Challenges and Milestones.<br>
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
    gain=gain.times(gainUpgradeEffect('w', 11))
    gain=gain.times(gainUpgradeEffect('w', 41))
    gain=gain.times(player.w.large.add(1).pow(0.5))
    gain=gain.times(player.r.points.add(1).pow(hasUpgrade('r', 22) ? 100 : 3))
    gain=gain.times(buyableEffect('g', 21))
    gain=gain.times(tmp.t.effect)
    gain=gain.times(smartUpgradeEffect('t', 21))
    gain=gain.times(clickableEffect('e', 11))
    if(hasAchievement('a', 33) && player.z.points.lt(3)) gain=gain.times(2)
    if(inChallenge('t', 11)) gain=gain.pow(new Decimal(1).minus(new Decimal(challengeCompletions('t', 11)).add(1).dividedBy(10)))
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
	return hasUpgrade('e', 14)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(options.shortMaxTick ? 0.5 : 3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
    if(oldVersion = 6) {
    if(player.z.points.gte(100)) player.z.points = new Decimal(10)
    if(player.e.ecology.lt(0)) player.e.ecology = 0
    }
}

// Functions I have created:
function gainUpgradeEffect(x, y) {
	let gain=new Decimal(1)
	if(hasUpgrade(x, y)) gain=gain.times(upgradeEffect(x, y))
	return gain
}

// ToL functions:
function getLogisticAmount(current, gain, loss, diff){
        if (current.eq(gain.div(loss))) return current
        if (gain.gte("ee10")) return gain.div(loss)
        if (current.lt(gain.div(loss))) {
                c = getLogisticTimeConstant(current, gain, loss)
                
                val1 = c.plus(diff) // t+c
                val2 = val1.times(-1).times(loss) // -B(t+c)
                val3 = Decimal.exp(val2) // this should be A-Bx
                val4 = gain.sub(val3) // should be A-(A-Bx) = Bx
                val5 = val4.div(loss) // should be x

                return val5.max(0)
        } else {
                c = getLogisticTimeConstant(current, gain, loss)
                
                val1 = c.plus(diff) // t+c
                val2 = val1.times(-1).times(loss) // -B(t+c)
                val3 = Decimal.exp(val2) // this should be Bx-A
                val4 = gain.plus(val3) // should be (Bx-A)+A
                val5 = val4.div(loss) // should be x

                return val5.max(0)
        }
}

function getLogisticTimeConstant(current, gain, loss){
        if (current.eq(gain.div(loss))) return Infinity
        if (current.gt(gain.div(loss))) return current.times(loss).sub(gain).ln().div(-1).div(loss)
        return current.times(loss).sub(gain).times(-1).ln().div(-1).div(loss)
}