let modInfo = {
	name: "The Plant Tree",
	id: "thenonymous-theplanttree17586745",
	author: "thenonymous",
	pointsName: "Plant Points",
	modFiles: ["layers.js", "layers2.js", "layersT1.js", "tree.js"],

	discordName: "The Thenonymous Forest",
	discordLink: "https://discord.gg/ffqTnDRQw8",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "13-",
	name: "Interlude",
}

let changelog = `<h1>Version History:</h1><br><br>
    <h3>v13-</h3><br>
    Interlude<br>
        Quests - Added with 3 minigames and a total of 9 buyables.<br>
        Navigation - Added with 2 clickables.<br>
        General - Added some extra touches to various parts of the game and improved the Emoji Symbols option.<br><br>
    <h3>v12</h3><br>
    Mountains<br>
        Mountains - Added with 5 Milestones, 9 Upgrades and 3 Buyables.<br>
        Natural Disasters - Added 1 Milestone.<br>
        General - Included update names in the changelog.<br><br>
    <h3>v11</h3><br>
    Bugs<br>
        Bugs - Added with 3 Resources and 3 Milestones.<br>
        Conservation Sites - Added 10 Upgrades and 4 Milestones.<br>
        Natural Disasters - Added Bugs and 1 Milestone.<br><br>
    <h3>v10</h3><br>
    Conservation Sites<br>
        Conservation Sites - Added with 15 Upgrades, 4 Milestones and 3 Buyables.<br>
        Natural Disasters - Added 3 Milestones.<br>
        Research - Added 1 Milestones.<br><br>
    <h3>v9.1</h3><br>
    Savebank<br>
        General - Added Savebank and did some bugfixes.<br><br>
    <h2>v9</h2><br>
    Natural Disasters<br>
        General - Added an option to make the layer node symbols emojis.<br>
        Natural Disasters - Added with 3 Challenges, 3 Milestones and 22 Upgrades.<br>
        Trees - Added 4 Upgrades.<br>
        Research - Added a Minigame (3 Milestones and a 6×6 Grid).<br><br>
    <h2>v8</h2><br>
    Reclaimed Ecosystems<br>
        General - Added 'Time Control' Tab and Improved Changelog Formatting.<br>
        Reclamation - Added with 3 Challenges, 5 Milestones and 10 Achievements.<br>
        Fish - Added 4 Upgrades.<br>
        Ecosystems - Added 2 Upgrades.<br>
        Research - Added 3 Buyables.<br>
        Gardens - Added 4 Upgrades.<br><br>
    <h2>v7</h2><br>
    Fish<br>
        Fish - Added with 8 Upgrades and a Prestige Button.<br>
        Ecosystems - Added 2 Upgrades and 5 Achievements.<br>
        Research - Added 2 Upgrades.<br>
        Zones - Added 4 Upgrades and some Milestones.<br><br>
    <h3>v6.0.1</h3><br>
        Ecosystems - Added a cap on 'Recycling'.<br><br>
    <h2>v6</h2><br>
    Ecosystems<br>
        Ecosystems - Added With 10 Milestones, 4 Upgrades, 1 Buyable and 5 Achievements.<br>
        Zones - Added 4 Milestones.<br>
        Plants - Added 2 Upgrades.<br><br>
    <h3>v5.1</h3><br>
    Rebalancing<br>
        Wildlife - Rewritten with minor Balancing.<br>
        General - Option to Change Max Tick Length between 1 Hour and 0.5 Seconds.<br><br>
    <h2>v5</h2><br>
    Trees<br>
        Trees - Added with Many Upgrades, 3 Buyables and 5 Milestones.<br>
        Research - Added 3 Upgrades.<br>
        Zones - Added 1 Milestone.<br>
        Plants - Added 1 New Subtab.<br><br>
    <h2>v4</h2><br>
    Research<br>
        Research - Added with 10 Upgrades and 9 Buyables.<br>
        Wildlife - Added 8 Upgrades.<br>
        Zones - Added 1 Milestone.<br>
        Gardens - Added 1 Buyable.<br><br>
    <h2>v3</h2><br>
    Wildlife<br>
        Wildlife - Added with 24 Upgrades and 1 Buyable.<br>
        Plants - Added 2 Upgrades.<br><br>
    <h2>v2</h2><br>
    Zones<br>
        Plants - Added Many Upgrades and 1 Buyable.<br>
        Gardens - Added Upgrades and Milestones.<br>
        Zones - Added with 4 Challenges and Milestones.<br><br>
	<h2>v1</h2><br>
    Plants and Gardens<br>
		Plants - Added with 12 Upgrades and 2 Buyables.<br>
		Gardens - Added with 8 Upgrades.`

