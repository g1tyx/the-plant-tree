addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: "?",
    }},
    color: "#FFFF00",
    resource: "Achievements", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
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
    exponent: 1, // Prestige currency exponent
    base() {let base = 2
    if(hasUpgrade('p', 43)){base -= 0.1}
    if(new Decimal(getBuyableAmount('p', 13)).gte(1)){base = new Decimal(1).add(new Decimal(base).minus(1).times(buyableEffect('p', 13)))}
    return base},
    canBuyMax: true,
    autoPrestige() {return hasMilestone('g', 0)},
    resetsNothing() {return hasMilestone('g', 0)},
    branches: ['g', 'z'],
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
        if(inChallenge('z', 12)) mult=mult.times((getBuyableAmount('p', 11).add(1)))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for plants", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    automate() {
        if(hasUpgrade('w', 42) && (player.points.dividedBy(tmp.p.buyables[12].cost).log(1000).gte(0))) {addBuyables('p', 12, player.points.dividedBy(tmp.p.buyables[12].cost).log(1000).ceil())}
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
            effectDisplay() {return "x2"},
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
            effectDisplay() {return "÷"+format(getBuyableAmount('p', 12))},
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
        74 :{
            title: "Filmy Fern",
            description: "'Nutrients' Divides Prickly Pear Cost at a Reduced Rate",
            cost: (new Decimal(13300)),
            unlocked() {return new Decimal(challengeCompletions('z', 22)).gte(3)},
            effect() {return buyableEffect('w', 11).pow(0.1)},
            effectDisplay() {return "÷"+format(upgradeEffect('p', 74))},
            tooltip: "Nutrients ^ 0.1",
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
            display() { return `Multiply point gain and divide plant costs by 5. Hold to buy max. Cost: ${this.cost().lt(0.1)? formatSmall(this.cost()) : format(this.cost())}` },
            canAfford() {return player.p.points.gte(this.cost()) && player.p.resetTime > 0},
            buy() {
              if(!hasAchievement('a', 24)) {player.p.points = player.p.points.minus(this.cost())};
              addBuyables(this.layer, this.id, 1)
            },
            unlocked() { return hasUpgrade('g', 12) },
            effect() {
                let extra = new Decimal(0)
                if(hasUpgrade('p', 64)) extra = extra.add(getBuyableAmount('p', 13))
                return getBuyableAmount('p', 11).add(extra).pow_base(5) },
            tooltip() {return "Total Effect: <br> ×/÷"+format(getBuyableAmount('p', 11).pow_base(5))+" (Before Bonus Levels)"},
          },
        12: {
            title: "Saguaro",
            cost(x) {let cost = new Decimal(1000).pow(x)
                if(hasUpgrade('p', 44)) cost=cost.dividedBy(getBuyableAmount('p', 12).add(1))
                if(hasUpgrade('w', 42)) cost=cost.dividedBy(upgradeEffect('w', 42))
                if(hasUpgrade('w', 51)) cost=cost.dividedBy(buyableEffect('w', 11))
            return cost},
            display() { return "Divide plant costs by 10. Hold to buy max. Cost: "+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
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
        13: {
            title: "Echinocactus",
            cost(x) {let cost = new Decimal(100).add(new Decimal(x).times(new Decimal(100).add(upgradeEffect('p', 72))))
            return cost},
            display() { return "Multiply Plant cost base above 1 by 0.99. Hold to buy max. Cost: "+format(this.cost()) },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                if(!hasUpgrade('p', 64)) {player.p.points = player.p.points.sub(this.cost())}
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return hasUpgrade('p', 63)},
            purchaseLimit: 100,
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
    exponent: 0.4, // Prestige currency exponent
    base() {return 2},
    canBuyMax: true,
    branches: ['p', 'z'],
    resetsNothing() {return hasMilestone('z', 4)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('g', 22)) mult=mult.dividedBy(upgradeEffect('g', 22))
        if(hasUpgrade('p', 33)) mult=mult.dividedBy(upgradeEffect('p', 33))
        if(hasUpgrade('g', 34)) mult=mult.dividedBy(upgradeEffect('g', 34))
        if(hasUpgrade('p', 71)) mult=mult.dividedBy(upgradeEffect('p', 71))
        if(hasUpgrade('w', 53)) mult=mult.dividedBy(upgradeEffect('w', 53))
        if(hasMilestone('z', 4)) mult=mult.dividedBy(player.z.points.dividedBy(2).add(1).root(2))
               return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for Gardens", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return tmp[this.layer].layerShown}},
    ],
    layerShown(){return hasUpgrade('p', 24)||player.g.best.gte(1)},

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
            effect() {return player.points.log(5).pow(0.05)},
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
            effect() {return player.g.points.pow(0.33)},
            effectDisplay() {return "÷"+format(upgradeEffect('g', 44))},
            tooltip: "Gardens ^ 0.33",
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
            display() { return "Multiply Point Gain by Temperate Zone Completions. (free) Hold to buy max. Cost: "+format(this.cost()) },
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return new Decimal(challengeCompletions('z', 21)).gte(1)},
            effect() {return new Decimal(challengeCompletions('z', 21)).add(1).pow(getBuyableAmount('g', 11))},
            tooltip() {return "Temp. Zone Completions + 1 ^ X. Currently Multiplying Point Gain when bought by x"+format(new Decimal(1).add(challengeCompletions('z', 21)))},
            },
        12: {
            title: "Tunnel Features",
            cost(x) {let cost = new Decimal(100).add(new Decimal(x).times(10 + upgradeEffect('g', 43)))
            return cost},
            display() { return "Multiply Point Gain by Zones. (free) Hold to buy max. Cost: "+format(this.cost()) },
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return new Decimal(challengeCompletions('z', 21)).gte(2)},
            effect() {return player.z.points.add(1).pow(getBuyableAmount('g', 12))},
            tooltip() {return "Zones + 1 ^ X. Currently Multiplying Point Gain when bought by x"+format(player.z.points.add(1))},
            },
        13: {
            title: "Exploration Features",
            cost(x) {let cost = new Decimal(100).add(new Decimal(x).times(20 + upgradeEffect('g', 43)))
            return cost},
            display() { return "Multiply Point Gain based on total first row Garden Buyable Purchases. (free) Hold to buy max. Cost: "+format(this.cost()) },
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return new Decimal(challengeCompletions('z', 21)).gte(3)},
            effect() {return getBuyableAmount('g', 11).add(getBuyableAmount('g', 12)).add(getBuyableAmount('g', 13)).root(2).pow(getBuyableAmount('g', 13))},
            tooltip() {return "(Total Purchases ^ 0.5) ^ X. Currently Multiplying Point Gain when bought by x"+format(getBuyableAmount('g', 11).add(getBuyableAmount('g', 12)).add(getBuyableAmount('g', 13)).root(2))},
            },
        21: {
            title: "Educational Features",
            cost(x) {let cost = new Decimal(800).add(new Decimal(x).times(10))
            return cost},
            display() { return "Multiply Research Speed and Point gain by Research. (free) Hold to buy max. Cost: "+format(this.cost()) },
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return player.g.best.gte(795)},
            effect() {return getBuyableAmount('g', 21).pow_base(player.r.points.add(1))},
            tooltip() {return "Currently Multiplying Research and Point Gain when bought by "+format(player.r.points.add(1))},
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
    base() {return 2},
    canBuyMax: true,
    branches: ['p', 'g'],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
            if(hasUpgrade('g', 44)) mult=mult.dividedBy(upgradeEffect('g', 44))
               return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "z", description: "Z: Reset for Zones", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return tmp[this.layer].layerShown}},
    ],
    layerShown(){return hasUpgrade('g', 24)||player.z.best.gte(1)},

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
}),
addLayer("w", {
    name: "wildlife", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        large: new Decimal(0),
    }},
    color: "#0088AA",
    resource: "wildlife", // Name of prestige currency
    baseResource: "plants", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ['p', 'g', 'z'],
     doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return;
        
        let keep = [];
        if (layers[resettingLayer].row == 1) {keep.push("upgrades")};
        layerDataReset(this.layer, keep);
    },      
    effectDescription() {let desc = "You are generating "+format(tmp.w.wildlifeGen)+" Wildlife every second. You keep Wildlife Upgrades on reset. "
        if(hasUpgrade('w', 33)) desc = desc + "You have "+format(player.w.large)+" Larger Wildlife which is Multiplying Point gain by x"+format(player.w.large.add(1).pow(0.5))+" and Wildlife gain by x"+format(player.w.large.add(1).pow(hasUpgrade('w', 54) ? 0.5 : 0.1))+". "
        return desc
    },
    update(diff) {
        gain = tmp.w.wildlifeGen
        if(hasUpgrade('w', 33)) {
            gain=gain.minus(player.w.points.pow(0.1))
            player.w.large=player.w.large.add(player.w.points.pow(0.1).times(upgradeEffect('w', 14)).minus(player.w.large.times(0.1)).times(diff))
        }
        player.w.points=player.w.points.add(gain.times(diff))
    },
    wildlifeGen() {
        let gain = new Decimal(0)
        if(challengeCompletions('z', 22) >= 3) gain = gain.add(player.p.points.root(hasUpgrade('p', 73) ? (hasUpgrade('r', 11) ? 1.1 : 1.5 ) : 2 ))
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
        
        gain=gain.minus(player.w.points.times(upgradeEffect('w', 22).times(hasUpgrade('w', 61) ? 0.02 : 0.1)))
        return gain.times(tmp.w.wildlifeSpeed)
    },
    wildlifeSpeed() {
        let speed = new Decimal(1)
        if(hasUpgrade('w', 24)) speed = speed.times(5)
        if(hasUpgrade('w', 24)) speed = speed.times(2)
        return speed
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return challengeCompletions('z', 22) >= 3},
    
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
    },
    buyables: {
        11: {
            title: "Nutrients",
            cost(x) {let cost = new Decimal(10).times(x.dividedBy(2).add(1).pow(2))
            return cost},
            display() { return "Divide Saguaro cost based on points. Only Reduces Large Wildlife by 10% of Cost. Hold to buy max. Cost: "+format(this.cost())+" Larger Wildlife. "+getBuyableAmount('w', 11)+"/30." },
            canAfford() { return player.w.large.gte(this.cost()) },
            buy() {
                player.w.large = player.w.large.minus(this.cost().times(0.1))
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return hasUpgrade('w', 51)},
            purchaseLimit() {return (hasUpgrade('r', 14) ? (hasUpgrade('r', 15) ? 40 : 35 ) : 30) + upgradeEffect('w', 83)},
            effect() {return player.points.add(1).pow(getBuyableAmount('w', 11).dividedBy(100))},
            tooltip() {return "Points ^ N where N is X ÷ 100. Currently: ÷"+format(buyableEffect('w', 11))},
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
    baseAmount() {let amt = new Decimal(player.r.resetTime)
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
        return amt
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    base() {return 2},
    canBuyMax: true,
    effectDescription() {return "Multiplying Point gain by "+format(player.r.points.add(1).pow(hasUpgrade('r', 22) ? 100 : 3))},
    branches: [],
    update(diff) {
        if(!tmp.r.layerShown) player.r.resetTime = 0
        player.r.researchers = player.r.researchers.add(buyableEffect('r', 32).times(diff))
    },
    automate() {
        if(hasUpgrade('r', 14) && tmp.p.buyables[11].canAfford) {tmp.p.buyables[11].buy()}
        if(hasUpgrade('r', 15)) buyBuyable('w', 11)
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
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
               return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('w', 64)||player.r.best.gte(1)},   
    bars: {
        bar1: {
            direction: RIGHT,
            width: 600,
            height: 50,
            progress() {return new Decimal(tmp.r.baseAmount).dividedBy(getNextAt(this.layer, true))},
        },
        bar2: {
            direction: RIGHT,
            width: 300,
            height: 25,
            progress() {return new Decimal(tmp.r.baseAmount).log(2).dividedBy(getNextAt(this.layer, true).log(2))},
        },
        
    },
    buyables: {
        11: {
            title: "Requirement Reduction",
            cost(x) {let cost = new Decimal(2).times(x.add(1))
            return cost},
            display() { return "Divide Research Requirement by "+format(getBuyableAmount('r', 23).add(2))+". Hold to buy max. Cost: "+format(this.cost())+" Research." },
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 11).pow_base(getBuyableAmount('r', 23).add(2))},
            tooltip() {return "Currently: ÷"+format(buyableEffect('r', 11))},
        },
        12: {
            title: "Wildlife Booster",
            cost(x) {let cost = new Decimal(3).times(x.add(2))
            return cost},
            display() { return "Multiply Wildlife gain by "+format(getBuyableAmount('r', 23).add(2))+".<br> Unlocks more Wildlife Upgrades after 2 Purchases.<br> Hold to buy max. Cost: "+format(this.cost())+" Research. Amount: "+format(getBuyableAmount('r', 12)) },
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 12).pow_base(getBuyableAmount('r', 23).add(2))},
            tooltip() {return "Currently: x"+format(buyableEffect('r', 12))},
        },
        13: {
            title: "Requirement Reduction II",
            cost(x) {let cost = new Decimal(2).times(x.add(2))
            return cost},
            display() { return "Divide Research Requirement by Research. Hold to buy max. Cost: "+format(this.cost())+" Research." },
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 13).pow_base(player.r.points.add(1))},
            tooltip() {return "Currently: ÷"+format(buyableEffect('r', 13))},
        },
        21: {
            title: "Time Speed Increase",
            cost(x) {let cost = new Decimal(5).times(x.add(1))
            return cost},
            display() { return "Multiply Research Time Gain by "+format(getBuyableAmount('r', 31).times(2).add(3))+". Hold to buy max. Cost: "+format(this.cost())+" Research. Amount: "+format(getBuyableAmount('r', 21)) },
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 21).pow_base(getBuyableAmount('r', 31).times(2).add(3))},
            tooltip() {return "Currently: x"+format(buyableEffect('r', 21))},
        },
        22: {
            title: "Advanced Requirement Reduction",
            cost(x) {let cost = new Decimal(hasUpgrade('r', 21) ? 9 : 10).times(x.add(50))
            return cost},
            display() { return "Divide Research Requirement Based on Plants. (free) Hold to buy max. Cost: "+format(this.cost())+" Gardens." },
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 22).pow_base(player.p.points.add(10).log(10))},
            tooltip() {return "Currently: ÷"+format(buyableEffect('r', 22))+". Currently Dividing by "+format(player.p.points.add(10).log(10))+" When Bought"},
        },
        23: {
            title: "Wildlife Superbooster",
            cost(x) {let cost = new Decimal(2).times(x.add(2))
            return cost},
            display() { return "Increase Requirement Reduction and Wildlife Booster Base by 1. Hold to buy max. Cost: "+format(this.cost())+" Wildlife Boosters." },
            canAfford() { return getBuyableAmount('r', 12).gte(this.cost()) },
            buy() {
                addBuyables('r', 12, (this.cost().times(-1)))
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            tooltip() {return "Currently: +"+format(getBuyableAmount('r', 23))+". "},
        },
        31: {
            title: "Time Speed Superincrease",
            cost(x) {let cost = new Decimal(2).times(x.add(2.5))
            return cost},
            display() { return "Increase Time Speed Increase Base by 2. Hold to buy max. Cost: "+format(this.cost())+" Time Speed Increases."},
            canAfford() { return getBuyableAmount('r', 21).gte(this.cost()) },
            buy() {
                addBuyables('r', 21, (this.cost().times(-1)))
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            unlocked() {return player.r.best.gte(25)},
            tooltip() {return "Currently: +"+format(getBuyableAmount('r', 31))+". "},
        },
        32: {
            title: "Researchers",
            cost(x) {let cost = new Decimal(5 + upgradeEffect('r', 23)).times(x.add(7))
            return cost},
            display() { return "Find Researchers to help. Hold to buy max. Cost: "+format(this.cost())+" Research. You Currently have "+format(player.r.researchers)+" Researchers."},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 32).pow_base(2).times(getBuyableAmount('r', 32)).times(buyableEffect('r', 33))},
            unlocked() {return player.r.best.gte(38)},
            tooltip() {return "Currently: +"+format(buyableEffect('r', 32))+"/sec. "},
        },
        33: {
            title: "Research Booster",
            cost(x) {let cost = new Decimal(10 + upgradeEffect('r', 23)).times(x.add(5))
            return cost},
            display() { return "Reset Researchers but Multiply their gain Based on Research Time. Hold to buy max. Cost: "+format(this.cost())+" Research. You Currently have "+format(player.r.researchers)+" Researchers."},
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                player.r.points = player.r.points.minus(this.cost())
                addBuyables(this.layer, this.id, 1)
                player.r.researchers = new Decimal(0)
                player.r.resetTimes = 0},
            effect() {return getBuyableAmount('r', 33).pow_base(tmp.r.baseAmount.add(1).log(10))},
            unlocked() {return player.r.best.gte(53)},
            tooltip() {return "Currently: x"+format(buyableEffect('r', 33))+". Currently Multiplying by "+format(tmp.r.baseAmount.add(1).log(10))+" When Bought"},
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
            description: "Coming Soon...",
            cost: (new Decimal(120)),
            unlocked() {return hasUpgrade('r', 15)},
        },
    },
})