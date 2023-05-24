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
            tooltip: "Get a Garden Milestone",
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
    }},
    color: "#27B000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
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
        if (hasAchievement('a', 23) && resettingLayer==='g') keep.push("upgrades");
        if (hasAchievement('a', 34) && resettingLayer==='g') keep.push("buyables");
        layerDataReset(this.layer, keep);
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
            effect() {return player.points.log(2)},
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
            description: "Prickly Pear gives free levels to Saguaro",
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
            description: "Echinocactus gives free levels to Saguaro and Prickly Pear",
            cost: (new Decimal(1740)),
            unlocked() {return new Decimal(challengeCompletions('z', 12)).gte(3)},
            effectDisplay() {return "+"+format(getBuyableAmount('p', 13))},
        },
        71: {
            title: "Wild Garlic",
            description: "Divide Garden Costs based on Gardens",
            cost: (new Decimal(4350)),
            unlocked() {return new Decimal(challengeCompletions('z', 22)).gte(1)},
            effect() {return player.g.points.log(5).root(5)},
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
              return cost;
            },
            display() { return `Multiply point gain and divide plant costs by 5. Hold to buy max. Cost: ${format(this.cost())}` },
            canAfford() { return player.p.points.gt(this.cost()) },
            buy() {
              player.p.points = player.p.points.minus(this.cost());
              addBuyables(this.layer, this.id, 1)
            },
            unlocked() { return hasUpgrade('g', 12) },
            effect() {
                let extra = new Decimal(0)
                if(hasUpgrade('p', 64)) extra = extra.add(getBuyableAmount('p', 13))
                return getBuyableAmount('p', 11).add(extra).pow_base(5) }
          },
        12: {
            title: "Saguaro",
            cost(x) {let cost = new Decimal(1000).pow(x)
                if(hasUpgrade('p', 44)) cost=cost.dividedBy(getBuyableAmount('p', 12).add(1))
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
                return new Decimal(10).pow(getBuyableAmount('p', 12).add(extra))}
            },
        13: {
            title: "Echinocactus",
            cost(x) {let cost = new Decimal(100).add(new Decimal(x).times(new Decimal(100).add(upgradeEffect('p', 72))))
            return cost},
            display() { return "Multiply Plant cost base above 1 by 0.99. Hold to buy max. Cost: "+format(this.cost()) },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return hasUpgrade('p', 63)},
            purchaseLimit: 100,
            effect() {return new Decimal(0.99).pow(getBuyableAmount('p', 13))},
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
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('g', 22)) mult=mult.dividedBy(upgradeEffect('g', 22))
        if(hasUpgrade('p', 33)) mult=mult.dividedBy(upgradeEffect('p', 33))
        if(hasUpgrade('g', 34)) mult=mult.dividedBy(upgradeEffect('g', 34))
        if(hasUpgrade('p', 71)) mult=mult.dividedBy(upgradeEffect('p', 71))
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
            effect() {if(hasUpgrade('g', 43)) {return -3} else {return 0}}
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
            display() { return "Multiply Gain by Temperate Zone Completions. (free) Hold to buy max. Cost: "+format(this.cost()) },
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return new Decimal(challengeCompletions('z', 21)).gte(1)},
            effect() {return new Decimal(challengeCompletions('z', 21)).add(1).pow(getBuyableAmount('g', 11))},
            },
        12: {
            title: "Tunnel Features",
            cost(x) {let cost = new Decimal(100).add(new Decimal(x).times(10 + upgradeEffect('g', 43)))
            return cost},
            display() { return "Multiply Gain by Zones. (free) Hold to buy max. Cost: "+format(this.cost()) },
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return new Decimal(challengeCompletions('z', 21)).gte(2)},
            effect() {return player.z.points.add(1).pow(getBuyableAmount('g', 12))},
            },
        13: {
            title: "Exploration Features",
            cost(x) {let cost = new Decimal(100).add(new Decimal(x).times(20 + upgradeEffect('g', 43)))
            return cost},
            display() { return "Multiply Gain based on total first row Garden Buyable Purchases. (free) Hold to buy max. Cost: "+format(this.cost()) },
            canAfford() { return player.g.points.gte(this.cost()) },
            buy() {
                addBuyables(this.layer, this.id, 1)},
            unlocked() {return new Decimal(challengeCompletions('z', 21)).gte(3)},
            effect() {return getBuyableAmount('g', 11).add(getBuyableAmount('g', 12)).add(getBuyableAmount('g', 13)).root(2).pow(getBuyableAmount('g', 13))},
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
            challengeDescription: "Previous Challenge Effects and Gain is divided by log10 Points",
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
})