let winText = `Congratulations! You have beaten this game, so go play some other incremental game for 5 hours. This game should be updated by then.`

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
	if(hasUpgrade('p', 24)) gain=gain.times(upgradeEffect('p', 24))
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
    gain=gain.times(smartUpgradeEffect('w', 91))
    gain=gain.times(smartUpgradeEffect('w', 111))
    gain=gain.times(smartUpgradeEffect('e', 24))
    if(hasAchievement('a', 33) && player.z.points.lt(3)) gain=gain.times(2)
    gain=gain.times(smartUpgradeEffect('r', 101))
    gain=gain.times(smartUpgradeEffect('t', 111))
    gain = gain.mul(smartMilestoneEffect('r', 1))
    gain = gain.mul(tmp.c.effect.points)
    gain = gain.mul(smartUpgradeEffect('c', 22))
    gain = gain.mul(smartUpgradeEffect('c', 23))
    gain = gain.mul(smartMilestoneEffect('r', 3))

        // Disasters
    gain = gain.mul(smartUpgradeEffect('n', 12))
    if(hasUpgrade('n', 14)) gain = gain.mul(player.n.soil.add(1).root(2))
    gain = gain.mul(smartUpgradeEffect('n', 21))
    gain = gain.mul(smartUpgradeEffect('n', 41))

    if(inChallenge('n', 11)) gain = gain.mul(player.n.soil.add(1).root(2))

    // Powers
    if(hasUpgrade('n', 74)) gain = gain.pow(1.1)
    gain = gain.pow(smartUpgradeEffect('c', 25))
    gain = gain.pow(smartUpgradeEffect('m', 21))

    // Challenges
    if(inChallenge('t', 11)) gain=gain.pow(new Decimal(1).minus(new Decimal(challengeCompletions('t', 11)).add(1).dividedBy(10)))
	if(inChallenge('z', 11)) gain=gain.dividedBy(player.p.points.add(1))
	if(inChallenge('z', 12)) gain=gain.dividedBy((getBuyableAmount('p', 11)).add(1))
    if(inChallenge('z', 21)) gain=gain.dividedBy(player.points.max(0).add(10).log(10))
    if(inChallenge('re', 11) && challengeCompletions('re', 11) >= 2) gain = gain.pow(0.5)

        // Disasters
        if(inChallenge('n', 11)) gain = gain.pow(0.75).min(gain)
        if(inChallenge('n', 12)) gain = gain.div(gain.add(player.points).pow(0.75))
        if(inChallenge('n', 13)) gain = gain.max(1).log(10).max(gain.root(100))
        if(inChallenge('n', 14)) gain = gain.max(1).log(10)

    // Total Point Gain
    gain = gain.mul(smartUpgradeEffect('n', 63))
    
    // Softcaps
    if(gain.gte(new Decimal("1.80e308"))) gain=gain.dividedBy(new Decimal("1.80e308")).pow(0.95).times(new Decimal("1.80e308"))
    gain=gain.min(gain.div("ee16").root(gain.max(0).add(1).log(10).add(1).log(10).div(16).add(1)).mul("ee16"))
    gain=gain.min(gain.div("e3.16e27").root(gain.max(0).add(1).log(10).add(1).log(10).div(27.5).add(1)).mul("e3.16e27"))
    gain=gain.min(gain.div("e1e28").root(gain.max(0).add(1).log(10).add(1).log(10).div(28).add(1)).mul("e1e28"))
    gain=gain.min(gain.div("e1e38").root(gain.max(0).add(1).log(10).add(1).log(10).div(38).add(1).pow(100)).mul("e1e38"))


    // Bugfixes
    if(gain.lt(0)) return new Decimal(0)
    if(!msReady) return new Decimal (0)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
    sPoints: new Decimal(0)
}}

// Display extra things at the top of the page
var displayThings = [
    function() {return "TPS: "+formatWhole(player.a.fps)},
    function() {return player.points.gte("e1e16")?"You're starting to have trouble storing all of these points. Points are softcapped more the more points you have.":null},
    //function() {return hasUpgrade('g', 54) ? "<a v-bind:style={color: #00AAFF} href=https://raw.githack.com/THENONYMOUS/The-Random-Tree/plant-tree-extreme/index.html>Extreme Mode</a>" : ""}
]


// Determines when the game "ends"
function isEndgame() {
	return hasMilestone('q', 0)
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

function pointMag() {
    let mag = player.points.max(0).add(1).log(new Decimal(10).add(upgradeEffect('p', 34))).floor()
    mag = mag.add(player.n.mag).floor()
    return mag.max(0)
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