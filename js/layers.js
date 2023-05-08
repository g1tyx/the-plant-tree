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
    base() {return 2},
    canBuyMax: true,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('p', 13)) mult=mult.dividedBy(upgradeEffect('p', 13))
        if(hasUpgrade('p', 21)) mult=mult.dividedBy(upgradeEffect('p', 21))
        if(hasUpgrade('p', 22)) mult=mult.dividedBy(upgradeEffect('p', 22))
        if(hasUpgrade('p', 23)) mult=mult.dividedBy(upgradeEffect('p', 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
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
            description: "Square milestone effect",
            cost: (new Decimal(3)),
            effect() {return player.p.points.add(1)},
            effectDisplay() {return "^2"},
        },
        12: {
            description: "Multiply point gain based on points",
            cost: (new Decimal(5)),
            effect() {return player.points.add(2).log(2)},
            effectDisplay() {return "x"+format(upgradeEffect('p', 12))},
            tooltip: "log2(Points + 2)"
        },
        13: {
            description: "Plant costs are divided by plants",
            cost: (new Decimal(12)),
            effect() {return player.p.points.add(1)},
            effectDisplay() {return "/"+format(upgradeEffect('p', 13))},
        },
        14: {
            description: "Points are multiplied based on magnitude",
            cost: (new Decimal(18)),
            effect() {return new Decimal(2).pow(player.points.add(1).log(10).floor())},
            effectDisplay() {return "x"+format(upgradeEffect('p', 14))},
            tooltip: "2 ^ Floor(log10(Points))",
        },
        21: {
            description: "Plant costs are divided by points",
            cost: (new Decimal(25)),
            effect() {return player.points.add(1).pow(0.1)},
            effectDisplay() {return "/"+format(upgradeEffect('p', 21))},
            tooltip: "Points ^ 0.1",
        },
        22: {
            description: "Plant costs are divided based on magnitude",
            cost: (new Decimal(30)),
            effect() {return new Decimal(2).pow(player.points.add(1).log(10).floor())},
            effectDisplay() {return "/"+format(upgradeEffect('p', 22))},
            tooltip: "2 ^ Floor(log10(Points))",
        },
        23: {
            description: "Plant costs divided by plants, only goes up at intervals of 10",
            cost: (new Decimal(40)),
            effect() {return player.p.points.dividedBy(10).floor().times(10).add(1)},
            effectDisplay() {return "/"+format(upgradeEffect('p', 23))},
            tooltip: "Floor(plants / 10) x 10",
        },
        24: {
            description: "Unlock Gardens and double point gain",
            cost: (new Decimal(50)),
            effectDisplay() {return "2"},
        },
    },
}),
addLayer("g", {
    name: "gardens", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#27B000",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "gardens", // Name of prestige currency
    baseResource: "plants", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    base() {return 2},
    canBuyMax: true,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
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
            description: "Multiply point gain by Gardens",
            cost: (new Decimal(1)),
            effect() {return player.g.points.add(2)},
            effectDisplay() {return "x"+format(upgradeEffect('g', 11))},
            tooltip: "Gardens + 2",
        }
    }
})