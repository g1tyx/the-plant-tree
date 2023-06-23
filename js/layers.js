addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: "0",
    }},
    color: "#FFFF00",
    resource: "Useless Paperclips", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    milestonePopups: false,
    tabFormat: {
        "Achievements": {
            content: [
                "achievements",
                "blank",
                ],
        },
        "Time Control": {
            content: [
                "clickables",
                "blank",
            ],
        },
        "Theme Unlocks": {
            content: [
                "milestones",
            ],
            unlocked() {return false},
        },
    },
    clickables: {
        11: {
            display: "Set devSpeed to <br><font size = +1>0.01%</font>",
            onClick() {player.devSpeed = new Decimal(0.0001)},
            canClick: true,
        },
        12: {
            display: "Set devSpeed to <br><font size = +1>10%</font>",
            onClick() {player.devSpeed = new Decimal(0.1)},
            canClick: true,
        },
        13: {
            display: "Set devSpeed to <br><font size = +1>100%</font>",
            onClick() {player.devSpeed = new Decimal(1)},
            canClick: true,
        },
    },
    achievements: {
        11: {
            name: "1st Plant!",
            done() {return player.p.points.gte(1)},
            tooltip: "Buy your first Plant",
        },
        12: {
            name: "Combined",
            done() {return hasUpgrade('p', 11)},
            tooltip: "Buy a Sedum Succulent",
        },
        13: {
            name: "What does Magnitude mean?",
            done() {return hasUpgrade('p', 14)},
            tooltip: `Buy a Snake Plant <br>
            Magnitude of x: log10(x)`,
        },
        14: {
            name: "What does divided mean?",
            done() {return hasUpgrade('p', 22)},
            tooltip: "Buy an Anthurium",
        },
        15: {
            name: "MORE SPACE",
            done() {return player.g.points.gte(1)},
            tooltip: "Get a new Garden",
        },
        21: {
            name: "Costco sells plants now!",
            done() {return getResetGain('p').gte(50)},
            tooltip: "Bulk buy 50 Plants at once. Reward: Unlock a Garden Milestone",
        },
        22: {
            name: "Plant Central",
            done() {return player.p.points.gte(100)},
            tooltip: "Have 100 Plants",
        },
        23: {
            name: "Prickly Pears from IKEA",
            done() {return tmp.p.buyables[11].cost.lte(3)},
            tooltip: "Make Prickly Pears cheaper than 3 Plants. Reward: Keep plant upgrades on Garden reset",
        },
        24: {
            name: "\"Having a Garden improves your quality of life\"",
            done() {return hasMilestone('g', 0)},
            tooltip: "Get a Garden Milestone. Reward: Prickly Pears don't use up Plants",
        },
        25: {
            name: "BETTER SPACE",
            done() {return player.z.points.gte(1)},
            tooltip: "Get a new Zone",
        },
        31: {
            name: "Hard Work!",
            done() {return challengeCompletions('z', 11) >= 3},
            tooltip: "Fully Complete the Tropical Zone",
        },
        32: {
            name: "Prickly Pears from the Desert",
            done() {return tmp.p.buyables[11].cost.lte(0.01)},
            tooltip: "Make Prickly Pears cheaper than 0.01 Plants",
        },
        33: {
            name: "Didn't know there was that much space",
            done() {return inChallenge('z', 12) && player.p.points.gte(370)},
            tooltip: "Get 370 Plants in The Alpine Zone. Reward: 2x Point gain under 3 Zones",
        },
        34: {
            name: "You need more containers",
            done() {return getBuyableAmount('p', 13).gte(100)},
            tooltip: "Reach the Echinocactus Limit. Reward: Keep Plant Buyables on Garden Reset",
        },
        35: {
            name: "Wildlife Central",
            done() {return player.w.points.gte(100)},
            tooltip: "Reach 100 Wildlife",
        },
        41: {
            name: "Real Wildlife!",
            done() {return hasUpgrade('w', 31)},
            tooltip: "Attract your first Animal to the Garden",
        },
        42: {
            name: "More Resources?",
            done() {return hasUpgrade('w', 33)},
            tooltip: "Attract a Bear to your garden",
        },
        43: {
            name: "Habitat Master",
            done() {return hasUpgrade('w', 14)},
            tooltip: "Obtain All the Habitats",
        },
        44: {
            name: "Daft Wildlife",
            done() {return hasUpgrade('w', 24)},
            tooltip: "Complete the Reference",
        },
        45: {
            name: "Sassy Wildlife",
            done() {return hasUpgrade('w', 64)},
            tooltip: "Attract a Fox to your Garden",
        },
        51: {
            name: "Time Portal",
            done() {return getBuyableAmount('r', 21).gte(1)},
            tooltip: "Buy a Time Speed Increase",
        },
        52: {
            name: "Time Walrus",
            done() {return getBuyableAmount('r', 12).gte(2)},
            tooltip: "Unlock More Wildlife Upgrades",
        },
        53: {
            name: "<i>RETURN OF THE MAGNITUDE",
            done() {return hasUpgrade('r', 14)},
            tooltip: "Buy Plant Robotics",
        },
        54: {
            name: "Finally, Some Satisfaction!",
            done() {return hasUpgrade('r', 22)},
            tooltip: "Get an Overpowered Boost from a Certain Research Upgrade",
        },
        55: {
            name: "But <i>What is</i> this you Speak of?",
            done() {return hasUpgrade('r', 25)},
            tooltip: "Achieve a Scientific Breakthrough!",
        },
        61: {
            name: "The Knockoff Trees",
            done() {return player.t.leaves.gte(300)},
            tooltip: "Get 300 Leaves",
        },
        62: {
            name: "You Can Stop Now",
            done() {return tmp.r.baseAmount.gte(new Decimal("1.80e308"))},
            tooltip: "Research for Infinitely (1.8e308) Long",
        },
        63: {
            name: "This Isn't How The Food Chain Works...",
            done() {return player.w.points.dividedBy(player.p.points.add(1)).gte(new Decimal("1.80e308"))},
            tooltip: "Have Infinite (1.8e308) Wildlife per Plant",
        },
        64: {
            name: "Recursion",
            done() {return hasUpgrade('t', 61)},
            tooltip: "Play The Plant Tree Inside of The Plant Tree",
        },
        65: {
            name: "What Does This Mean?",
            done() {return hasUpgrade('t', 91)},
            tooltip: "Buy a Row 3 Plant Tree Upgrade?",
        },
        71: {
            name: "Sub-Milestones?",
            done() {return hasMilestone('e', 1)},
            tooltip: "Get Ecosystem Milestone 2",
        },
        72: {
            name: "Prickly Pears from <i>the Void</i>",
            done() {return tmp.p.buyables[11].cost.lt("1.80e-308")},
            tooltip: "Make Prickly Pears Cheaper Than 1.80e-308 Plants, Don't worry, this will be out of order",
        },
        73: {
            name: "Quality OF LIFE",
            done() {return player.e.points.gte(2)},
            tooltip: "Gain a Second Ecosystem. Reward: Divide Ecosystem Requirements by 1.20",
        },
        74: {
            name() {return hasMilestone('e', 9) ? `<font size = "-2"> Wait... holup... holy frick is that an achievement outside of the achievements layer!? bro</font>` : "Uh oh, this achievement name contains spoilers!"},
            done() {return hasMilestone('e', 9)},
            tooltip: "Begin Generation of Ecology",
        },
        75: {
            name: "<i>SUS</i>TAINABLE SPACE",
            done() {return hasUpgrade('e', 14)},
            tooltip: "Buy '100% Recycled Materials'",
        },
        81: {
            name: "The Fishing Trip",
            done() {return player.w.fish.gte(50)},
            tooltip: "Find 50 Fish",
        },
        82: {
            name: "You Need More Trash Cans",
            done() {return getBuyableAmount('e', 11).gte(50)},
            tooltip: "Recycle 50 Times",
        },
        83: {
            name: "EPA <br><font size = -2>(Ecological Plant Agency)</font>",
            done() {return player.r.points.gte(1200)},
            tooltip: "Achieve 1,200 Research. Reward: Research Speed x2",
        },
        84: {
            name: "The Plants...",
            done() {return player.p.points.gte("1e8")},
            tooltip: "100,000,000 Plants",
        },
        85: {
            name: "AMERICAN SPACE",
            done() {return hasUpgrade('z', 14)},
            tooltip: "Get 'Americas Inspired Zone'",
        },
        91: {
            name: "Cleaning - Fish Edition",
            done() {return completionDecimal('re', 11).gte(2)},
            tooltip: "Complete 'Polluted Ocean' Twice",
        },
        92: {
            name: "Ecosystem Lost",
            done() {return hasUpgrade('w', 114)},
            tooltip: "Buy a Koi",
        },
        93: {
            name: "The Reclaimer",
            done() {return player.re.points.gte(3)},
            tooltip: "Reclaim 3 Ecosystems <br><font size = -1>(Get 3 Reclaimed Ecosystems)</font>",
        },
        94: {
            name: "Just 1 More Completion...",
            done() {return completionDecimal('re', 21).gte(2)},
            tooltip: "Complete 'Abandoned Quarry' Twice",
        },
        95: {
            name: "<font size = -1>PLACES WHICH HELP YOU GET BETTER SPACE</font>",
            done() {return hasUpgrade('g', 54)},
            tooltip: "Buy 'Tipi'",
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Ecosystem: Theme Unlock",
            effectDescription: "Unlock 'Plant' Theme",
            done() {return player.e.points.gte(1)},
        },
    },
}),
addLayer("p", {
    name: "plants", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
    }},
    color: "#27B000",
    requires() {return 10}, // Can be a function that takes requirement increases into account
    resource: "plants", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        let exponent = new Decimal(1-smartUpgradeEffect('z', 13, 0))
        if(inCompletion('re', 21, 2)) exponent = exponent.add(1)
        exponent = exponent.times(smartUpgradeEffect('w', 112))
        return exponent
    }, // Prestige currency exponent
    base() {let base = 2
    if(hasUpgrade('p', 43)){base -= 0.1}
    if(new Decimal(getBuyableAmount('p', 13)).gte(1)){base = new Decimal(1).add(new Decimal(base).minus(1).times(buyableEffect('p', 13)))}
    return base},
    canBuyMax: true,
    autoPrestige() {return hasMilestone('g', 0)},
    resetsNothing() {return hasMilestone('g', 0)},
    autoUpgrade() {return hasMilestone('e', 5)},
    branches: ['g', 'z'],
    tooltip() {
        let tooltip = formatWhole(player.p.points)+" Plants"
        if(hasUpgrade('r', 25)) tooltip = tooltip + "<br><font size = -1>"+formatWhole(player.t.points)+" Trees</font>"
        return tooltip
    },
    deactivated() {return inCompletion('re', 12, 2)},
    tabFormat: {
        "Plants": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "blank",
                "milestones",
                "blank",
                "blank",
                "buyables",
                "blank",
                "blank",
                "upgrades",
                ],
            unlocked() {return hasUpgrade('r', 25) || player.e.best.gte(1)},
        },
        "Trees": {
            embedLayer: 't',
            unlocked() {return hasUpgrade('r', 25) || hasMilestone('e', 5)},
        },
    },
    effectDescription() {if(hasUpgrade('p', 14)) return "Next Magnitude increase at "+format(new Decimal(10).add(upgradeEffect('p', 34)).pow(player.points.log(new Decimal(10).add(upgradeEffect('p', 34))).ceil()))+" Points (1-4, 2-2)"},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return;
        
        let keep = [];
        keep.push("milestones");
        if (hasAchievement('a', 23) && resettingLayer==='g') keep.push("upgrades");
        if (hasAchievement('a', 34) && resettingLayer==='g' && layers[resettingLayer].row == 1) keep.push("buyables")
        layerDataReset(this.layer, keep)
    },      
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('p', 13)) mult=mult.dividedBy(upgradeEffect('p', 13))
        if(hasUpgrade('p', 21)) mult=mult.dividedBy(upgradeEffect('p', 21))
        if(hasUpgrade('p', 22)) mult=mult.dividedBy(upgradeEffect('p', 22))
        if(hasUpgrade('p', 23)) mult=mult.dividedBy(upgradeEffect('p', 23))
        if(hasUpgrade('g', 12)) mult=mult.dividedBy(buyableEffect('p', 11))
        if(hasUpgrade('g', 13)) mult=mult.dividedBy(upgradeEffect('g', 11))
        if(hasUpgrade('g', 21)) mult=mult.dividedBy(buyableEffect('p', 12))
        if(hasUpgrade('g', 23)) mult=mult.dividedBy(player.g.points.add(1))
        if(hasUpgrade('p', 41)) mult=mult.dividedBy(upgradeEffect('p', 41))
        if(hasUpgrade('g', 41)) mult=mult.pow(1.1)
        if(hasUpgrade('w', 31)) mult=mult.dividedBy(player.w.points.add(1))
        if(hasUpgrade('w', 63)) mult=mult.dividedBy(player.w.large.add(1).pow(0.5))
        mult = mult.dividedBy(smartUpgradeEffect('t', 71))
        mult = mult.dividedBy(smartUpgradeEffect('w', 101))
        if(hasAchievement('re', 15)) mult = mult.times(tmp.r.requires.div(10))
        if(!hasUpgrade('t', 14)) mult=mult.times(tmp.t.effect)
        if(inChallenge('z', 12)) mult=mult.times((getBuyableAmount('p', 11).add(1)))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Plants", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    automate() {
        if(hasUpgrade('w', 42)) buyMaxBuyable('p', 12)
        if(hasMilestone('z', 7)) buyBuyable('p', 13)
        if(player.p.points.lt(0)) player.p.points = new Decimal(0)
    },
    milestones: {
        0: {
            requirementDescription: "1 Plant",
            effectDescription() {return "Multiply Point gain by plants. Currently: x"+format(player.p.points.add(1))},
            done() {return player.p.best.gte(1)},
        },
    },
    upgrades: {
        11: {
            title: "Sedum",
            description: "Square milestone effect",
            cost: (new Decimal(3)),
            effect() {return player.p.points.add(1)},
            effectDisplay() {return "^2"},
        },
        12: {
            title: "Bear-Paw Succulent",
            description: "Multiply point gain based on points",
            cost: (new Decimal(5)),
            effect() {return player.points.add(2).log(2)},
            effectDisplay() {return "x"+format(upgradeEffect('p', 12))},
            tooltip: "log2(Points + 2)"
        },
        13: {
            title: "Jade Plant",
            description: "Plant costs are divided by plants",
            cost: (new Decimal(12)),
            effect() {return player.p.points.add(1)},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 13))},
        },
        14: {
            title: "Snake Plant",
            description: "Points are multiplied based on magnitude",
            cost: (new Decimal(18)),
            effect() {return new Decimal(2).pow(player.points.add(1).log(new Decimal(10).add(upgradeEffect('p', 34))).floor())},
            effectDisplay() {return "x"+format(upgradeEffect('p', 14))},
            tooltip: "2 ^ Floor(log10(Points))",
        },
        21: {
            title: "Philodendron",
            description: "Plant costs are divided by points",
            cost: (new Decimal(25)),
            effect() {return player.points.add(1).pow(0.1)},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 21))},
            tooltip: "Points ^ 0.1",
        },
        22: {
            title: "Anthurium",
            description: "Plant costs are divided based on magnitude",
            cost: (new Decimal(30)),
            effect() {return new Decimal(2).pow(player.points.add(1).log(new Decimal(10).add(upgradeEffect('p', 34))).floor())},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 22))},
            tooltip: "2 ^ Floor(log10(Points))",
        },
        23: {
            title: "Yucca",
            description: "Plant costs divided by plants, only goes up at intervals of 10",
            cost: (new Decimal(40)),
            effect() {return player.p.points.dividedBy(10).floor().times(10).add(1)},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 23))},
            tooltip: "Floor(plants ÷ 10) x 10",
        },
        24: {
            title: "Coconut Palm",
            description: "Unlock Gardens and double point gain",
            cost: (new Decimal(50)),
            effect() {return hasAchievement('re', 16) ? player.z.points.add(1).root(2).pow_base(2) : 2},
            effectDisplay() {return "x"+formatWhole(thisUpgradeEffect(this))},
        },
        31: {
            title: "Mint",
            description: "Plants multiply point gain slightly",
            cost: (new Decimal(155)),
            unlocked() {return hasMilestone('g', 0)},
            effect() {return player.p.points.add(1).pow(0.5)},
            effectDisplay() {return "x"+format(upgradeEffect('p', 31))},
            tooltip: "Plants ^ 0.5",
        },
        32: {
            title: "Chives",
            description: "Garden upgrade 1-4's effect is better",
            cost: (new Decimal(180)),
            unlocked() {return hasMilestone('g', 0)},
            tooltip: "log10 -> log5",
        },
        33: {
            title: "Rosemary",
            description: "Divide Garden costs based on points",
            cost: (new Decimal(195)),
            unlocked() {return hasMilestone('g', 0)},
            effect() {return player.points.log(10).pow(0.1)},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 33))},
            tooltip: "(log10(Points)) ^ 0.1",
        },
        34: {
            title: "Parsley",
            description: "Previous Plant upgrades based on magnitude are better",
            cost: (new Decimal(200)),
            unlocked() {return hasMilestone('g', 0)},
            effect() {if(hasUpgrade('p', 34)){return -5}else{return 0}},
            tooltip: "log10 -> log5",
        },
        41: {
            title: "Date Palm",
            description: "Divide Plant costs based on Points and Plants",
            cost: (new Decimal(250)),
            unlocked() {return new Decimal(challengeCompletions('z', 11)).gte(1)},
            effect() {return player.points.times(player.p.points.pow(3)).add(1).pow(0.2)},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 41))},
            tooltip: "Points x (Plants ^ 3) ^ 0.2",
        },
        42: {
            title: "Acai Palm",
            description: "Multiply Point gain based on Tropical Zone completions and Zones",
            cost: (new Decimal(300)),
            unlocked() {return new Decimal(challengeCompletions('z', 11)).gte(2)},
            effect() {return player.z.points.add(1).times(new Decimal(challengeCompletions('z', 11)).add(1)).pow(2)},
            effectDisplay() {return "x"+format(upgradeEffect('p', 42))},
            tooltip: "((Completions + 1) x (Zones + 1)) ^ 2",
        },
        43: {
            title: "Sago Palm",
            description: "Reduce the Plant Cost base by 0.1",
            cost: (new Decimal(340)),
            unlocked() {return new Decimal(challengeCompletions('z', 11)).gte(3)},
            tooltip: "Plant cost formula: Base (2->1.9) ^ Plants ^ Exponent (1)"
        },
        44: {
            title: "Areca Palm",
            description: "Divide \"Prickly Pear\" cost based on Plants and divide \"Saguaro\" costs by it's amount",
            cost: (new Decimal(380)),
            unlocked() {return new Decimal(challengeCompletions('z', 11)).gte(3)},
            effect() {return player.p.points.add(1).pow(0.8)},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 44))},
            tooltip: "Plants ^ 0.8",
        },
        51: {
            title: "Stonecrop",
            description: "Multiply Point gain based on Plants",
            cost() {if(hasUpgrade('p', 52)){return 600}else{return 500}},
            unlocked() {return new Decimal(challengeCompletions('z', 12)).gte(1)},
            effect() {return new Decimal(2).pow(player.p.points.pow(0.5))},
            effectDisplay() {return "x"+format(upgradeEffect('p', 51))},
            tooltip: "Cost increases when Plant Upgrade 5-2 is bought. Formula: 2 ^ (Plants ^ 0.5)",
        },
        52: {
            title: "Sempervivum",
            description: "Prickly Pear cost is divided based on points",
            cost() {if(hasUpgrade('p', 51)){return 600}else{return 500}},
            effect() {return player.points.add(2).log(2)},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 52))},
            unlocked() {return new Decimal(challengeCompletions('z', 12)).gte(1)},
            tooltip: "Cost increases when Plant Upgrade 5-1 is bought. Formula: log2(Points)",
        },
        53: {
            title: "Campanula",
            description: "Saguaro multiplies Point gain by 2",
            cost() {if(hasUpgrade('p', 54)){return 885}else{return 750}},
            effect() {return new Decimal(2).pow(getBuyableAmount('p', 12))},
            effectDisplay() {return "x"+format(upgradeEffect('p', 53))},
            unlocked() {return new Decimal(challengeCompletions('z', 12)).gte(2)},
            tooltip: "Cost increases when Plant Upgrade 5-4 is bought",
        },
        54: {
            title: "Phlox",
            description: "Prickly Pear multiplies Point gain by 10 instead",
            cost() {if(hasUpgrade('p', 53)){return 910}else{return 750}},
            effect() {return new Decimal(2).pow(getBuyableAmount('p', 11))},
            unlocked() {return new Decimal(challengeCompletions('z', 12)).gte(2)},
            tooltip: "Cost increases when Plant Upgrade 5-3 is bought",
        },
        61: {
            title: "Dianthus",
            description: "Prickly Pear gives bonus levels to Saguaro",
            cost() {if(hasUpgrade('p', 62)){return 1325}else{return 1200}},
            unlocked() {return new Decimal(challengeCompletions('z', 12)).gte(3)},
            effectDisplay() {return "+"+format(getBuyableAmount('p', 11))},
            tooltip: "Cost increases when Plant Upgrade 6-2 is bought",
        },
        62: {
            title: "Pulsatilla Vulgaris",
            description: "Saguaro amount divides Prickly Pear cost",
            cost() {if(hasUpgrade('p', 61)){return 1330}else{return 1200}},
            unlocked() {return new Decimal(challengeCompletions('z', 12)).gte(3)},
            effectDisplay() {return "÷"+format(getBuyableAmount('p', 12).add(1))},
            tooltip: "Cost increases when Plant Upgrade 6-1 is bought",
        },
        63: {
            title: "Primrose",
            description: "Unlock a buyable",
            cost: (new Decimal(1500)),
            unlocked() {return new Decimal(challengeCompletions('z', 12)).gte(3)},
        },
        64: {
            title: "Thrift",
            description: "Echinocactus is 'free' and gives bonus levels to Saguaro and Prickly Pear",
            cost: (new Decimal(1740)),
            unlocked() {return new Decimal(challengeCompletions('z', 12)).gte(3)},
            effectDisplay() {return "+"+format(getBuyableAmount('p', 13))},
        },
        71: {
            title: "Wild Garlic",
            description: "Divide Garden Costs based on Gardens",
            cost: (new Decimal(4350)),
            unlocked() {return new Decimal(challengeCompletions('z', 22)).gte(1)},
            effect() {return player.g.points.add(5).log(5).root(5)},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 71))},
            tooltip: "5th Root(log5(Gardens))",
        },
        72: {
            title: "Tree Fern",
            description: "Reduce Echinocactus Scaling by 10",
            cost: (new Decimal(5170)),
            unlocked() {return new Decimal(challengeCompletions('z', 22)).gte(2)},
            effect() {if(hasUpgrade('p', 72)) {return -10} else {return 0}}, 
        },
        73: {
            title: "Bluebells",
            description: "Base Wildlife Gain uses a Better Formula",
            cost: (new Decimal(11360)),
            unlocked() {return new Decimal(challengeCompletions('z', 22)).gte(3)},
            tooltip: "2rt(Plants) -> 1.5rt(Plants)",
        },
        74: {
            title: "Filmy Fern",
            description: "'Nutrients' Divides Prickly Pear Cost at a Reduced Rate",
            cost: (new Decimal(13300)),
            unlocked() {return new Decimal(challengeCompletions('z', 22)).gte(3)},
            effect() {return buyableEffect('w', 11).pow(0.1)},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 74))},
            tooltip: "Nutrients ^ 0.1",
        },
        81: {
            title: "Cabbage",
            description: "First Ecosystem Ability Effect also Divides Garden Costs at a Reduced Rate",
            cost: (new Decimal("1.65e6")),
            unlocked() {return hasMilestone('e', 6)},
            effect() {return player.e.points.add(1).pow(10).log(10).root(10)},
            effectDisplay() {return "÷"+format(thisUpgradeEffect(this))},
            tooltip: "log10 (Effect) ^ 0.1",
        },
        82: {
            title: "Cauliflower",
            description: "Ability Cooldown Divided based on Zones",
            cost: (new Decimal("1.9e6")),
            unlocked() {return hasMilestone('e', 6)},
            effect() {return player.z.points.add(1).root(3)},
            effectDisplay() {return "÷"+format(thisUpgradeEffect(this))},
            tooltip: "3rt (Zones)",
        },
    },
    buyables: {
        11: {
            title: "Prickly Pear",
            cost(x) {
              let base = new Decimal(2);
              if (hasMilestone('g', 1)) base = base.minus(0.1);
              if (hasUpgrade('g', 42)) base = base.minus(0.1);
              let cost = base.pow(x).times(10);
              if (hasUpgrade('g', 14)) cost = cost.dividedBy(upgradeEffect('g', 14));
              if (hasUpgrade('p', 44)) cost = cost.dividedBy(upgradeEffect('p', 44));
              if (hasUpgrade('p', 52)) cost = cost.dividedBy(upgradeEffect('p', 52));
              if (hasUpgrade('p', 62)) cost = cost.dividedBy(getBuyableAmount('p', 12).add(1));
              if (hasUpgrade('p', 74)) cost = cost.dividedBy(upgradeEffect('p', 74));
              return cost;
            },
            display() { return autoThisBuyableDisplay("Multiply point gain and divide plant costs by 5. Hold to buy max.", this)},
            canAfford() {return player.p.points.gte(this.cost()) && player.p.resetTime > 0 && msReady && player.p.points.gt(0)},
            buy() {
                if(hasUpgrade('r', 33)) {buyMaxBuyable(this.layer, this.id)} else{
              if(!hasAchievement('a', 24)) {player.p.points = player.p.points.minus(this.cost())};
              addBuyables(this.layer, this.id, 1)}
              if(isNaN(getBuyableAmount('p', 11))) setBuyableAmount('p', 11, new Decimal(0))
            },
            unlocked() { return hasUpgrade('g', 12) },
            effect() {
                let extra = new Decimal(0)
                if(hasUpgrade('p', 64)) extra = extra.add(getBuyableAmount('p', 13))
                return getBuyableAmount('p', 11).add(extra).pow_base(5) },
            tooltip() {return "Total Effect: <br> ×/÷"+format(getBuyableAmount('p', 11).pow_base(5))+" (Before Bonus Levels)"},
            buyMax() {
                if(player.p.points.gte(this.cost)) {
                    addBuyables(this.layer, this.id, player.p.points.dividedBy(this.cost(getBuyableAmount(this.layer, this.id).minus(1))).log(2).floor())
                }
            },
          },
        12: {
            title: "Saguaro",
            cost(x) {let cost = new Decimal(1000).pow(x)
                if(hasUpgrade('p', 44)) cost=cost.dividedBy(getBuyableAmount('p', 12).add(1))
                if(hasUpgrade('w', 42)) cost=cost.dividedBy(upgradeEffect('w', 42))
                if(hasUpgrade('w', 51)) cost=cost.dividedBy(buyableEffect('w', 11))
            return cost},
            display() { return autoThisBuyableDisplay("Divide plant costs by 10. Hold to buy max.", this)},
            canAfford() { return player.points.gte(this.cost()) && player.points.gt(0)},
            buy() {
                player.points = player.points.sub(this.cost())
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return hasUpgrade('g', 21) && !inChallenge('z', 22)},
            effect() {
                let extra = new Decimal(0)
                if(hasUpgrade('p', 61)) extra = extra.add(getBuyableAmount('p', 11))
                if(hasUpgrade('p', 64)) extra = extra.add(getBuyableAmount('p', 13))
                return new Decimal(10).pow(getBuyableAmount('p', 12).add(extra))},
            tooltip() {return "Total Effect: ÷"+format(getBuyableAmount('p', 12).pow_base(10))+" (Before Bonus Levels)"},
            },
            buyMax() {
                let max = player.points.add(1).log(1000)
                if(max.gt(getBuyableAmount('p', 12))) setBuyableAmount('p', 12, max.add(1).floor())
                buyBuyable('p', 12)
            },
        13: {
            title: "Echinocactus",
            cost(x) {
                let cost = new Decimal(100).add(new Decimal(x).times(new Decimal(100).add(upgradeEffect('p', 72)))).pow(getBuyableAmount('p', 13).gte(100) ? getBuyableAmount('p', 13).minus(50).dividedBy(50) : 1)
                if(hasMilestone('z', 7)) cost = cost.pow(0.9)
                return cost
            },
            display() { return autoThisBuyableDisplay("Multiply Plant cost base above 1 by 0.99. Hold to buy max.", this,"","/"+format(tmp.p.buyables[13].purchaseLimit))},
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                if(!hasUpgrade('p', 64)) {player.p.points = player.p.points.sub(this.cost())}
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return hasUpgrade('p', 63)},
            purchaseLimit() {return hasMilestone('z', 6) ? 200 : 100},
            effect() {return new Decimal(0.99).pow(getBuyableAmount('p', 13))},
            tooltip() {return "Total Effect: ×"+format(getBuyableAmount('p', 13).pow_base(0.99))+" (Before Bonus Levels)"},
            },
        },
}),
addLayer("g", {
    name: "gardens", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#FF8800",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "gardens", // Name of prestige currency
    baseResource: "plants", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return 0.4 + (inCompletion('re', 21, 1) ? 1 : 0)}, // Prestige currency exponent
    base() {return 2},
    canBuyMax: true,
    branches: ['p', 'z'],
    deactivated() {return inCompletion('re', 12, 1)},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return;
        
        let keep = [];
        if(hasAchievement('e', 21)) keep.push("upgrades", "milestones")
        layerDataReset(this.layer, keep);
    },
    resetsNothing() {return hasMilestone('z', 4) || hasMilestone('e', 5)},
    autoPrestige() {return hasUpgrade('t', 13)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('g', 22)) mult=mult.dividedBy(upgradeEffect('g', 22))
        if(hasUpgrade('p', 33)) mult=mult.dividedBy(upgradeEffect('p', 33))
        if(hasUpgrade('g', 34)) mult=mult.dividedBy(upgradeEffect('g', 34))
        if(hasUpgrade('p', 71)) mult=mult.dividedBy(upgradeEffect('p', 71))
        if(hasUpgrade('w', 53)) mult=mult.dividedBy(upgradeEffect('w', 53))
        if(hasMilestone('z', 4)) mult=mult.dividedBy(player.z.points.dividedBy(2).add(1).root(2))
        mult = mult.dividedBy(smartUpgradeEffect('t', 82))
        if(getClickableState('e', 11)) mult = mult.dividedBy(smartUpgradeEffect('p', 81))
        if(hasAchievement('re', 12)) mult = mult.dividedBy(player.re.points.add(1))
        mult = mult.dividedBy(smartUpgradeEffect('g', 51))
        mult = mult.dividedBy(smartUpgradeEffect('g', 52))
        mult = mult.div(buyableEffect('r', 43))
               return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for Gardens", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return tmp[this.layer].layerShown}},
    ],
    layerShown(){return hasUpgrade('p', 24)||player.g.best.gte(1) || hasMilestone('e', 7)},

    upgrades: {
        11: {
            title: "Lawn",
            description: "Multiply point gain based on Gardens and Plants",
            cost: (new Decimal(1)),
            effect() {let effect = player.g.points.add(1).times(player.p.points.add(1))
                if(hasUpgrade('g', 31)) {effect=effect.times(player.z.points.add(1))}
            return effect},
            effectDisplay() {return "x"+format(upgradeEffect('g', 11))},
            tooltip: "(Gardens + 1) x (Plants + 1)",
        },
        12: {
            title: "Raised Beds",
            description: "Unlock a Plant buyable",
            cost: (new Decimal(1)),
            unlocked() {return hasUpgrade('g', 11)},
        },
        13: {
            title: "Terracotta Pots",
            description: "Garden upgrade 1-1 also divides plant costs",
            cost: (new Decimal(2)),
            unlocked() {return hasUpgrade('g', 12)},
        },
        14: {
            title: "Ceramic Pots",
            description: "Divide buyable cost based on magnitude of plants",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('g', 13) },
            effect() {
              let base = new Decimal(hasUpgrade('p', 32) ? 5 : 10);
              return player.p.points.plus(10).log(base).floor().pow_base(2);
            },
            effectDisplay() { return `÷${format(upgradeEffect('g', 14))}` }
        },
        21: {
            title: "Raised Beds II",
            description: "Unlock another buyable",
            cost: (new Decimal(3)),
            unlocked() {return hasUpgrade('g', 14)},
        },
        22: {
            title: "Shed",
            description: "Divide Garden costs based on Magnitude of Plants",
            cost: (new Decimal(5)),
            unlocked() {return hasUpgrade('g', 21)},
            effect() {return new Decimal(1.1).pow(player.p.points.add(1).log(new Decimal(10).add(upgradeEffect('g', 32))).floor())},
            effectDisplay() {return "÷"+format(upgradeEffect('g', 22))},
            tooltip: "1.1 ^ Floor(log10(Plants))",
        },
        23: {
            title: "Woodshed",
            description: "Divide plant costs by gardens",
            cost: (new Decimal(8)),
            unlocked() {return hasUpgrade('g', 22)},
            effectDisplay() {return "÷"+format(player.g.points.add(1))},
            tooltip: "Gardens + 1",
        },
        24: {
            title: "Greenhouse",
            description: "Unlock Zones",
            cost: (new Decimal(18)),
            unlocked() {return hasUpgrade('g', 23)},
        },
        31: {
            title: "Decking I",
            description: "Garden Upgrade 1-1 Uses Zones as well",
            cost: (new Decimal(20)),
            unlocked() {return hasUpgrade('g', 24)},
        },
        32: {
            title: "Decking II",
            description: "Garden Upgrade 2-2 is better",
            cost: (new Decimal(21)),
            unlocked() {return hasUpgrade('g', 31)},
            effect() {if(hasUpgrade('g', 32)){return -5}else{return 0}},
            tooltip: "log10 -> log5",
        },
        33: {
            title: "Decking III",
            description: "Multiply point gain based on Gardens",
            cost: (new Decimal(23)),
            unlocked() {return hasUpgrade('g', 32)},
            effect() {return player.g.points.dividedBy(2).add(1)},
            effectDisplay() {return "x"+format(upgradeEffect('g', 33))},
            tooltip: "(Gardens ÷ 2) + 1",
        },
        34: {
            title: "Decking IV",
            description: "Divide Garden costs based on Points",
            cost: (new Decimal(30)),
            unlocked() {return hasUpgrade('g', 33)},
            effect() {return player.points.add(5).log(5).pow(0.05)},
            effectDisplay() {return "÷"+format(upgradeEffect('g', 34))},
            tooltip: "log5(Points) ^ 0.05"
        },
        41: {
            title: "Half Whisky Barrel",
            description: "Raise Plant cost dividers to ^ 1.1",
            cost: (new Decimal(92)),
            unlocked() {return hasUpgrade('g', 34)},
        },
        42: {
            title: "Half Barrel Pond",
            description: "Reduce Prickly Pear base by 0.1",
            cost: (new Decimal(159)),
            unlocked() {return hasUpgrade('g', 41)},
        },
        43: {
            title: "Access to Pond for Wildlife",
            description: "Reduce Row 1 Garden Buyable Scaling by 3",
            cost: (new Decimal(189)),
            unlocked() {return hasUpgrade('g', 42)},
            effect() {if(hasUpgrade('g', 43)) {return hasUpgrade('w', 43) ? -5 : -3} else {return 0}}
        },
        44: {
            title: "Hot Tub",
            description: "Gardens Divide Zone Requirements",
            cost: (new Decimal(203)),
            unlocked() {return hasUpgrade('g', 43)},
            effect() {return player.g.points.add(1).pow(0.33)},
            effectDisplay() {return "÷"+format(upgradeEffect('g', 44))},
            tooltip: "Gardens ^ 0.33",
        },
        51: {
            title: "Arch",
            description: "Every π Seconds, Divide Garden Costs by 3, Changes Smoothly",
            cost: (new Decimal(9500)),
            unlocked() {return hasUpgrade('g', 44) && completionDecimal('re', 12).gte(1)},
            effect() {return new Decimal(new Decimal(player.timePlayed).sin()).add(2)},
            effectDisplay() {return "÷"+format(thisUpgradeEffect(this))},
            tooltip: "sin (time played) + 2",
        },
        52: {
            title: "Pergola",
            description: "Every 2π Seconds, Divide Garden Costs by 3, Changes Smoothly",
            cost: (new Decimal(11111)),
            unlocked() {return hasUpgrade('g', 51) && completionDecimal('re', 12).gte(2)},
            effect() {return new Decimal(new Decimal(player.timePlayed / 2).sin()).add(2)},
            effectDisplay() {return "÷"+format(thisUpgradeEffect(this))},
            tooltip: "sin (floor (time played / 2)) + 2",
        },
        53: {
            title: "Outhouse",
            description: "Every 3π Seconds, Multiply Leaf Gain by 9, Changes Smoothly",
            cost: (new Decimal(12500)),
            unlocked() {return hasUpgrade('g', 52) && completionDecimal('re', 12).gte(3)},
            effect() {return new Decimal(new Decimal(player.timePlayed / 3).sin()).add(2).pow(2)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "(sin (floor (time played / 2)) + 2) ^ 2",
        },
        54: {
            title: "Tipi",
            description: "Coming Soon...",
            cost: (new Decimal(28000)),
            unlocked() {return hasUpgrade('g', 52) && completionDecimal('re', 12).gte(3)},
        },
    },
    milestones: {
        0: {
            requirementDescription: "7 Gardens",
            effectDescription: "Plants don't reset anything, automatically reset for plants and unlock a new row of Plant upgrades",
            done() {return player.g.points.gte(7) && hasAchievement('a', 21)},
            unlocked() {return hasAchievement('a', 21)},
        },
        1: {
            requirementDescription: "44 Gardens",
            effectDescription: "Reduce \"Prickly Pear\" base by 0.1",
            done() {return player.g.points.gte(44)},
            unlocked() {return hasMilestone('g', 0)},
        },
    },
    buyables: {
        11: {
            title: "Water Features",
            cost(x) {let cost = new Decimal(100).add(new Decimal(x).times(10 + upgradeEffect('g', 43)))
            return cost},
            display() { return autoThisBuyableDisplay("Multiply Point Gain by Temperate Zone Completions. (free) Hold to buy max.", this)},
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 24)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return new Decimal(challengeCompletions('z', 21)).gte(1)},
            effect() {return new Decimal(challengeCompletions('z', 21)).add(1).pow(getBuyableAmount('g', 11))},
            tooltip() {return "Temp. Zone Completions + 1 ^ X. Currently Multiplying Point Gain when bought by x"+format(new Decimal(1).add(challengeCompletions('z', 21)))},
            buyMax() {
                let max = new Decimal(0)
                max = player.g.points.minus(100).dividedBy(10 + upgradeEffect('g', 43))
                if(max.gt(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max)
            },
        },
        12: {
            title: "Tunnel Features",
            cost(x) {let cost = new Decimal(100).add(new Decimal(x).times(10 + upgradeEffect('g', 43)))
            return cost},
            display() { return autoThisBuyableDisplay("Multiply Point Gain by Zones. (free) Hold to buy max.", this)},
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 24)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return new Decimal(challengeCompletions('z', 21)).gte(2)},
            effect() {return player.z.points.add(1).pow(getBuyableAmount('g', 12))},
            tooltip() {return "Zones + 1 ^ X. Currently Multiplying Point Gain when bought by x"+format(player.z.points.add(1))},
            buyMax() {
                let max = new Decimal(0)
                max = player.g.points.minus(100).dividedBy(10 + upgradeEffect('g', 43))
                if(max.gt(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max)
            },
        },
        13: {
            title: "Exploration Features",
            cost(x) {let cost = new Decimal(100).add(new Decimal(x).times(20 + upgradeEffect('g', 43)))
            return cost},
            display() { return autoThisBuyableDisplay("Multiply Point Gain based on total first row Garden Buyable Purchases. (free) Hold to buy max.", this)},
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 24)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return new Decimal(challengeCompletions('z', 21)).gte(3)},
            effect() {return getBuyableAmount('g', 11).add(getBuyableAmount('g', 12)).add(getBuyableAmount('g', 13)).root(2).pow(getBuyableAmount('g', 13))},
            tooltip() {return "(Total Purchases ^ 0.5) ^ X. Currently Multiplying Point Gain when bought by x"+format(getBuyableAmount('g', 11).add(getBuyableAmount('g', 12)).add(getBuyableAmount('g', 13)).root(2))},
            buyMax() {
                let max = new Decimal(0)
                max = player.g.points.minus(100).dividedBy(20 + upgradeEffect('g', 43))
                if(max.gt(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max)
            },
        },
        21: {
            title: "Educational Features",
            cost(x) {let cost = new Decimal(800).add(new Decimal(x).times(10))
            return cost},
            display() { return autoThisBuyableDisplay("Multiply Research Speed and Point gain by Research. (free) Hold to buy max.", this)},
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 24)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return player.g.best.gte(795)},
            effect() {return getBuyableAmount('g', 21).pow_base(player.r.points.add(1))},
            tooltip() {return "Currently Multiplying Research and Point Gain when bought by "+format(player.r.points.add(1))},
            buyMax() {
                let max = new Decimal(0)
                max = player.g.points.minus(800).dividedBy(10)
                if(max.gt(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max)
            },
        },
    },
}),
addLayer("z", {
    name: "zones", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Z", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#00AAFF",
    requires: new Decimal(250), // Can be a function that takes requirement increases into account
    resource: "zones", // Name of prestige currency
    baseResource: "plants", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.7, // Prestige currency exponent
    base() {
        let base = new Decimal(2)
        base = base.minus(1).times(buyableEffect('e', 11)).add(1)
        return base
    },
    canBuyMax: true,
    autoPrestige() {return hasMilestone('z', 9)},
    resetsNothing() {return hasMilestone('e', 3)},
    branches: ['p', 'g'],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return;
        
        let keep = [];
        if(hasAchievement('e', 13)) keep.push("milestones")
        if(hasAchievement('e', 22)) keep.push("challenges")
        if(hasUpgrade('z', 14)) keep.push("upgrades")
        layerDataReset(this.layer, keep);
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('g', 44)) mult=mult.dividedBy(upgradeEffect('g', 44))
        mult = mult.div(smartUpgradeEffect('w', 102))
        if(hasAchievement('re', 24)) mult = mult.div(player.re.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "z", description: "Z: Reset for Zones", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return tmp[this.layer].layerShown}},
    ],
    layerShown(){return hasUpgrade('g', 24)||player.z.best.gte(1) || hasMilestone('e', 7)},

    milestones: {
        0: {
            requirementDescription: "1 Zone",
            effectDescription: "Unlock 1: The Tropical Zone",
            done() {return player.z.points.gte(1)},
        },
        1: {
            requirementDescription: "2 Zones",
            effectDescription: "Unlock 2: The Alpine Zone",
            done() {return player.z.points.gte(2)},
        },
        2: {
            requirementDescription: "3 Zones",
            effectDescription: "Unlock 3: The Temperate Zone",
            done() {return player.z.points.gte(3)},
        },
        3: {
            requirementDescription: "4 Zones",
            effectDescription: "Unlock 4: The Forest Zone",
            done() {return player.z.points.gte(4)},
        },
        4: {
            requirementDescription: "5 Zones",
            effectDescription() {return "Gardens Reset Nothing and Divide Their Cost based on Zones | Currently: ÷"+format(player.z.points.dividedBy(2).add(1).root(2))},
            done() {return player.z.points.gte(5)},
            unlocked() {return hasMilestone('z', 3)},
        },
        5: {
            requirementDescription: "6 Zones",
            effectDescription: "Autobuy Tree of Life Buyables",
            done() {return player.z.points.gte(6)},
            unlocked() {return hasUpgrade('t', 21)},
        },
        6: {
            requirementDescription: "7 Zones",
            effectDescription: "Multiply Echinocactus Limit by 2 but Superscaling Starts",
            done() {return player.z.points.gte(7)},
            unlocked() {return hasMilestone('z', 5)},
        },
        7: {
            requirementDescription: "8 Zones",
            effectDescription: "Autobuy Echinocactus and Reduce its Cost",
            done() {return player.z.points.gte(8)},
            unlocked() {return hasMilestone('z', 6)},
        },
        8: {
            requirementDescription: "9 Zones",
            effectDescription: "Multiply Ecology Gain and 'Recycling' Cost by Zones",
            done() {return player.z.points.gte(9)},
            unlocked() {return hasMilestone('z', 7)},
            effect() {return player.z.points.add(1)},
        },
        9: {
            requirementDescription: "10 Zones",
            effectDescription: "Automatically Reset for Zones",
            done() {return player.z.points.gte(10)},
            unlocked() {return hasMilestone('z', 8)},
        },
        10: {
            requirementDescription: "20 Zones",
            effectDescription: "Generate 1% of Pending Fish Gain Every Second",
            done() {return player.z.points.gte(20)},
            unlocked() {return hasMilestone('z', 9)},
        },
        11: {
            requirementDescription: "25 Zones",
            effectDescription: "Unlock 4 Zone Upgrades Which Reset Plants on Purchase",
            done() {return player.z.points.gte(25)},
            unlocked() {return hasMilestone('z', 10)},
        },
    },
    challenges: {
        11: {
            name: "The Tropical Zone",
            challengeDescription: "Divide point gain by Plants",
            goalDescription() {return format(new Decimal(60).times(challengeCompletions('z', 11)).add(150))+" Plants. ("+format(challengeCompletions('z', 11))+"/3.00)"},
            rewardDescription: "Unlock new Content",
            completionLimit: 3,
            unlocked() {return hasMilestone('z', 0)},
            canComplete() {return player.p.points.gte(new Decimal(60).times(challengeCompletions('z', 11)).add(150))},
        },
        12: {
            name: "The Alpine Zone",
            challengeDescription: "Previous Challenge Effects and Gain is divided by and plant costs are multiplied by Prickly Pear purchases",
            goalDescription() {return format(new Decimal(100).times(challengeCompletions('z', 12)).add(185))+" Plants. ("+format(challengeCompletions('z', 12))+"/3.00)"},
            rewardDescription: "Unlock new Content",
            completionLimit: 3,
            unlocked() {return hasMilestone('z', 1)},
            canComplete() {return player.p.points.gte(new Decimal(100).times(challengeCompletions('z', 12)).add(185))},
            countsAs: [11],
        },
        21: {
            name: "The Temperate Zone",
            challengeDescription: "Previous Challenge Effects and Point Gain is divided by log10 Points",
            goalDescription() {return format(new Decimal(400).pow(new Decimal(challengeCompletions('z', 21)).root(5)).times(challengeCompletions('z', 21)).add(325))+" Plants. ("+format(challengeCompletions('z', 21))+"/3.00)"},
            rewardDescription: "Unlock new Content",
            completionLimit: 3,
            unlocked() {return hasMilestone('z', 2)},
            canComplete() {return player.p.points.gte(new Decimal(400).pow(new Decimal(challengeCompletions('z', 21)).root(5)).times(challengeCompletions('z', 21)).add(325))},
            countsAs: [11, 12],
        },
        22: {
            name: "The Forest Zone",
            challengeDescription: "Previous Challenge Effects and Saguaro is Unavailable",
            goalDescription() {return format(new Decimal(280).pow(new Decimal(challengeCompletions('z', 22)).root(5)).times(challengeCompletions('z', 22)).add(1100))+" Plants. ("+format(challengeCompletions('z', 22))+"/3.00)"},
            rewardDescription: "Unlock new Content",
            completionLimit: 3,
            unlocked() {return hasMilestone('z', 3)},
            canComplete() {return player.p.points.gte(new Decimal(280).pow(new Decimal(challengeCompletions('z', 22)).root(5)).times(challengeCompletions('z', 22)).add(1100))},
            countsAs: [11, 12, 21],
        },
    },
    upgrades: {
        11: {
            title: "European Inspired Zone",
            description: "Multiply Ecology Gain by Zones",
            cost: (new Decimal(26)),
            unlocked() {return hasMilestone('z', 11)},
            onPurchase() {player.p.points = new Decimal(0)},
            effect() {return player.z.points.add(1)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
        },
        12: {
            title: "African Inspired Zone",
            description: "Raise Research Time to a Power Based on Zones",
            cost: (new Decimal(27)),
            unlocked() {return hasMilestone('z', 11)},
            onPurchase() {player.p.points = new Decimal(0)},
            effect() {return player.z.points.add(30).log(30)},
            effectDisplay() {return "^"+format(thisUpgradeEffect(this))},
            tooltip: "log30 (Zones)",
        },
        13: {
            title: "Asian Inspired Zone",
            description: "Reduce the Plant Exponent by 0.01",
            cost: (new Decimal(28)),
            unlocked() {return hasMilestone('z', 11)},
            onPurchase() {player.p.points = new Decimal(0)},
            effect: 0.01
        },
        14: {
            title: "Americas Inspired Zone",
            description: "Coming Soon...",
            cost: (new Decimal(50)),
            unlocked() {return hasMilestone('z', 11)},
            onPurchase() {player.p.points = new Decimal(0)},
            tooltip: "Keep Zone Upgrades on Reset",
        },
    },
}),
addLayer("w", {
    name: "wildlife", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        large: new Decimal(0),
        fish: new Decimal(0),
        canBuy114: false
    }},
    color: "#0088AA",
    resource: "wildlife", // Name of prestige currency
    baseResource: "plants", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ['p', 'g', 'z'],
    autoUpgrade() {return hasMilestone('re', 0) && player.w.autoUpgrade},
    tooltip() {
        let tooltip = formatWhole(player.w.points)+" Wildlife"
        if(hasUpgrade('e', 14)) tooltip = tooltip + "<br><font size = -1>"+formatWhole(player.w.fish)+" Fish</font>"
        return tooltip
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "resource-display",
                "blank",
                ["buyables", [1]],
                "blank",
                "blank",
                ["upgrades", [1, 2, 3, 4, 5, 6, 7, 8]],
                "blank",
            ],
            unlocked() {return hasUpgrade('e', 14)},
        },
        "Fish": {
            content: [
                "main-display",
                ["buyables", [2]],
                ["display-text",
                 function() {return "<font size = +2>You Have "+format(player.w.fish)+" Fish.</font>"},
                ],
                "resource-display",
                "blank",
                "blank",
                ["upgrades", [9, 10, 11]],
                "blank",
            ],
            unlocked() {return hasUpgrade('e', 14)},
        },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return;
        
        let keep = [];
        if (layers[resettingLayer].row == 1) {keep.push("upgrades")};
        if (resettingLayer==='e' && hasAchievement('e', 12)) keep.push("upgrades")
        let keep114 = false
        if(hasUpgrade('w', 114)) keep114 = true
        layerDataReset(this.layer, keep);
        if(keep114) player.w.canBuy114 = true
    },      
    effectDescription() {let desc = "You are generating "+format(tmp.w.wildlifeGen)+" Wildlife every second. You keep Wildlife Upgrades on reset. "
        if(hasUpgrade('w', 33)) desc = desc + "You have "+format(player.w.large)+" Larger Wildlife which is Multiplying Point gain by x"+format(player.w.large.add(1).pow(0.5))+" and Wildlife gain by x"+format(player.w.large.add(1).pow(hasUpgrade('w', 54) ? 0.5 : 0.1))+". "
        return desc
    },
    update(diff) {
        gain = tmp.w.wildlifeGen
        if(hasUpgrade('w', 33)) {
            player.w.large=getLogisticAmount(player.w.large, player.w.points.pow(0.1).times(upgradeEffect('w', 14)).times(buyableEffect('r', 42)), 0.1, diff)
        }
        player.w.points=getLogisticAmount(player.w.points, gain, upgradeEffect('w', 22).times(hasUpgrade('w', 61) ? 0.02 : 0.095), new Decimal(diff).times(tmp.w.wildlifeSpeed))
        
        let passiveFish = new Decimal(0)
        if(hasMilestone('z', 10)) passiveFish = passiveFish.add(0.01)
        passiveFish = passiveFish.add(smartUpgradeEffect('w', 94, new Decimal(0)).times(0.01))
        if(buyableEffect('w', 21).gte(player.w.fish)) player.w.fish = player.w.fish.add(diff>toNumber(new Decimal(1).div(passiveFish)) ? buyableEffect('w', 21).minus(player.w.fish) : buyableEffect('w', 21).minus(player.w.fish).times(diff).times(passiveFish))
    },
    wildlifeGen() {
        let gain = new Decimal(0)
        if(challengeCompletions('z', 22) >= 3 || hasMilestone('e', 7)) gain = gain.add(player.p.points.root(hasUpgrade('p', 73) ? (hasUpgrade('r', 11) ? 1.1 : 1.5 ) : 2 ))
        if(hasUpgrade('w', 21)) gain = gain.add(player.g.points.root(2))
        
        if(hasUpgrade('w', 12)) gain = gain.times(upgradeEffect('w', 12))
        if(hasUpgrade('w', 32)) gain = gain.times(upgradeEffect('w', 32))
        if(hasUpgrade('w', 41)) gain = gain.times(upgradeEffect('w', 41))
        if(hasUpgrade('w', 13)) gain = gain.times(upgradeEffect('w', 13))
        if(hasUpgrade('w', 33)) gain = gain.times(player.w.large.add(1).pow(hasUpgrade('w', 54) ? 0.5 : 0.1))
        if(hasUpgrade('w', 23)) gain = gain.times(upgradeEffect('w', 23))
        if(hasUpgrade('w', 52)) gain = gain.times(upgradeEffect('w', 52))
        if(hasUpgrade('w', 34)) gain = gain.times(upgradeEffect('w', 34))
        if(hasUpgrade('w', 44)) gain = gain.times(upgradeEffect('w', 44))
        if(hasUpgrade('w', 62)) gain = gain.times(upgradeEffect('w', 62))
        gain = gain.times(buyableEffect('r', 12))
        gain = gain.times(gainUpgradeEffect('w', 73))
        gain = gain.times(gainUpgradeEffect('w', 82))
        gain = gain.times(smartUpgradeEffect('e', 12))
        gain = gain.times(smartUpgradeEffect('w', 93))
        gain = gain.times(smartUpgradeEffect('e', 22))
        if(hasAchievement('re', 11)) gain=gain . pow(1.1)
        
        if(inChallenge('re', 11)) gain = gain.pow(0.01)
        if(inChallenge('re', 11) && challengeCompletions('re', 11) >= 2) gain = gain.pow(10)
        return gain
    },
    wildlifeSpeed() {
        let speed = new Decimal(1)
        if(hasUpgrade('w', 24)) speed = speed.times(5)
        if(hasUpgrade('w', 24)) speed = speed.times(2)
        return speed
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return challengeCompletions('z', 22) >= 3 || hasMilestone('e', 7)},
    
    upgrades: {
        11: {
            title: "Log Pile",
            description: "Multiply Point gain based on Wildlife",
            cost: (new Decimal(1000)),
            effect() {return player.w.points.add(1).pow(0.3)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 11))},
            tooltip: "Wildlife ^ 0.3",
        },
        12: {
            title: "Pond",
            description: "Wildlife multiplies its own gain",
            cost: (new Decimal(1000)),
            unlocked() {return hasUpgrade('w', 11)},
            effect() {return player.w.points.add(10).log(10)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 12))},
            tooltip: "log10(Wildlife)",
        },
        13: {
            title: "Cave",
            description: "Multiply Wildlife Gain based on Magnitude",
            cost: (new Decimal("1.7e6")),
            unlocked() {return hasUpgrade('w', 12)},
            effect() {return player.points.add(10).log(10).floor().pow(0.5)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 13))},
            tooltip: "Magnitude ^ 0.5",
        },
        14: {
            title: "Meadow",
            description: "You gain twice as much Larger Wildlife",
            cost() {return hasUpgrade('w', 24) ? new Decimal("6.75e15") : new Decimal("5.55e11")},
            unlocked() {return hasUpgrade('w', 13)},
            effect() {return hasUpgrade('w', 14) ? 2 : 1},
            tooltip: "Cost Increases when Stronger Wildlife is Bought",
        },
        21: {
            title: "Bigger Wildlife",
            description: "Wildlife gain increased based on Gardens",
            cost: (new Decimal(3500)),
            effectDisplay() {return "+"+format(player.g.points.add(1).pow(0.5))},
            tooltip: "sqrt(Gardens)",
        },
        22: {
            title: "Longer Wildlife",
            description: "You lose half as much of your Wildlife every second",
            cost: (new Decimal(11000)),
            unlocked() {return hasUpgrade('w', 21)},
            effect() {if(hasUpgrade('w', 22)) {return new Decimal(0.5)} else {return new Decimal(1)}},
            tooltip: "10% -> 5%",
        },
        23: {
            title: "Faster Wildlife",
            description: "Multiply Wildlife gain by 'Exploration Features' Amount",
            cost: (new Decimal("6e8")),
            unlocked() {return hasUpgrade('w', 22)},
            effect() {return getBuyableAmount('g', 13).add(1)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 23))},
        },
        24: {
            title: "Stronger Wildlife",
            description: "Wildlife Time is 5x as Fast",
            cost() {return new Decimal(hasUpgrade('w', 14) ? "7.5e15" : "5.55e11")},
            unlocked() {return hasUpgrade('w', 23)},
            tooltip: "Wildlife gain x5 <u> after wildlife loss</u>. Cost increases when 'Meadow' is Bought",
        },
        31: {
            title: "Anteater",
            description: "Plant costs are Divided by Wildlife",
            cost: (new Decimal(4400)),
            unlocked() {return hasUpgrade('w', 11) && hasUpgrade('w', 21)},
            effectDisplay() {return "÷"+format(player.w.points.add(1))},
            tooltip: "Requires 'Log Pile' and 'Bigger Wildlife'",
        },
        32: {
            title: "Hedgehog",
            description: "Multiply Wildlife gain based on Zones",
            cost: (new Decimal(4500)),
            unlocked() {return hasUpgrade('w', 12) && hasUpgrade('w', 21)},
            effect() {return player.z.points.add(1).root(2)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 32))},
            tooltip: "sqrt(Zones). Requires 'Pond' and 'Bigger Wildlife'",
        },
        33: {
            title: "Bear",
            description: "Replace ^ 0.1 of Wildlife with Larger Wildlife every second which helps Multiply Point gain and Wildlife Gain",
            cost: (new Decimal("2.75e8")),
            unlocked() {return hasUpgrade('w', 13) && hasUpgrade('w', 21)},
            tooltip: "Point gain mult: LW ^ 0.5. Wildlife gain mult: LW ^ 0.1. Requires 'Cave' and 'Bigger Wildlife'",
        },
        34: {
            title: "Roe Deer",
            description: "Multiply Wildlife gain Based on Points",
            cost() {return new Decimal("6.5e11")},
            unlocked() {return hasUpgrade('w', 14) && hasUpgrade('w', 21)},
            effect() {return player.points.add(1).log(3).root(3)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 34))},
            tooltip: "3rt (log3 (Points)). Requires 'Meadow' and 'Bigger Wildlife'",
        },
        41: {
            title: "Woodlice",
            description: "Multiply Point and Wildlife Gain based on Points and Wildlife",
            cost: (new Decimal(23000)),
            unlocked() {return hasUpgrade('w', 11) && hasUpgrade('w', 22)},
            effect() {return player.points.add(2).pow(0.05).log(20).times(player.w.points.add(2).pow(0.25).log(4))},
            effectDisplay() {return "x"+format(upgradeEffect('w', 41))},
            tooltip: "log20 (Points ^ 0.05) x lo4(Wildlife ^ 0.25). Requires 'Log Pile' and 'Longer Wildlife'",
        },
        42: {
            title: "Dragonfly",
            description: "Autobuy Saguaro and Divide its cost by Wildlife x Plants x its Amount",
            cost: (new Decimal("1.5e6")),
            unlocked() {return hasUpgrade('w', 12) && hasUpgrade('w', 22)},
            effect() {return player.w.points.add(1).times(player.p.points.add(1)).times(getBuyableAmount('p', 12).add(1))},
            effectDisplay() {return "x"+format(upgradeEffect('w', 42))},
            tooltip: "Requires 'Pond' and 'Longer Wildlife'",
        },
        43: {
            title: "Olm",
            description: "Reduce Garden Buyable Cost scaling by 2",
            cost: (new Decimal("4e8")),
            unlocked() {return hasUpgrade('w', 13) && hasUpgrade('w', 22)},
        },
        44: {
            title: "Field Mouse",
            description: "'Nutrients' affects Wildlife Gain at a Reduced Rate",
            cost() {return new Decimal("1.11e13")},
            unlocked() {return hasUpgrade('w', 14) && hasUpgrade('w', 22)},
            effect() {return buyableEffect('w', 11).add(2).log(2).root(2)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 44))},
            tooltip: "sqrt (log2 (Effect)). Requires 'Meadow' and 'Longer Wildlife'",
        },
        51: {
            title: "Centipede",
            description: "Unlock a Larger Wildlife Buyable",
            cost: (new Decimal("1e10")),
            unlocked() {return hasUpgrade('w', 11) && hasUpgrade('w', 23)},
            tooltip: "Requires 'Log Pile' and 'Faster Wildlife'",
        },
        52: {
            title: "Pond Skater",
            description: "Plants Boost Wildlife Gain",
            cost: (new Decimal("1.55e10")),
            unlocked() {return hasUpgrade('w', 12) && hasUpgrade('w', 23)},
            effect() {return player.p.points.add(1).pow(0.3)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 52))},
            tooltip: "Plants ^ 0.3. Requires 'Pond' and 'Faster Wildlife'",
        },
        53: {
            title: "Rabbit",
            description: "Divide Garden Costs based on Wildlife (Boosted by Large Wildlife)",
            cost: (new Decimal("3.33e11")),
            unlocked() {return hasUpgrade('w', 13) && hasUpgrade('w', 23)},
            effect() {return player.w.points.times(player.w.large).log(10).pow(0.1)},
            effectDisplay() {return "÷"+format(upgradeEffect('w', 53))},
            tooltip: "(log10 (Wildlife × LW)) ^ 0.1. Requires 'Cave' and 'Faster Wildlife' (R:ab:bit)",
        },
        54: {
            title: "Kestrel",
            description: "Larger Wildlife -> Wildlife effect is Better",
            cost() {return new Decimal("3.33e14")},
            unlocked() {return hasUpgrade('w', 14) && hasUpgrade('w', 23)},
            tooltip: "^ 0.1 -> ^ 0.5. Requires 'Meadow' and 'Faster Wildlife'",
        },
        61: {
            title: "Wood Ant",
            description: "Wildlife Time x2 and Lose 20% as much Wildlife",
            cost() {return new Decimal("6.246e11")},
            unlocked() {return hasUpgrade('w', 11) && hasUpgrade('w', 24)},
            tooltip: "Requires 'Log Pile' and 'Stronger Wildlife'",
        },
        62: {
            title: "Swan",
            description: "Saguaro Multiplies Wildlife Gain at a Reduced Rate",
            cost() {return new Decimal("3.5e12")},
            unlocked() {return hasUpgrade('w', 12) && hasUpgrade('w', 24)},
            effect() {return buyableEffect('p' ,12).pow(0.5).log(2)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 62))},
            tooltip: "log2 (Effect ^ 0.5). Requires 'Pond' and 'Stronger Wildlife'",
        },
        63: {
            title: "Alligator",
            description: "Larger Wildlife 'Point Mult' also Divides Plant Costs",
            cost() {return new Decimal("5.75e15")},
            unlocked() {return hasUpgrade('w', 13) && hasUpgrade('w', 24)},
            tooltip: "Requires 'Cave' and 'Stronger Wildlife'",
        },
        64: {
            title: "Fox",
            description: "Unlock Research",
            cost() {return new Decimal("4.44e20")},
            unlocked() {return hasUpgrade('w', 14) && hasUpgrade('w', 24)},
            tooltip: "Requires 'Meadow' and 'Stronger Wildlife'",
        },
        71: {
            title: "Fire Ant",
            description: "Wildlife Time Affects Research",
            cost: (new Decimal("2e21")),
            unlocked() {return hasUpgrade('w', 11) && getBuyableAmount('r', 12).gte(2)},
            tooltip: "Requires 'Log Pile' and 'Wildlife Booster' x2",
        },
        72: {
            title: "Raccoon",
            description: "Research Time Boosts itself",
            cost: (new Decimal("3e22")),
            unlocked() {return hasUpgrade('w', 12) && getBuyableAmount('r', 12).gte(2)},
            effect() {return tmp.r.baseAmount.add(1).pow(0.25)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 72))},
            tooltip: "Time ^ 0.25. Requires 'Pond' and 'Wildlife Booster' x2",
        },
        73: {
            title: "Bat",
            description: "Research Time Multiplies Wildlife Gain",
            cost: (new Decimal("7e22")),
            unlocked() {return hasUpgrade('w', 13) && getBuyableAmount('r', 12).gte(2)},
            effect() {return tmp.r.baseAmount.add(1).pow(0.2)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 73))},
            tooltip: "Time ^ 0.2. Requires 'Cave' and 'Wildlife Booster' x2",
        },
        74: {
            title: "Badger",
            description: "Larger Wildlife Effect also Multiplies Research Time Gain",
            cost: (new Decimal("1e24")),
            unlocked() {return hasUpgrade('w', 14) && getBuyableAmount('r', 12).gte(2)},
            effect() {return player.w.large.add(1).pow(0.5)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 74))},
            tooltip: "Requires 'Meadow' and 'Wildlife Booster' x2",
        },
        81: {
            title: "Spider",
            description: "Every Upgrade in this Row Doubles Research Speed",
            cost: (new Decimal("1e86")),
            unlocked() {return hasUpgrade('w', 11) && hasUpgrade('r', 24)},
            effect() {return new Decimal(hasUpgrade('w', 81) ? 2:1).times(hasUpgrade('w', 82) ? 2:1).times(hasUpgrade('w', 83) ? 2:1).times(hasUpgrade('w', 84) ? 2:1)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 81))},
            tooltip: "Requires 'Log Pile' and 'Smarter Wildlife'",
        },
        82: {
            title: "Newt",
            description: "Research Effect Multiplies Wildlife Gain at a Reduced Rate",
            cost: (new Decimal("2e87")),
            unlocked() {return hasUpgrade('w', 12) && hasUpgrade('r', 24)},
            effect() {return player.r.points.pow(10)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 82))},
            tooltip: "Effect ^ 0.1. Requires 'Pond' and 'Smarter Wildlife'",
        },
        83: {
            title: "Meerkat",
            description: "Increase Nutrients Limit by 5",
            cost: (new Decimal("1.5e119")),
            unlocked() {return hasUpgrade('w', 13) && hasUpgrade('r', 24)},
            effect() {return hasUpgrade('w', 83) ? 5 : 0},
            tooltip: "Requires 'Cave' and 'Smarter Wildlife'",
        },
        84: {
            title: "Owl",
            description: "Multiply Research Speed by Zones",
            cost: (new Decimal("5e133")),
            unlocked() {return hasUpgrade('w', 14) && hasUpgrade('r', 24)},
            effect() {return player.z.points.add(1)},
            effectDisplay() {return "x"+format(upgradeEffect('w', 84))},
            tooltip: "Requires 'Meadow' and 'Smarter Wildlife'",
        },
        91: {
            title: "Rudd",
            description: "Point Gain is Multiplied Based on Fish",
            cost: (new Decimal(1)),
            effect() {return player.w.fish.add(1).pow(1000)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "Fish ^ 1000",
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        92: {
            title: "Roach",
            description: "Multiply Research Time Based on Fish",
            cost: (new Decimal(50)),
            effect() {return player.w.fish.add(1).pow(100)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "Fish ^ 100",
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        93: {
            title: "Gudgeon",
            description: "Multiply Wildlife Gain Based on Fish",
            cost: (new Decimal(250)),
            effect() {return player.w.fish.add(1).pow(10)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "Fish ^ 10",
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        94: {
            title: "Stickleback",
            description: "Increase Passive Fish Generation (20 Zones) by 1% per Ecosystem",
            cost: (new Decimal(350)),
            effect() {return player.e.points},
            effectDisplay() {return "+"+format(thisUpgradeEffect(this))+"%"},
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        101: {
            title: "Bream",
            description: "Divide Plant Costs Based on Fish",
            cost: (new Decimal(1111)),
            unlocked() {return hasUpgrade('w', 91)},
            effect() {return player.w.fish.add(1).pow(2000)},
            effectDisplay() {return "÷"+format(thisUpgradeEffect(this))},
            tooltip: "Fish ^ 2000",
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        102: {
            title: "Rainbow Trout",
            description: "Divide Zone Requirements Based on Research Requirement Multiplier",
            cost: (new Decimal(1750)),
            unlocked() {return hasUpgrade('w', 92)},
            effect() {return new Decimal(1).div(tmp.r.requires).add(1).log(2).root(2)},
            effectDisplay() {return shiftDown ? "÷"+thisUpgradeEffect(this) : "÷"+format(thisUpgradeEffect(this))},
            tooltip: "2rt (log2 (Mult))",
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        103: {
            title: "Common Carp",
            description: "Fish Multiply Their own Gain",
            cost: (new Decimal(5555)),
            unlocked() {return hasUpgrade('w', 93)},
            effect() {return player.w.fish.add(10).log(10)},
            effectDisplay() {return shiftDown ? "x"+thisUpgradeEffect(this) : "x"+format(thisUpgradeEffect(this))},
            tooltip: "log10 (Fish)",
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        104: {
            title: "Eel",
            description: "Double 'Recycling' Limit but Superscaling Starts",
            cost: (new Decimal(32000)),
            unlocked() {return hasUpgrade('w', 94)},
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        111: {
            title: "Pike",
            description: "Multiply Point Gain based on Plants",
            cost: (new Decimal(88000)),
            unlocked() {return completionDecimal('re', 11).gte(1)},
            effect() {return player.p.points.add(1).pow(500)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "Plants ^ 500",
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        112: {
            title: "Largemouth Bass",
            description: "Fish Nerf Plant Cost Exponent",
            cost: (new Decimal(95000)),
            unlocked() {return completionDecimal('re', 11).gte(2)},
            effect() {return new Decimal(1).div(player.w.fish.add(50).log(50).root(50))},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "50rt (log50 (Fish))",
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        113: {
            title: "Tench",
            description: "Multiply Ecology Gain Based on Fish",
            cost: (new Decimal(106000)),
            unlocked() {return completionDecimal('re', 11).gte(3)},
            effect() {return player.w.fish.add(2).log(2).floor()},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "floor (log2 (Fish))",
            currencyDisplayName: "Fish",
            currencyInternalName: "fish",
            currencyLayer: "w",
        },
        114: {
            title: "Koi",
            description: "Multiply Leaf Gain by 100, Effect Decays over Ecosystem Reset",
            cost: (new Decimal(10)),
            unlocked() {return hasAchievement('re', 13)},
            effect() {return new Decimal(100).root(new Decimal(player.e.resetTime + 1).root(2))},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "(sqrt (Reset Time))rt (100)",
            currencyDisplayName: "Fish (Only Purchasable once Bought in 'Coral Reef')",
            currencyInternalName: "fish",
            currencyLayer: "w",
            onPurchase() {player.w.canBuy114 = true},
            canAfford() {return inChallenge('re', 11) || player.w.canBuy114},
        },
    },
    buyables: {
        11: {
            title: "Nutrients",
            cost(x) {let cost = new Decimal(10).times(x.dividedBy(2).add(1).pow(2))
            return cost},
            display() { return autoThisBuyableDisplay("Divide Saguaro cost based on points. Only Reduces Large Wildlife by 10% of Cost. Hold to buy max.", this, " Larger Wildlife", "/"+format(tmp.w.buyables[11].purchaseLimit))},
            canAfford() { return player.w.large.gte(this.cost()) },
            buy() {
                player.w.large = player.w.large.minus(this.cost().times(0.1))
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return hasUpgrade('w', 51)},
            purchaseLimit() {return (hasUpgrade('r', 14) ? (hasUpgrade('r', 15) ? 40 : 35 ) : 30) + upgradeEffect('w', 83) + smartUpgradeEffect('r', 31, 0)},
            effect() {return player.points.add(1).pow(getBuyableAmount('w', 11).dividedBy(100))},
            tooltip() {return "Points ^ N where N is X ÷ 100. Currently: ÷"+format(buyableEffect('w', 11))},
        },
        21: {
            title: "Find Fish",
            display() {return tmp.w.buyables[21].canAfford ? "Reset Ecology and Wildlife to Gain <br><font size = +2>"+format(thisBuyableEffect(this).minus(player.w.fish))+"</font><br> Fish" : "Next in "+format(player.w.fish.minus(thisBuyableEffect(this)))+" Fish<br>Fish Gain is Based on Wildlife and Ecology"},
            canAfford() {return thisBuyableEffect(this).gte(player.w.fish)},
            buy() {
                player.w.fish = thisBuyableEffect(this)
                player.w.points = new Decimal(0)
                player.w.large = new Decimal(0)
                player.e.ecology = new Decimal(0)
            },
            effect() {
                let gain = player.w.points.add(1).log("1e100").add(player.w.points.dividedBy("1e1000").add(1).log("1e10")).times(player.e.ecology.add(1).log(10)).minus(100)
                if(hasAchievement('re', 13)) gain = gain.add(100)
                gain = gain.times(smartUpgradeEffect('r', 34))
                gain = gain.times(smartUpgradeEffect('w', 103))
                return gain
            },
        },
    },
}),
addLayer("r", {
    name: "research", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        researchers: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
    }},
    color: "#CCCCCC",
    requires() {
        let req = new Decimal(1)
        req = req.dividedBy(buyableEffect('r', 11))
        req = req.dividedBy(buyableEffect('r', 13))
        req = req.dividedBy(buyableEffect('r', 22))
        return req
    },
    resource: "Research", // Name of prestige currency
    baseResource: "Seconds", // Name of resource prestige is based on
    baseAmount() {
        let amt = new Decimal(player.r.resetTime)
        amt = amt.times(buyableEffect('r', 21))
        if(hasUpgrade('w', 71)) amt = amt.times(tmp.w.wildlifeSpeed)
        amt = amt.times(gainUpgradeEffect('w', 72))
        amt = amt.times(gainUpgradeEffect('w', 74))
        amt = amt.times(gainUpgradeEffect('r', 12))
        amt = amt.times(gainUpgradeEffect('r', 13))
        amt = amt.times(gainUpgradeEffect('r', 14))
        amt = amt.times(player.r.researchers.add(1))
        amt = amt.times(gainUpgradeEffect('r', 15))
        amt = amt.times(buyableEffect('g', 21))
        amt = amt.times(gainUpgradeEffect('w', 81))
        amt = amt.times(gainUpgradeEffect('w', 84))
        amt = amt.times(smartUpgradeEffect('t', 11))
        amt = amt.times(smartUpgradeEffect('t', 43))
        amt = amt.times(smartUpgradeEffect('t', 73))
        amt = amt.times(smartUpgradeEffect('t', 72))
        amt = amt.times(smartUpgradeEffect('w', 92))
        if(hasAchievement('a', 83)) amt = amt.times(2)
        amt = amt.pow(smartUpgradeEffect('e', 11))
        amt = amt.pow(smartUpgradeEffect('z', 12))
        if(inChallenge('re', 11) && challengeCompletions('re', 11) >= 1) amt = amt.pow(0.01)
        if(inChallenge('re', 11) && challengeCompletions('re', 11) >= 2) amt = amt.pow(10)
        return amt
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return 1.5-smartUpgradeEffect('e', 21, 0) + (inCompletion('re', 21, 0)?1:0)}, // Prestige currency exponent
    base() {return 2 - smartUpgradeEffect('t', 13, 0)},
    canBuyMax: true,
    effectDescription() {return "Multiplying Point gain by "+format(player.r.points.add(1).pow(hasUpgrade('r', 22) ? 100 : 3))},
    branches: [],
    deactivated() {return inCompletion('re', 12, 0)},
    update(diff) {
        if(!tmp.r.layerShown) player.r.resetTime = 0
        player.r.researchers = player.r.researchers.add(buyableEffect('r', 32).times(diff))
    },
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= 1 || resettingLayer === 'r') return;
        
        let keep = [];
        if(hasAchievement('e', 14)) keep.push("upgrades")
        layerDataReset(this.layer, keep)
        
        if(resettingLayer==='e' && hasAchievement('e', 11) && !player[this.layer].upgrades.includes(14)) player[this.layer].upgrades.push(14) 
    },
    automate() {
        if(hasUpgrade('r', 14)) buyBuyable('p', 11)
        if(hasUpgrade('r', 15)) buyBuyable('w', 11)
        if(hasAchievement('re', 21)) buyBuyable('r', 41)
        if(hasAchievement('re', 22)) buyBuyable('r', 42)
        if(hasAchievement('re', 23)) buyBuyable('r', 43)
    },
    
    tabFormat: [
    "main-display",
    "prestige-button",
    ["display-text",
        function() {return 'If you wrote 3 digits per second, it would take you approximately '+format(tmp.r.baseAmount.log(10).floor().dividedBy(3))+' seconds to write down your time spent researching.'}],
    "blank",
    "blank",
    ["display-text",
        'Linear'],
    ["bar", "bar1"],
    "blank",
    ["display-text",
        'Logarithmic'],
    ["bar", "bar2"],
    "blank",
    "blank",
    "buyables",
    "blank",
    "blank",
    "upgrades"
    ],
    autoPrestige: true,
    resetsNothing() {return hasMilestone('t', 4) || player.e.best.gte(1)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
               return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('w', 64)||player.r.best.gte(1)||player.e.best.gte(1)},   
    bars: {
        bar1: {
            direction: RIGHT,
            width: 600,
            height: 50,
            instant: true,
            progress() {return new Decimal(tmp.r.baseAmount).dividedBy(getNextAt(this.layer, true))},
        },
        bar2: {
            direction: RIGHT,
            width: 300,
            height: 25,
            instant: true,
            progress() {return new Decimal(tmp.r.baseAmount.dividedBy(tmp.r.getPrevAt)).log(2).dividedBy(getNextAt(this.layer, true).dividedBy(tmp.r.getPrevAt).log(2))},
        },
        
    },
    getPrevAt() {
        return (new Decimal(tmp.r.base).pow(player.r.points.minus(1).pow(tmp.r.exponent)).times(tmp.r.requires))
    },
    buyables: {
        11: {
            title: "Requirement Reduction",
            cost(x) {let cost = new Decimal(2).times(x.add(1))
            return cost},
            display() { return autoThisBuyableDisplay("Divide Research Requirement by "+format(getBuyableAmount('r', 23).add(2))+". Hold to buy max.", this, " Research")},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 11).pow_base(getBuyableAmount('r', 23).add(2))},
            tooltip() {return "Currently: ÷"+format(buyableEffect('r', 11))},
            buyMax() {
                let max = player.r.points.div(2).sub(1)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        12: {
            title: "Wildlife Booster",
            cost(x) {let cost = new Decimal(3).times(x.add(2))
            return cost},
            display() { return autoThisBuyableDisplay("Multiply Wildlife gain by "+format(getBuyableAmount('r', 23).add(2))+".<br> Unlocks more Wildlife Upgrades after 2 Purchases.<br> Hold to buy max.", this, " Research")},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 12).pow_base(getBuyableAmount('r', 23).add(2))},
            tooltip() {return "Currently: x"+format(buyableEffect('r', 12))},
            buyMax() {
                let max = player.r.points.div(3).sub(2)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        13: {
            title: "Requirement Reduction II",
            cost(x) {let cost = new Decimal(2).times(x.add(2))
            return cost},
            display() { return autoThisBuyableDisplay("Divide Research Requirement by Research. Hold to buy max.", this, " Research")},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 13).pow_base(player.r.points.add(1))},
            tooltip() {return "Currently: ÷"+format(buyableEffect('r', 13))},
            buyMax() {
                let max = player.r.points.div(2).sub(2)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        21: {
            title: "Time Speed Increase",
            cost(x) {let cost = new Decimal(5).times(x.add(1))
            return cost},
            display() { return autoThisBuyableDisplay("Multiply Research Time Gain by "+format(getBuyableAmount('r', 31).times(2).add(3))+". Hold to buy max.", this, " Research")},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 21).pow_base(getBuyableAmount('r', 31).times(2).add(3))},
            tooltip() {return "Currently: x"+format(buyableEffect('r', 21))},
            buyMax() {
                let max = player.r.points.div(5).sub(1)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        22: {
            title: "Advanced Requirement Reduction",
            cost(x) {let cost = new Decimal(hasUpgrade('r', 21) ? 9 : 10).times(x.add(50))
            return cost},
            display() { return autoThisBuyableDisplay("Divide Research Requirement Based on Plants. (free) Hold to buy max.", this, " Gardens")},
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 22).pow_base(player.p.points.add(10).log(10))},
            tooltip() {return "Currently: ÷"+format(buyableEffect('r', 22))+". Currently Dividing by "+format(player.p.points.add(10).log(10))+" When Bought"},
            buyMax() {
                let max = player.g.points.div(hasUpgrade('r', 21) ? 9 : 10).sub(50)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        23: {
            title: "Wildlife Superbooster",
            cost(x) {let cost = new Decimal(2).times(x.add(2))
            return cost},
            display() { return autoThisBuyableDisplay("Increase Requirement Reduction and Wildlife Booster Base by 1. Hold to buy max.", this, " Wildlife Boosters")},
            canAfford() { return getBuyableAmount('r', 12).gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) addBuyables('r', 12, (this.cost().times(-1)))
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            tooltip() {return "Currently: +"+format(getBuyableAmount('r', 23))+". "},
            buyMax() {
                let max = getBuyableAmount('r', 12).div(2).sub(2)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        31: {
            title: "Time Speed Superincrease",
            cost(x) {let cost = new Decimal(2).times(x.add(2.5))
            return cost},
            display() { return autoThisBuyableDisplay("Increase Time Speed Increase Base by 2. Hold to buy max.", this, " Time Speed Increases")},
            canAfford() { return getBuyableAmount('r', 21).gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) addBuyables('r', 21, (this.cost().times(-1)))
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            unlocked() {return player.r.best.gte(25)},
            tooltip() {return "Currently: +"+format(getBuyableAmount('r', 31).times(2))+". "},
            buyMax() {
                let max = getBuyableAmount('r', 21).div(2).sub(2.5)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        32: {
            title: "Researchers",
            cost(x) {let cost = new Decimal(5 + upgradeEffect('r', 23)).times(x.add(7))
            return cost},
            display() { return autoThisBuyableDisplay("Find Researchers to help. Researchers Multiply Research Gain by Researchers + 1. You have "+format(player.r.researchers)+" Researchers. Hold to buy max.", this, " Research")},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 32).pow_base(2).times(getBuyableAmount('r', 32)).times(buyableEffect('r', 33))},
            unlocked() {return player.r.best.gte(38)},
            tooltip() {return "Currently: +"+format(buyableEffect('r', 32))+"/sec."},
            buyMax() {
                let max = player.r.points.div(5 + upgradeEffect('r', 23)).sub(7)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        33: {
            title: "Research Booster",
            cost(x) {let cost = new Decimal(10 + upgradeEffect('r', 23)).times(x.add(5))
            return cost},
            display() {return autoThisBuyableDisplay("Reset Researchers but Multiply Their Gain based on Research Time. Hold to Buy Max.", this, " Research")},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.researchers = new Decimal(0)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 33).pow_base(tmp.r.baseAmount.add(1).log(10))},
            unlocked() {return player.r.best.gte(53)},
            tooltip() {return "Currently: x"+format(buyableEffect('r', 33))+". Currently Multiplying by "+format(tmp.r.baseAmount.add(1).log(10))+" When Bought"},
            buyMax() {
                let max = player.r.points.div(10 + upgradeEffect('r', 23)).sub(5)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        41: {
            title: "Plant Division",
            cost(x) {let cost = new Decimal(10).times(x.add(10))
            return cost},
            display() {return autoThisBuyableDisplay("Divide Plant Costs Based on Researchers. Hold to Buy Max.", this, " Research")},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.researchers = new Decimal(0)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount(this.layer, this.id).pow_base(player.r.researchers.add(1).log(10))},
            unlocked() {return hasAchievement('re', 21)},
            tooltip() {return "Currently: x"+format(buyableEffect('r', 41))+". "},
            buyMax() {
                let max = player.r.points.div(10).sub(10)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        42: {
            title: "Genetic Modification",
            cost(x) {let cost = new Decimal(50).times(x.add(10))
            return cost},
            display() {return autoThisBuyableDisplay("Larger Wildlife Gain is Multiplied by Research. Hold to Buy Max.", this, " Research")},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.researchers = new Decimal(0)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount(this.layer, this.id).pow_base(player.r.points)},
            unlocked() {return hasAchievement('re', 22)},
            tooltip() {return "Currently: x"+format(buyableEffect('r', 42))+". "},
            buyMax() {
                let max = player.r.points.div(50).sub(10)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
        43: {
            title: "Upcycling",
            cost(x) {let cost = new Decimal(10).times(x.add(10))
            return cost},
            display() {return autoThisBuyableDisplay("Garden Costs are Divided by This Buyable's Amount. Hold to Buy Max.", this, " Research")},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                if(hasAchievement('e', 25)) {
                    buyMaxBuyable(this.layer, this.id)
                    return;
                }
                if(!hasUpgrade('t', 14)) player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.researchers = new Decimal(0)
                player.r.resetTimes = 0
            },
            effect() {return getBuyableAmount(this.layer, this.id).add(1)},
            unlocked() {return hasAchievement('re', 23)},
            tooltip() {return "Currently: ÷"+format(buyableEffect('r', 43))+". "},
            buyMax() {
                let max = player.r.points.div(10).sub(10)
                if(max.gte(thisBuyableAmount(this))) setBuyableAmount(this.layer, this.id, max.add(1).floor())
            },
        },
    },
    upgrades: {
        11: {
            title: "Wildlife Conversion Booster",
            description: "Plants -> Wildlife Conversion is Better",
            cost: (new Decimal(11)),
            tooltip: "1.5rt Plants -> 1.1rt Plants",
        },
        12: {
            title: "Wildlife-Friendly Fertilizer",
            description: "Plants Boost Research Time Gain",
            cost: (new Decimal(19)),
            effect() {return player.p.points.add(1).pow(0.3)},
            effectDisplay() {return "x"+format(upgradeEffect('r', 12))},
            tooltip: "Plants ^ 0.3",
        },
        13: {
            title: "Point Research Facility",
            description: "Points Boost Research Time Gain",
            cost: (new Decimal(23)),
            effect() {return player.points.add(3000).log(5).log(5)},
            effectDisplay() {return "x"+format(upgradeEffect('r', 13))},
            tooltip: "log5 (log5 (Points))",
        },
        14: {
            title: "Plant Robotics",
            description: "Autobuy Prickly Pear, Increase 'Nutrients' limit by 5 and Research Time is Multiplied Based on it's Magnitude",
            cost: (new Decimal(27)),
            effect() {return tmp.r.baseAmount.add(1).log(10).floor().pow_base(1.6)},
            effectDisplay() {return "x"+format(upgradeEffect('r', 14))},
            tooltip: "Uses '1.6 ^' Instead of '2 ^' Plant Robotics Magnitude is Separate and unaffected by 'Parsley'",
        },
        15: {
            title: "Plant Robotics Mk II",
            description: "Multiply Research Time by Wildlife Boosters, Autobuy Nutrients and Increase its Limit by 5",
            cost: (new Decimal(49)),
            effect() {return getBuyableAmount('r', 12).add(1)},
        },
        21: {
            title: "Resource Abundance",
            description: "Reduce 'Advanced Requirement Reduction' Cost scaling to 9",
            cost: (new Decimal(59)),
            unlocked() {return hasUpgrade('r', 15)},
        },
        22: {
            title: "Refining Research",
            description: "Research Effect is <u>Much</u> Better",
            cost: (new Decimal(67)),
            unlocked() {return hasUpgrade('r', 15)},
            tooltip: "^ 3 -> ^ 100"
        },
        23: {
            title: "Research Superbooster",
            description: "Researcher Based Buyables' Cost Scaling is Reduced by 1",
            cost: (new Decimal(89)),
            unlocked() {return hasUpgrade('r', 15)},
            effect() {return hasUpgrade('r', 23) ? -1 : 0},
        },
        24: {
            title: "Smarter Wildlife",
            description: "Unlock 4 New Wildlife Upgrades",
            cost: (new Decimal(97)),
            unlocked() {return hasUpgrade('r', 15)},
        },
        25: {
            title: "Scientific Breakthrough",
            description: "Unlock Trees",
            cost: (new Decimal(120)),
            unlocked() {return hasUpgrade('r', 15)},
            tooltip: "Trees are Part of the Plant Layer",
        },
        31: {
            title: "Light Strengthener",
            description: "Increase Nutrients Limit by 5",
            cost: (new Decimal(335)),
            unlocked() {return hasUpgrade('t', 83)},
            effect() {return 5},
        },
        32: {
            title: "Air-Diluted Water",
            description: "Multiply Leaf Gain based on Their own Magnitude",
            cost: (new Decimal(344)),
            unlocked() {return hasUpgrade('t', 83)},
            effect() {return player.t.leaves.add(10).log(10).floor().pow_base(1.6)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "Also known as 'Bubbles', same as 'Plant Robotics'",
        },
        33: {
            title: "Light-Leaf Penetration",
            description: "Actually Buy Max Prickly Pears",
            cost: (new Decimal(375)),
            unlocked() {return hasUpgrade('t', 83)},
        },
        34: {
            title: "Fishing Pole",
            description: "Multiply Fish Gain Based on Research",
            cost: (new Decimal(1130)),
            unlocked() {return hasUpgrade('e', 21)},
            effect() {return player.r.points.div(100).root(2).div(5).add(1)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "sqrt (Research ÷ 100) ÷ 5 + 1",
        },
        35: {
            title: "Lure",
            description: "Multiply Ecology Gain Based on Fish",
            cost: (new Decimal(2600)),
            unlocked() {return hasUpgrade('e', 21)},
            effect() {return player.w.fish.add(2).log(2).root(2)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "sqrt (log2 (Fish))",
        },
    },
}),
addLayer("t", {
    name: "trees", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        leaves: new Decimal(0),
        resetTime: 0,
    }},
    color: "#278000",
    requires() {
        let req = new Decimal("1e2700")
        req = req.dividedBy(hasUpgrade('t', 12) ? player.t.leaves.times(0.01).add(1).pow(100) : 1)
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "trees", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base() {let base = new Decimal("1e10")
    return base},
    milestonePopups() {return !player.re.best.gte(1)},
    canBuyMax: true,
    autoUpgrade() {return player.t.autoUpgrade && hasMilestone('re', 1)},
    autoPrestige() {return hasMilestone('g', 0) && !(hasMilestone('t', 0) && player.t.bulk && getResetGain('t').lt(10))},
    resetsNothing() {return hasMilestone('g', 0)},
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        "blank",
        ["upgrades", [1, 2]],
        "blank",
        ["buyables", [1]],
        "blank",
        ["upgrades", [3, 4, 5]],
        "blank",
        ["milestones", [0, 1, 2, 3, 4]],
        "blank",
        ["upgrades", [6]],
        "blank",
        ["upgrades", [7, 8, 9]],
    ],
    effect() {return player.t.points.add(1).pow(10 + smartUpgradeEffect('t', 14, 0))},
    automate() {
        if(hasUpgrade('t', 13)) {
            buyBuyable('r', 11)
            buyBuyable('r', 12)
            buyBuyable('r', 13)
            buyBuyable('r', 21)
            buyBuyable('r', 22)
            buyBuyable('r', 23)
            buyBuyable('r', 31)
            buyBuyable('r', 32)
            buyBuyable('r', 33)
        }
        if(hasMilestone('t', 1)) {
            buyBuyable('g', 11)
            buyBuyable('g', 12)
            buyBuyable('g', 13)
            buyBuyable('g', 21)
        }
        if(hasMilestone('z', 5)) {
            buyBuyable('t', 11)
            buyBuyable('t', 12)
            buyBuyable('t', 13)
        }
    },
    effectDescription() {
        let desc = "Trees are Multiplying Point gain <u>and Plant Costs</u> by "+format(tmp.t.effect)+". Trees are Affected by the 1st Garden Milestone. "
        if(player.t.best.gte(20)) desc = desc + "You have "+format(player.t.leaves)+" Leaves, Dividing Tree Requirements by "+format(player.t.leaves.times(0.01).add(1).pow(100))+". "
        return desc
        },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return;
        
        let keep = [];
        if(layers[resettingLayer].row <= 1) keep.push("upgrades"), keep.push("buyables"), keep.push("milestones")
        if(resettingLayer==='e' && hasMilestone('e', 5)) keep.push("upgrades")
        if(resettingLayer==='e' && hasAchievement('e', 11)) keep.push("milestones")
        layerDataReset(this.layer, keep)
    },
    onPrestige() {
        if(!hasMilestone('t', 2)) player.t.leaves = new Decimal(0)
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    update(diff) {
        player.t.leaves = player.t.leaves.add(smartUpgradeEffect('t', 12, new Decimal(0)).times(diff))
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for Trees", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return hasUpgrade('r', 25)}},
    ],
    layerShown(){return false},
    upgrades: {
        11: {
            title: "Incremental God Tree",
            description: "Multiply Research Speed by Trees",
            cost: (new Decimal(10)),
            effect() {return player.t.points.add(1)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
        },
        12: {
            title: "Apple Tree",
            description: "Every Tree Generates 1 Leaf Every Second",
            cost: (new Decimal(12)),
            unlocked() {return hasUpgrade('t', 11)},
            effect() {
                let effect = player.t.points
                effect = effect.times(smartUpgradeEffect('t', 42))
                if(hasMilestone('t', 2)) effect = effect.times(player.t.leaves.add(1).pow(0.1))
                effect = effect.times(smartUpgradeEffect('t', 81))
                effect = effect.times(smartUpgradeEffect('r', 32))
                effect = effect.times(clickableEffect('e', 12))
                if(hasAchievement('re', 14)) effect = effect.times(2)
                effect = effect.times(smartUpgradeEffect('g', 53))
                return effect
            },
            effectDisplay() {return format(thisUpgradeEffect(this))+"/sec. You have "+format(player.t.leaves)+" Leaves, Dividing Tree Requirements by "+format(player.t.leaves.times(0.01).add(1).pow(100))+"."},
            tooltip: "Leaf Effect: (Leaves ÷ 100) ^ 100"
        },
        13: {
            title: "Pear Tree",
            description: "Automatically Reset for Gardens, Automatically buy Research Buyables and Reduce Research Base by 0.05",
            cost: (new Decimal(22)),
            unlocked() {return hasUpgrade('t', 11)},
            effect() {return 0.05},
        },
        14: {
            title: "Apricot Tree",
            description: "Tree Effect is now ^ 100 and Doesn't Affect Plant Costs and Research Buyables Cost Nothing",
            cost: (new Decimal(30)),
            unlocked() {return hasUpgrade('t', 11)},
            effect() {return 90},
        },
        21: {
            title: "Tree of Life",
            description: "Multiply Point Gain based on A, B and C and Unlock Buyables for Each",
            cost: (new Decimal(130)),
            effect() {return getBuyableAmount('t', 11).add(1).add(smartUpgradeEffect('t', 31, 0)).add(smartUpgradeEffect('t', 44, 0)).pow(getBuyableAmount('t', 12).add(1).add(smartUpgradeEffect('t', 32, 0))).pow(getBuyableAmount('t', 13).add(1).add(smartUpgradeEffect('t', 33, 0)))},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip() {return "(A ^ B) ^ C. A = "+format(getBuyableAmount('t', 11).add(1).add(smartUpgradeEffect('t', 31, 0)).add(smartUpgradeEffect('t', 44, 0)))+", B = "+format(getBuyableAmount('t', 12).add(1).add(smartUpgradeEffect('t', 32, 0)))+" and C = "+format(getBuyableAmount('t', 13).add(1).add(smartUpgradeEffect('t', 33, 0)))},
        },
        31: {
            title: "The Plague Tree",
            description: "A is Increased Based on Leaves",
            cost: (new Decimal(245)),
            effect() {return new Decimal(player.t.leaves).root(10)},
            effectDisplay() {return "+"+format(thisUpgradeEffect(this))},
            tooltip: "10rt (Leaves)",
        },
        32: {
            title: "Anti-Vaxxers",
            description: "B is Increased Based on Leaves",
            cost: (new Decimal(260)),
            unlocked() {return hasUpgrade('t', 31)},
            effect() {return new Decimal(player.t.leaves).root(10)},
            effectDisplay() {return "+"+format(thisUpgradeEffect(this))},
            tooltip: "10rt (Leaves)",
        },
        33: {
            title: "Adverse-Vaxxers",
            description: "C is Increased Based on Leaves",
            cost: (new Decimal(290)),
            unlocked() {return hasUpgrade('t', 31)},
            effect() {return new Decimal(player.t.leaves).root(10)},
            effectDisplay() {return "+"+format(thisUpgradeEffect(this))},
            tooltip: "10rt (Leaves)",
        },
        41: {
            title: "The Camellia Tree Rewritten",
            description: "Unlocks Standard Notation",
            cost: (new Decimal(325)),
        },
        42: {
            title: "QiV",
            description: "Multiply Leaf Gain by Research",
            cost: (new Decimal(325)),
            unlocked() {return hasUpgrade('t', 41)},
            effect() {return player.r.points.add(1)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
        },
        43: {
            title: "MeT",
            description: "Multiply Research Speed based on Leaves",
            cost: (new Decimal(400)),
            unlocked() {return hasUpgrade('t', 41)},
            effect() {return player.t.leaves.add(1).root(2)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "sqrt (Leaves)",
        },
        44: {
            title: "YuC'e",
            description: "A is Increased by Trees",
            cost: (new Decimal(420)),
            unlocked() {return hasUpgrade('t', 41)},
            effect() {return player.t.points},
        },
        51: {
            title: "The Milestone Tree",
            description: "Unlock Tree Milestones",
            cost: (new Decimal(700)),
        },
        61: {
            title: "The Plant Tree",
            description: "Unlock a Miniature Version of <i>The Plant Tree</i>",
            cost: (new Decimal(1100)),
        },
        71: {
            title: "Plants",
            description: "Divide Plant Costs by Leaves Effect at an Increased Rate",
            cost: (new Decimal(1100)),
            unlocked() {return hasUpgrade('t', 61)},
            effect() {return player.t.leaves.times(0.01).add(1).pow(500)},
            effectDisplay() {return "÷"+format(thisUpgradeEffect(this))},
            tooltip: "'^ 500' Instead of '^ 100'",
        },
        72: {
            title: "Trees",
            description: "Multiply Research Speed Based on Trees",
            cost: (new Decimal(6000)),
            unlocked() {return hasUpgrade('t', 83)},
            effect() {return upgradeEffect('t', 11)},
            effectDisplay() {return "x"+format(upgradeEffect('t', 11))},
        },
        73: {
            title: "Wildlife",
            description: "Wildlife Multiplies Research Speed",
            cost: (new Decimal(1750)),
            unlocked() {return hasUpgrade('t', 81)},
            effect() {return player.w.points.add(5).log(5)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "log5 (Wildlife)",
        },
        81: {
            title: "Zones",
            description: "Multiply Leaf Gain Based on Zones",
            cost: (new Decimal(1210)),
            unlocked() {return hasUpgrade('t', 82)},
            effect() {return player.z.points.add(1).pow(3)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            tooltip: "Zones ^ 3",
        },
        82: {
            title: "Gardens",
            description: "Divide Garden Costs based on Trees",
            cost: (new Decimal(1140)),
            unlocked() {return hasUpgrade('t', 71)},
            effect() {return player.t.points.dividedBy(100).add(1).pow(0.2)},
            effectDisplay() {return "÷"+format(thisUpgradeEffect(this))},
            tooltip: "(Trees ÷ 100) ^ 0.2",
        },
        83: {
            title: "Research",
            description: "Unlock a New Row of Research Upgrades",
            cost: (new Decimal(1880)),
            unlocked() {return hasUpgrade('t', 73)},
        },
        91: {
            title: "Ecosystems",
            description: "Unlock Ecosystems",
            cost: (new Decimal(6700)),
            unlocked() {return hasUpgrade('t', 72)},
        },
    },
    buyables: {
        11: {
            title: "A Increase",
            cost(x) {let cost = thisBuyableAmount(this).pow_base(1.005).times(130)
            return cost},
            display() {return autoThisBuyableDisplay("Increase A by 1. Hold to Buy Max.", this, " Trees", "/"+format(tmp[this.layer].buyables[this.id].purchaseLimit))},
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return hasUpgrade('t', 21)},
            purchaseLimit() {return 25 + smartMilestoneEffect('t', 3, 0)},
        },
        12: {
            title: "B Increase",
            cost(x) {let cost = thisBuyableAmount(this).pow(1.1).pow_base(1.01).times(130)
            return cost},
            display() {return autoThisBuyableDisplay("Increase B by 1. Hold to Buy Max.", this, " Trees", "/"+format(tmp[this.layer].buyables[this.id].purchaseLimit))},
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return hasUpgrade('t', 21)},
            purchaseLimit() {return 25 + smartMilestoneEffect('t', 3, 0)},
        },
        13: {
            title: "C Increase",
            cost(x) {let cost = thisBuyableAmount(this).pow(2).pow_base(1.02).times(130)
            return cost},
            display() {return autoThisBuyableDisplay("Increase C by 1. Hold to Buy Max.", this, " Trees", "/"+format(tmp[this.layer].buyables[this.id].purchaseLimit))},
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return hasUpgrade('t', 21)},
            purchaseLimit() {return 25 + smartMilestoneEffect('t', 3, 0)},
        },
    },
    milestones: {
        0: {
            requirementDescription: "700 Trees",
            effectDescription: "You Can Increase Tree Bulk to 10",
            done() {return tmp.t.milestones[this.id].unlocked && player.t.points.gte(700)},
            unlocked() {return hasUpgrade('t', 51)},
            toggles: [["t", "bulk"]],
        },
        1: {
            requirementDescription: "750 Trees",
            effectDescription: "Automatically Buy the First 4 Garden Buyables",
            done() {return tmp.t.milestones[this.id].unlocked && player.t.points.gte(750)},
            unlocked() {return hasUpgrade('t', 51)},
        },
        2: {
            requirementDescription: "780 Trees",
            effectDescription() {return "You Keep Leaves on Tree Reset and Multiply Their Gain based on Themselves<br>Currently: x"+format(new Decimal(player.t.leaves).add(1).pow(0.1))},
            done() {return tmp.t.milestones[this.id].unlocked && player.t.points.gte(780)},
            unlocked() {return hasUpgrade('t', 51)},
        },
        3: {
            requirementDescription: "900 Trees",
            effectDescription: "Increase the Tree of Life Buyables Limit by 5",
            done() {return tmp.t.milestones[this.id].unlocked && player.t.points.gte(900)},
            unlocked() {return hasUpgrade('t', 51)},
            effect() {return 5},
        },
        4: {
            requirementDescription: "1200 Trees",
            effectDescription: "Keep Points on Research Reset",
            done() {return tmp.t.milestones[this.id].unlocked && player.t.points.gte(1200)},
            unlocked() {return hasUpgrade('t', 51)},
        },
    },
}),
addLayer("e", {
    name: "ecosystems", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        ecology: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
        cooldown: new Decimal(0),
        lastAbility: 11,
        autoAbility: false,
    }},
    color: "#11FF99",
    requires: new Decimal("1.6e6"), // Can be a function that takes requirement increases into account
    resource: "Ecosystems", // Name of prestige currency
    baseResource: "plants", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.1, // Prestige currency exponent
    base() {return 1.1},
    canBuyMax: true,
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",
                    function() {return player.e.cooldown.lte(0) ? "Abilities Ready": format(player.e.cooldown)+"s"}
                ],
                "clickables",
                "blank",
                "milestones",
                () =>  hasMilestone('e', 9) ? "achievements" : undefined,
                "blank",
                "blank",
                "buyables",
                "blank",
                "blank",
                "upgrades",
            ],
            unlocked() {return hasMilestone('e', 9)},
        },
        "Ecology": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",
                    function() {return "You Have "+format(player.e.ecology)+" Ecology"}
                ],
                "blank",
                "blank",
                "buyables",
                "blank",
                "blank",
                "upgrades",
                "blank",
                "blank",
                "achievements",
                "blank",
                "blank",
            ],
            unlocked() {return hasMilestone('e', 9)},
        },
    },
    branches() {
        let branches = ['g', 'z']
        if(player.g.best.lt(1)) branches.push('p')
        return branches
        },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return;
        
        let keep = [];
        layerDataReset(this.layer, keep)
    },
    onPrestige() {
        if(!tmp.e.resetsNothing) player.e.ecology = new Decimal(0)
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
               if(hasAchievement('a', 73)) mult=mult.dividedBy(1.2)
               return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff) {
        player.e.cooldown = player.e.cooldown.minus(diff)
        let active = getClickableState('e', 11) && !hasAchievement('e', 15)
        if(!active) active = getClickableState('e', 12)
        if(player.e.cooldown.lte(0) && active) {
            if(!hasAchievement('e', 15)) setClickableState('e', 11, false)
            setClickableState('e', 12, false)
            let cooldown = new Decimal(30)
            if(hasMilestone('e', 4)) cooldown = cooldown.minus(10)
            cooldown = cooldown.dividedBy(smartUpgradeEffect('p', 82))
            cooldown = cooldown.div(smartMilestoneEffect('re', 4))
            player.e.cooldown = cooldown
        }
        if(hasMilestone('e', 6) && player.e.autoAbility && player.e.cooldown.lte(0)) {
            tmp.e.clickables[player.e.lastAbility].onClick()
        }
        if(hasMilestone('e', 9)) player.e.ecology = getLogisticAmount(player.e.ecology, milestoneEffect('e', 9), 0.1, diff)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for Ecosystems", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return tmp[this.layer].layerShown}},
    ],
    prestigeNotify() {return (canReset('e') || player.e.cooldown.lte(0)) && player.e.unlocked},
    layerShown(){return hasUpgrade('t', 91)||player.e.best.gte(1)},
    clickables: {
        11: {
            display() {return "Multiply Point Gain by "+format(player.e.points.add(1).pow(10))+" (10s).<br>Currently: "+(getClickableState('e', 11) ? "Active":"Inactive")},
            canClick() {return player.e.cooldown.lte(0) && !hasAchievement('e', 15)},
            unlocked() {return hasMilestone('e', 1)},
            effect() {return getClickableState(this.layer, this.id) ? player.e.points.add(1).pow(10) : 1},
            onClick() {
                setClickableState(this.layer, this.id, true)
                let duration = new Decimal(10)
                player.e.cooldown = duration
                player.e.lastAbility = 11
            },
        },
        12: {
            display() {return "Multiply Leaf Gain by "+format(new Decimal(5).add(hasMilestone('e', 8) ? player.e.points : 0).pow(hasAchievement('e', 23)?1.75:1))+" (5s).<br>Currently: "+(getClickableState('e', 12) ? "Active":"Inactive")},
            canClick() {return player.e.cooldown.lte(0)},
            unlocked() {return hasMilestone('e', 2)},
            effect() {return getClickableState(this.layer, this.id) ? new Decimal(5).add(hasMilestone('e', 8) ? player.e.points : 0).pow(hasAchievement('e', 23)?1.75:1) : 1},
            onClick() {
                setClickableState(this.layer, this.id, true)
                let duration = new Decimal(5)
                player.e.cooldown = duration
                player.e.lastAbility = 12
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Ecosystem",
            effectDescription: "Keep Research Unlocked",
            done() {return player.e.points.gte(1)},
        },
        1: {
            requirementDescription: "1 Ecosystem and 4 Zones",
            effectDescription: "Unlock the First Ecosystem Ability",
            done() {return player.e.points.gte(1) && player.z.points.gte(4) && msReady},
        },
        2: {
            requirementDescription: "1 Ecosystem and 25 Trees",
            effectDescription: "Unlock the Second Ecosystem Ability",
            done() {return player.e.points.gte(1) && player.t.points.gte(25) && msReady},
        },
        3: {
            requirementDescription: "2 Ecosystems",
            effectDescription: "Zones Reset Nothing",
            done() {return player.e.points.gte(2)},
        },
        4: {
            requirementDescription: "2 Ecosystems and 260 Trees",
            effectDescription: "Reduce Abilities Cooldown by 10s (30s -> 20s)",
            done() {return player.e.points.gte(2) && player.t.points.gte(260) && msReady},
        },
        5: {
            requirementDescription: "3 Ecosystems",
            effectDescription: "Keep Tree Upgrades, Keep Trees Unlocked and Auto-Buy Plant Upgrades. (Gardens Always Reset Nothing)",
            done() {return player.e.points.gte(3)},
        },
        6: {
            requirementDescription: "3 Ecosystems and 1,500,000 Plants",
            effectDescription: "When Active, Automatically Trigger the Last Ability Triggered and Unlock 2 New Plant Upgrades",
            done() {return player.e.points.gte(3) && player.p.points.gte("1.5e6") && msReady},
            toggles: [["e", "autoAbility"]],
        },
        7: {
            requirementDescription: "4 Ecosystems",
            effectDescription: "Keep Row 1 and 2 Layers Unlocked",
            done() {return player.e.points.gte(4)},
        },
        8: {
            requirementDescription: "4 Ecosystems and 1,500,000 Plants",
            effectDescription: "Increase Second Ecosystem Ability Effect by Ecosystems",
            done() {return player.e.points.gte(4) && player.p.points.gte("1.5e6") && msReady},
        },
        9: {
            requirementDescription: "5 Ecosystems",
            effectDescription() {return "Generate Ecology and Lose 10%/sec. Currently: "+format(milestoneEffect('e', 9))+"/sec"},
            effect() {
                let effect = player.e.points.times(player.p.points.add(1).log(10))
                effect = effect.times(smartUpgradeEffect('e', 13))
                effect = effect.times(smartMilestoneEffect('z', 8))
                effect = effect.times(smartUpgradeEffect('z', 11))
                effect = effect.times(smartUpgradeEffect('r', 35))
                effect = effect.times(smartUpgradeEffect('w', 113))
                effect = effect.times(smartMilestoneEffect('re', 2))
                effect = effect.times(smartUpgradeEffect('e', 23))
                return effect
                },
            done() {return player.e.points.gte(5)},
        },
    },
    upgrades: {
        11: {
            title: "Plastic",
            description: "Raise Research Time to ^ 1.1",
            effect: 1.1,
            cost: (new Decimal(100)),
            currencyDisplayName: "Ecology",
            currencyInternalName: "ecology",
            currencyLayer: "e",
        },
        12: {
            title: "Paper",
            description: "Multiply Wildlife Gain by Ecology",
            effect() {return player.e.ecology.add(1)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            cost: (new Decimal(200)),
            currencyDisplayName: "Ecology",
            currencyInternalName: "ecology",
            currencyLayer: "e",
        },
        13: {
            title: "Bamboo",
            description: "Multiply Ecology Gain based on Ecology and Unlock a Buyable",
            effect() {return player.e.ecology.add(10).log(10)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            cost: (new Decimal(300)),
            currencyDisplayName: "Ecology",
            currencyInternalName: "ecology",
            currencyLayer: "e",
        },
        14: {
            title: "\"100% Recycled Materials\"",
            description: "Unlock Fish",
            cost: (new Decimal(40000)),
            currencyDisplayName: "Ecology",
            currencyInternalName: "ecology",
            currencyLayer: "e",
            tooltip: "Fish are found in the Wildlife Layer",
        },
        21: {
            title: "Vegetable Patch",
            description: "Reduce Research Exponent by 0.03 and Unlock 2 More Research Upgrades",
            cost: (new Decimal(172500)),
            unlocked() {return hasUpgrade('e', 14)},
            effect() {return 0.03},
            currencyDisplayName: "Ecology",
            currencyInternalName: "ecology",
            currencyLayer: "e",
        },
        22: {
            title: "Chicken Coop",
            description: "Multiply Wildlife Gain Based on Ecology",
            cost: (new Decimal(185000)),
            unlocked() {return hasUpgrade('e', 14)},
            effect() {return player.e.ecology.pow(100)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
            currencyDisplayName: "Ecology",
            currencyInternalName: "ecology",
            currencyLayer: "e",
        },
        23: {
            title: "Composting",
            description: "Multiply Ecology Gain by Plants",
            cost: (new Decimal(58)),
            unlocked() {return hasMilestone('re', 3)},
            effect() {return player.p.points},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
        },
        24: {
            title: "Mulching",
            description: "Multiply Point Gain by Widlife",
            cost: (new Decimal(67)),
            unlocked() {return hasMilestone('re', 3)},
            effect() {return player.w.points.add(1)},
            effectDisplay() {return "x"+format(thisUpgradeEffect(this))},
        },
    },
    buyables: {
        11: {
            title: "Recycling",
            cost(x) {let cost = x.times(100)
            if(x.gte(50)) cost = cost.pow(x.sub(25).div(25))
            cost = cost.times(smartMilestoneEffect('z', 8))
            return cost},
            display() { return autoThisBuyableDisplay("Multiply Zone Base (Above 1) by 0.95. Hold to buy max.", this, " Ecology", "/"+format(tmp.e.buyables[11].purchaseLimit))},
            canAfford() { return player.e.ecology.gte(this.cost()) },
            buy() {
                player.e.ecology = player.e.ecology.minus(this.cost())
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return hasUpgrade('e', 13)},
            effect() {return getBuyableAmount('e', 11).pow_base(0.95)},
            tooltip() {return "Currently: x"+format(thisBuyableEffect(this))},
            purchaseLimit() {return hasUpgrade('w', 104)?100:50},
        },
    },
    achievements: {
        11: {
            name: "6 Ecosystems",
            tooltip: "Reward: Keep Tree Milestones and 'Plant Robotics' on Reset",
            done() {return player.e.points.gte(6)},
        },
        12: {
            name: "7 Ecosystems",
            tooltip: "Reward: Keep Wildlife Upgrades on Reset",
            done() {return player.e.points.gte(7)},
        },
        13: {
            name: "8 Ecosystems",
            tooltip: "Reward: Keep Zone Milestones on Reset",
            done() {return player.e.points.gte(8)},
        },
        14: {
            name: "9 Ecosystems",
            tooltip: "Reward: Keep Research Upgrades on Reset",
            done() {return player.e.points.gte(9)},
        },
        15: {
            name: "10 Ecosystems",
            tooltip: "Reward: Remove The Ability to Activate the First Ecosystem Ability but it's Permanently Active",
            done() {return player.e.points.gte(10)},
            onComplete() {setClickableState('e', 11, true)},
        },
        21: {
            name: "15 Ecosystems",
            tooltip: "Reward: Keep Garden Upgrades and Milestones on Reset",
            done() {return player.e.points.gte(15)},
        },
        22: {
            name: "20 Ecosystems",
            tooltip: "Keep Zone Completions on Reset",
            done() {return player.e.points.gte(20)},
        },
        23: {
            name: "25 Ecosystems",
            tooltip: "Reward: Raise the Second Ecosystem Ability Effect to 1.75",
            done() {return player.e.points.gte(25)},
        },
        24: {
            name: "30 Ecosystems",
            tooltip: "Reward: Buy Max Garden Buyables",
            done() {return player.e.points.gte(30)},
        },
        25: {
            name: "35 Ecosystems",
            tooltip: "Reward: Buy Max Research Buyables",
            done() {return player.e.points.gte(35)},
        },
    },
}),
addLayer("re", {
    name: "reclamation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Re", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#FF0055",
    requires: new Decimal(600000),
    resource: "Reclaimed Ecosystems", // Name of prestige currency
    baseResource: "trees", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base() {let base = new Decimal(2)
    return base},
    canBuyMax: true,
    type: "static",
    branches: ['z', 'g', 'e'],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return;
        
        let keep = [];
        layerDataReset(this.layer, keep);
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
               return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    midsection: [
        ["display-text",
            "Entering a Challenge Costs 1 Ecosystem.<br>Completing a Challenge Returns Your Ecosystem."
        ],
        "blank",
    ],
    hotkeys: [
        {key: "r", description: "R: Reset for Reclaimed Ecosystems", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return tmp[this.layer].layerShown}},
    ],
    layerShown(){return hasUpgrade('z', 14)||player.r.best.gte(1)},
    
    milestones: {
        0: {
            requirementDescription: "1 Reclaimed Ecosystem",
            effectDescription() {return "Unlock 1: "+tmp.re.challenges[11].name+" and Auto-buy Wildlife Upgrades"},
            done() {return player.re.points.gte(1)},
            toggles: [["w", "autoUpgrade"]],
        },
        1: {
            requirementDescription: "2 Reclaimed Ecosystems",
            effectDescription() {return "Unlock 2: "+tmp.re.challenges[12].name+" and Auto-buy Tree Upgrades"},
            done() {return player.re.points.gte(2)},
            toggles: [["t", "autoUpgrade"]],
        },
        2: {
            requirementDescription: "3 Reclaimed Ecosystems",
            effectDescription() {return "Unlock 3: "+tmp.re.challenges[21].name+" and Multiply Ecology Gain by "+format(player.re.points.add(1))},
            effect() {return player.re.points.add(1)},
            done() {return player.re.points.gte(3)},
        },
        3: {
            requirementDescription: "4 Reclaimed Ecosystems",
            effectDescription: "Unlock 2 New Ecosystem Upgrades",
            done() {return player.re.points.gte(4)},
        },
        4: {
            requirementDescription: "5 Reclaimed Ecosystems",
            effectDescription: "Divide Ecosystem Ability Cooldown by Reclaimed Ecosystems",
            effect() {return player.re.points.add(1)},
            done() {return player.re.points.gte(5)},
        },
    },
    challenges: {
        11: {
            name() {return new Decimal(challengeCompletions(this.layer, this.id)).gte(3) ? "Coral Reef" : "Polluted Reef"},
            challengeDescription() {return thisChallengeDescriptionArray(this)},
            challengeDescriptionArray: ["Wildlife Generation ^ 0.01", "Wildlife Generation ^ 0.01<br>Research Time ^ 0.01", "Wildlife Generation ^ 0.1<br>Research Time ^ 0.1<br>Point Gain ^ 0.1", "Completed"],
            unlocked() {return hasMilestone('re', 0)},
            requirementArray: [38320, 36100, 21420, 0],
            requirement() {return thisChallengeRequirement(this)},
            baseAmount() {return player.p.points},
            baseName: " Plants",
            completionLimit: 3,
            goalDescription() {return challengeGoalDescription(this.layer, this.id, thisChallengeCompletions(this))},
            canComplete() {return challengeCanComplete(this.layer, this.id)},
            rewardDescription: "Complete an Achievement",
            onEnter() {
                player.e.points = player.e.points.sub(1)
                if(player.e.points.lt(0)) player.e.points = new Decimal(0)
            },
            onComplete() {
                player.e.points = player.e.points.add(1)
            },
        },
        12: {
            name() {return new Decimal(challengeCompletions(this.layer, this.id)).gte(3) ? "Grassland" : "Toxic Wasteland"},
            challengeDescription() {return thisChallengeDescriptionArray(this)},
            challengeDescriptionArray: ["Research is Deactivated", "Gardens are Deactivated", "Plants are Deactivated (you can still gain plants)", "Completed"],
            unlocked() {return hasMilestone('re', 1)},
            requirementArray: ["1.6e6", "75e6", 12345678.9, 0],
            requirement() {return thisChallengeRequirement(this)},
            baseAmount() {return player.p.points},
            baseName: " Plants",
            completionLimit: 3,
            goalDescription() {return challengeGoalDescription(this.layer, this.id, thisChallengeCompletions(this))},
            canComplete() {return challengeCanComplete(this.layer, this.id)},
            rewardDescription: "Complete an Achievement",
            onEnter() {
                player.e.points = player.e.points.sub(1)
                if(player.e.points.lt(0)) player.e.points = new Decimal(0)
            },
            onComplete() {
                player.e.points = player.e.points.add(1)
            },
        },
        21: {
            name() {return new Decimal(challengeCompletions(this.layer, this.id)).gte(3) ? "Forest" : "Abandoned Quarry"},
            challengeDescription() {return thisChallengeDescriptionArray(this)},
            challengeDescriptionArray: ["Increase Research Exponent by 1", "Increase Garden Exponent by 1 and Reset Garden Upgrades", "Increase Plant Exponent by 1", "Completed"],
            unlocked() {return hasMilestone('re', 2)},
            requirementArray: [100000000, "3e9", 60000, 0],
            requirement() {return thisChallengeRequirement(this)},
            baseAmount() {return player.p.points},
            baseName: " Plants",
            completionLimit: 3,
            goalDescription() {return challengeGoalDescription(this.layer, this.id, thisChallengeCompletions(this))},
            canComplete() {return challengeCanComplete(this.layer, this.id)},
            rewardDescription: "Complete an Achievement",
            onEnter() {
                if(completionDecimal('re', 21).eq(1)) player.g.upgrades = [];
                player.e.points = player.e.points.sub(1)
                if(player.e.points.lt(0)) player.e.points = new Decimal(0)
            },
            onComplete() {
                player.e.points = player.e.points.add(1)
            },
        },
    },
    achievements: {
        11: {
            name: "Polluted Reef I",
            done() {return completionDecimal('re', 11).gte(1)},
            tooltip: "Raise Wildlife Gain to ^ 1.1 and Unlock a New Fish Upgrade",
        },
        12: {
            name: "Polluted Reef II",
            done() {return completionDecimal('re', 11).gte(2)},
            tooltip() {return shiftDown?("Garden Costs Divided by Reclaimed Ecosystems + 1"):("Garden Costs ÷"+format(player.re.points.add(1))+" and Unlock a New Fish Upgrade. Shift to see Details")},
        },
        13: {
            name: "Coral Reef",
            done() {return completionDecimal('re', 11).gte(3)},
            tooltip: "Base Fish Gain Increased by 100 and Unlock 2 New Fish Upgrades",
        },
        14: {
            name: "Toxic Wasteland I",
            done() {return completionDecimal('re', 12).gte(1)},
            tooltip: "Double Leaf Gain and Unlock a New Garden Upgrade",
        },
        15: {
            name: "Toxic Wasteland II",
            done() {return completionDecimal('re', 12).gte(2)},
            tooltip() {return shiftDown?"Plant Costs Divided the same as Research Requirement":"Plant costs ÷"+format(new Decimal(1).div(tmp.r.requires.div(10)))+" and Unlock a New Garden Upgrade. Shift to see Details"},
        },
        16: {
            name: "Grassland",
            done() {return completionDecimal('re', 12).gte(3)},
            tooltip: "Unlock 2 New Garden Upgrades and Raise 'Coconut Palm' Effect to the sqrt of Zones",
        },
        21: {
            name: "Abandoned Quarry I",
            done() {return completionDecimal('re', 21).gte(1)},
            tooltip: "Unlock a Research Buyable (automatically bought)",
        },
        22: {
            name: "Abandoned Quarry II",
            done() {return completionDecimal('re', 21).gte(2)},
            tooltip: "Unlock a Research Buyable (automatically bought)",
        },
        23: {
            name: "Forest",
            done() {return completionDecimal('re', 21).gte(3)},
            tooltip: "Unlock a Research Buyable (automatically bought)",
        },
        24: {
            name: "6 Reclaimed Ecosystems",
            done() {return player.re.points.gte(6)},
            tooltip: "Divide Zone Requirement by Reclaimed Ecosystems",
        },
    },
})