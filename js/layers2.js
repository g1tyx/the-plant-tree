addLayer("c", { // Ecosystems layer
    name: "conservation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {return options.emojiSymbols ? "🌿" : "C"},
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        conservation: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#FFAA55",
    requires: new Decimal("10"), // Can be a function that takes requirement increases into account
    resource: "Conservation Sites", // Name of prestige currency
    baseResource: "reclaimed ecosystems", // Name of resource prestige is based on
    baseAmount() {return player.re.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base() {return 1.2},
    roundUpCost: true,
    canBuyMax: true,
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                "milestones",
                "blank",
                "clickables",
                "blank",
            ],
        },
        "Conservation": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                ["display-text", function() {
                    return "You have <h2 style='color: #FFAA55'>"+format(player.c.conservation)+"</h2> Conservation<br>("+format(tmp.c.conservationGain)+"/sec, capped at "+format(tmp.c.conservationGain.mul(60))+")"
                }],
                "blank",
                "buyables",
                "blank",
                "upgrades",
                "blank",
            ],
        },
    },
    branches: ['e', 're', 'z', 'g'],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff) {
        player.c.conservation = player.c.conservation.add(tmp.c.conservationGain.mul(diff)).min(tmp.c.conservationGain.mul(60)).max(player.c.conservation)
    },
    automate() {
        if(hasUpgrade('c', 15)) {
            buyMaxBuyable('r', 23)
            buyMaxBuyable('r', 12)
        }
        if(hasMilestone('c', 1) && player.c.autoClickable) {
            clickClickable('c', 11)
            setBuyableAmount('p', 13, player.p.points.div(100).sub(1).min(tmp.p.buyables[13].purchaseLimit).max(getBuyableAmount('p', 13)))
        }
        if(hasUpgrade('c', 31)) {
            clickClickable('r', 11)
        }
    },
    conservationGain() {
        let gain = player.c.points.mul(player.c.points.sub(1).pow_base(2))
        gain = gain.mul(buyableEffect('c', 12))
        gain = gain.pow(buyableEffect('c', 13))
        gain = gain.mul(buyableEffect('c', 11))

        gain = gain.mul(smartUpgradeEffect('c', 11))
        gain = gain.mul(smartUpgradeEffect('c', 13))
        gain = gain.mul(smartUpgradeEffect('c', 14))
        gain = gain.mul(smartUpgradeEffect('c', 15))
        gain = gain.mul(smartUpgradeEffect('c', 33))
        gain = gain.mul(smartUpgradeEffect('c', 34))
        return gain
    },
    displayRow: 2,
    row: 4, // Row the layer is in on the tree (0 is the first row)
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return
        let row = layers[resettingLayer].row;

        let keep = [];
        layerDataReset(this.layer, keep)
    },
    effect: {
        points() {
            let eff = player.points.add(1).log(10).add(1)
            eff = eff.pow(player.c.points)
            return eff
        },
        leaves() {
            let eff = player.t.leaves.add(1).log(10).add(1)
            eff = eff.pow(player.c.points.root(2))
            return eff
        },
    },
    effectDescription() {
        let desc = "multiplying point gain by "+format(tmp.c.effect.points)+" and leaves gain by "+format(tmp.c.effect.leaves);
        return desc
    },
    hotkeys: [
        {key: "c", description: "C: Reset for Conservation Sites", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return tmp[this.layer].layerShown}},
        {key: "P", onPress(){clickClickable('c', 11)}, unlocked() {return hasMilestone('c', 0)}},
    ],
    layerShown(){return hasMilestone('n', 2)||player.c.best.gte(1)},
    milestones: {
        0: {
            requirementDescription: "1 Conservation Site",
            effectDescription: "Unlock a Hotkey/Clickable to buy all Plant Upgrades",
            done() {return player.c.points.gte(1)},
        },
        1: {
            requirementDescription: "2 Conservation Sites",
            effectDescription: "Auto-click the clickable and Echinocactus is autobought which unaffected by superscaling",
            done() {return player.c.points.gte(2)},
            toggles: [["c", "autoClickable"]],
        },
        2: {
            requirementDescription: "3 Conservation Sites",
            effectDescription: "Autobuy Garden Upgrades and Natural Disasters no longer log10 the leaves effect",
            done() {return player.c.points.gte(3)},
        },
        3: {
            requirementDescription: "5 Conservation Sites",
            effectDescription: "Coming Soon...",
            done() {return player.c.points.gte(5)},
        },
    },
    clickables: {
        11: {
            title: "[Shift+P]",
            display: "Buy all Plant upgrades and buyables and reset for Plants",
            onClick() {
                autobuyUpgrades('p')
                doReset('p', false)
                buyBuyable('p', 11)
                buyBuyable('p', 12)
                buyBuyable('p', 13)
            },
            onHold() {
                autobuyUpgrades('p')
                doReset('p', false)
                buyBuyable('p', 11)
                buyBuyable('p', 12)
                buyBuyable('p', 13)
            },
            canClick: true,
            unlocked() {return hasMilestone('c', 0)},
        },
    },
    upgrades: {
        11: {
            title: "Conservation Upgrade Foundation",
            description: "Each Conservation upgrade multiplies wildlife and conservation gain by 2",
            cost: new Decimal(48000),
            effect() {
                let eff = new Decimal(player.c.upgrades.length).pow_base(2)
                eff = eff.pow(smartUpgradeEffect('c', 21))
                return eff
            },
            effectDisplay() {return "×"+format(this.effect())},
            tooltip: "2 ^ Upgrades",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
        },
        12: {
            title: "Conservation Research",
            description: "Each Conservation upgrade multiplies research speed by 2",
            cost: new Decimal(44444444),
            effect() {
                return new Decimal(player.c.upgrades.length).pow_base(2)
            },
            effectDisplay() {return "×"+format(this.effect())},
            tooltip: "2 ^ Upgrades",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
        },
        13: {
            title: "Conservation Conservation",
            description: "Multiply conservation gain based on conservation",
            cost: new Decimal(88888888),
            effect() {
                return player.c.conservation.add(1).log(10).add(1)
            },
            effectDisplay() {return "×"+format(this.effect())},
            tooltip: "log10 conservation",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
        },
        14: {
            title: "Conservation Zones",
            description: "Multiply conservation gain by zones",
            cost: new Decimal("1.40e12"),
            effect() {
                return player.z.points.max(1)
            },
            effectDisplay() {return "×"+format(this.effect())},
            tooltip: "Zones",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
        },
        15: {
            title: "Plant Robotics MK III",
            description: "Buy max wildlife boosters and superboosters and wildlife superboosters multiply conservation gain",
            cost: new Decimal("1.50e14"),
            effect() {
                return getBuyableAmount('r', 23).add(1)
            },
            effectDisplay() {return "×"+format(this.effect())},
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
        },
        21: {
            title: "Meta Conservation Upgrade",
            description: "Raise the above upgrade based on conservation upgrades",
            cost: new Decimal("1.30e17"),
            effect() {
                return new Decimal(player.c.upgrades.length).div(10).add(1)
            },
            effectDisplay() {return "^"+format(this.effect())},
            tooltip: "1 + Upgrades ÷ 10",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
            unlocked() {return hasUpgrade('c', 15)},
        },
        22: {
            title: "Conservation Boost",
            description: "Conservation multiplies point and wildlife gain",
            cost: new Decimal("3.14e19"),
            effect() {
                return player.c.conservation.add(1)
            },
            effectDisplay() {return "×"+format(this.effect())},
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
            unlocked() {return hasUpgrade('c', 15)},
        },
        23: {
            title: "More Foundations",
            description: "point and ecology gain are multiplied by 2 per conservation upgrade",
            cost: new Decimal("3.5e21"),
            effect() {
                return new Decimal(player.c.upgrades.length).pow_base(2)
            },
            effectDisplay() {return "×"+format(this.effect())},
            tooltip: "2 ^ Upgrades",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
            unlocked() {return hasUpgrade('c', 15)},
        },
        24: {
            title: "Natural Resistance",
            description: "Keep all wildlife content on lower resets",
            cost: new Decimal("3.14e24"),
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
            unlocked() {return hasUpgrade('c', 15)},
        },
        25: {
            title: "Exponential Conservation",
            description: "Raise point gain based on conservation sites",
            cost: new Decimal("1e29"),
            effect() {
                return player.c.points.div(10).add(1)
            },
            effectDisplay() {return "^"+format(this.effect())},
            tooltip: "Conservation Sites ÷ 10 + 1",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
            unlocked() {return hasUpgrade('c', 15)},
        },
        31: {
            title: "Minigame Addict",
            description: "Autobuy Minigame Tokens",
            cost: new Decimal("1e34"),
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
            unlocked() {return hasUpgrade('c', 25)},
        },
        32: {
            title: "Conservation Budget",
            description: "Increase the 'Stable Conservation' effect base by conservation sites",
            cost: new Decimal("3e38"),
            effect() {
                return player.c.points.div(10)
            },
            effectDisplay() {return "+"+format(this.effect())},
            tooltip: "Conservation Sites ÷ 10",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
            unlocked() {return hasUpgrade('c', 25)},
        },
        33: {
            title: "Conservation Gambling",
            description: "Keep research minigame progress on lower resets and multiply conservation gain by reclaimed ecosystems",
            cost: new Decimal("1.80e44"),
            effect() {
                return player.re.points.add(1)
            },
            effectDisplay() {return "×"+format(this.effect())},
            tooltip: "Reclaimed Ecosystems + 1",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
            unlocked() {return hasUpgrade('c', 25)},
        },
        34: {
            title: "Protected Ecosystems",
            description: "Keep ecosystem count on this reset and they multiply conservation gain",
            cost: new Decimal("1.896e52"),
            effect() {
                return player.e.points.add(1)
            },
            effectDisplay() {return "×"+format(this.effect())},
            tooltip: "Ecosystems + 1",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
            unlocked() {return hasUpgrade('c', 25)},
        },
        35: {
            title: "Energy Conservation",
            description: "Multiply energy gain by conservation sites",
            cost: new Decimal("1e58"),
            effect() {
                return player.c.points.add(1)
            },
            effectDisplay() {return "×"+format(this.effect())},
            tooltip: "Conservation Sites + 1",
            currencyLayer: 'c',
            currencyInternalName: "conservation",
            currencyDisplayName: "conservation",
            unlocked() {return hasUpgrade('c', 25)},
        },
    },
    buyables: {
        11: {
            amount() {return getBuyableAmount(this.layer, this.id)},
            title: "Stable Conservation",
            display() {
                let desc = "Multiply conservation gain by 2<br>"
                desc += "Cost: "+format(this.cost())+" conservation<br>"
                desc += "Amount: "+format(this.amount())+"<br>"
                desc += "Effect: ×"+format(this.effect())+" conservation<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow(1.2).pow_base(3).mul(25)
                return cost
            },
            effect() {
                let base = new Decimal(2)
                base = base.add(smartUpgradeEffect('c', 32, 0))
                let effect = this.amount().pow_base(base)
                return effect
            },
            buy() {
                player.c.conservation = player.c.conservation.sub(this.cost()).max(0)
                addBuyables(this.layer, this.id, 1)
            },
            canAfford() {return player.c.conservation.gte(this.cost())},
        },
        12: {
            amount() {return getBuyableAmount(this.layer, this.id)},
            title: "Prepared Conservation",
            display() {
                let desc = "Multiply base conservation gain<br>"
                desc += "Cost: "+format(this.cost())+" conservation<br>"
                desc += "Amount: "+format(this.amount())+"<br>"
                desc += "Effect: ×"+format(this.effect())+" base conservation gain<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow(1.2).pow_base(3).mul(200)
                return cost
            },
            effect() {
                let effect = this.amount().add(1)
                return effect
            },
            buy() {
                player.c.conservation = player.c.conservation.sub(this.cost()).max(0)
                addBuyables(this.layer, this.id, 1)
            },
            canAfford() {return player.c.conservation.gte(this.cost())},
        },
        13: {
            amount() {return getBuyableAmount(this.layer, this.id)},
            title: "Determined Conservation",
            display() {
                let desc = "Raise base conservation gain<br>"
                desc += "Cost: "+format(this.cost())+" conservation<br>"
                desc += "Amount: "+format(this.amount())+"<br>"
                desc += "Effect: ^"+format(this.effect())+" base conservation gain<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow(1.5).pow_base(100).mul(1400)
                return cost
            },
            effect() {
                let effect = this.amount().add(1).min(this.amount().add(10).root(2))
                return effect
            },
            buy() {
                player.c.conservation = player.c.conservation.sub(this.cost()).max(0)
                addBuyables(this.layer, this.id, 1)
            },
            canAfford() {return player.c.conservation.gte(this.cost())},
        },
    },
})