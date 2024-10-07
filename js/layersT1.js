addLayer("q", { // Quests layer
    name: "quests", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {return options.emojiSymbols ? "🧩" : "Q"},
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        tokens: new Decimal(0),
        // Quests
        quests: {
            compost: new Decimal(0),
            garden: new Decimal(0),
            beekeeping: new Decimal(0),
        },
        // Compost minigame
        compost: new Decimal(0),
        compostLevel: new Decimal(0),
        // Beekeeping minigame
        honey: new Decimal(0),

        resetTime: 0,
    }},
    getStartQuests() {
        let data = {};
        if (layers[this.layer].quests) {
            for (id in layers[this.layer].quests)
                if (isPlainObject(layers[this.layer].quests[id]))
                    data[id] = 0;
        }
        return data;
    },
    tree: "T1",
    color: "#CCAAFF",
    requires() {return 10}, // Can be a function that takes requirement increases into account
    resource: "quests", // Name of prestige currency
    baseResource: "searching points", // Name of resource prestige is based on
    baseAmount() {
        let amt = player.sPoints.max(0)
        return amt
    }, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: [],
    tooltip() {
        let tooltip = formatWhole(player.q.points)+" Quests"
        return tooltip
    },
    tabFormat: {
        "Quests": {
            content: [
                "main-display",
                ["display-text", function() {
                    return "You have <h2 style='color:#CCAAFF'>"+format(player.q.tokens)+"</h2> Tokens.<br>("+format(tmp.q.tokenGain)+"/sec)"
                }],
                "blank",
                "blank",
                "milestones",
                "blank",
                "blank",
                ["buyables", [1]],
            ],
        },
        "Compost": {
            content: [
                "main-display",
                ["display-text", function() {
                    return "You have <h2 style='color:#CCAAFF'>"+format(player.q.tokens)+"</h2> Tokens.<br>("+format(tmp.q.tokenGain)+"/sec)"
                }],
                "blank",
                ["display-text", function() {
                    return "You have "+format(player.q.compost)+"/10.00 compost required to increase the density of your compost.<br>You are currently at density lv. "+formatWhole(player.q.compostLevel)+" which translates to compost being compacted by "+format(player.q.compostLevel.mul(5).max(1))+"% and tokens being multiplied by "+format(player.q.compostLevel.pow_base(1.2))+"."
                }],
                "blank",
                ["bar", "compost"],
                "blank",
                ["buyables", [2]],
            ],
        },
        "Extra Garden": {
            content: [
                "main-display",
                ["display-text", function() {
                    return "You have <h2 style='color:#CCAAFF'>"+format(player.q.tokens)+"</h2> Tokens.<br>("+format(tmp.q.tokenGain)+"/sec)"
                }],
                "blank",
                "blank",
                ["buyables", [3]],
            ],
        },
        "Beekeeping": {
            content: [
                "main-display",
                ["display-text", function() {
                    return "You have <h2 style='color:#CCAAFF'>"+format(player.q.tokens)+"</h2> Tokens.<br>("+format(tmp.q.tokenGain)+"/sec)"
                }],
                "blank",
                ["display-text", function() {
                    return "You have <h2 style='color:#FFDD55'>"+format(player.q.honey)+"</h2> Honey.<br>("+format(tmp.q.honeyGain)+"/sec)"
                }],
                "blank",
                ["buyables", [4]],
            ],
        },
    },
    update(diff) {
        player.q.tokens = player.q.tokens.add(tmp.q.tokenGain.mul(diff))
        
        player.q.honey = player.q.honey.add(tmp.q.honeyGain.mul(diff))

        player.q.compost = getLogisticAmount(player.q.compost, tmp.q.compostGain, player.q.compostLevel.div(20).max(0.01), diff)

        if(player.q.compost.gte(10)) {
            player.q.compost = new Decimal(0)
            player.q.compostLevel = player.q.compostLevel.add(1)
        }
    },
    tokenGain() {
        if(player.navTab != 'T1') return new Decimal(0)

        let gain = new Decimal(0.1)
        gain = gain.add(getBuyableAmount('q', 32).div(50))
        gain = gain.mul(player.q.compostLevel.pow_base(1.2))
        gain = gain.mul(buyableEffect('q', 43))

        gain = gain.mul(buyableEffect('q', 11))
        gain = gain.mul(buyableEffect('q', 12))
        gain = gain.mul(buyableEffect('q', 13))
        return gain
    },
    compostGain() {
        if(player.navTab != 'T1') return new Decimal(0)

        let gain = new Decimal(0)
        gain = gain.add(buyableEffect('q', 21))
        return gain
    },
    honeyGain() {
        if(player.navTab != 'T1') return new Decimal(0)

        let gain = new Decimal(0)
        gain = gain.add(buyableEffect('q', 42))
        return gain
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return;
        let row = layers[resettingLayer].row;
        
        let keep = [];
        layerDataReset(this.layer, keep)
    },      
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    directMult() {
        let mult = new Decimal(1)
        return mult
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    milestones: {
        0: {
            requirementDescription: "6 Quests",
            effectDescription: "Explore other terrestrial planets",
            done() {return player.q.points.gte(6)},
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            amount() {return player.q.quests.compost},
            title: "Compost quest",
            display() {
                let desc = "Multiply token gain by 1.5 in exchange for <b>all</b> minigame content<br>"
                desc += "Requires: "+format(this.cost())+" compost density level<br>"
                desc += "Amount: "+format(this.amount())+"<br>"
                desc += "Effect: x"+format(this.effect())+" tokens<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow_base(1.5).mul(2)

                return cost.ceil()
            },
            effect() {
                let effect = this.amount().pow_base(1.5)
                return effect
            },
            buy() {
                player.q.quests.compost = player.q.quests.compost.add(1)
                player.q.points = player.q.points.add(1)
                layerDataReset(this.layer, ["points", "quests"])
            },
            canAfford() {return player.q.compostLevel.gte(this.cost())},
        },
        12: {
            amount() {return player.q.quests.garden},
            title: "Garden quest",
            display() {
                let desc = "Multiply token gain by 1.5 in exchange for <b>all</b> minigame content<br>"
                desc += "Requires: "+format(this.cost())+" trees<br>"
                desc += "Amount: "+format(this.amount())+"<br>"
                desc += "Effect: x"+format(this.effect())+" tokens<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow_base(1.5).mul(3)

                return cost.ceil()
            },
            effect() {
                let effect = this.amount().pow_base(1.5)
                return effect
            },
            buy() {
                player.q.quests.garden = player.q.quests.garden.add(1)
                player.q.points = player.q.points.add(1)
                layerDataReset(this.layer, ["points", "quests"])
            },
            canAfford() {return getBuyableAmount('q', 32).gte(this.cost())},
        },
        13: {
            amount() {return player.q.quests.beekeeping},
            title: "Beekeeping quest",
            display() {
                let desc = "Multiply token gain by 1.5 in exchange for <b>all</b> minigame content<br>"
                desc += "Requires: "+format(this.cost())+" beehives<br>"
                desc += "Amount: "+format(this.amount())+"<br>"
                desc += "Effect: x"+format(this.effect())+" tokens<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow_base(1.4).mul(3)

                return cost.ceil()
            },
            effect() {
                let effect = this.amount().pow_base(1.5)
                return effect
            },
            buy() {
                player.q.quests.beekeeping = player.q.quests.beekeeping.add(1)
                player.q.points = player.q.points.add(1)
                layerDataReset(this.layer, ["points", "quests"])
            },
            canAfford() {return getBuyableAmount('q', 43).gte(this.cost())},
        },

        21: {
            amount() {return getBuyableAmount(this.layer, this.id)},
            title: "Compost increase",
            display() {
                let desc = "Increase compost gain by 0.1<br>"
                desc += "Cost: "+format(this.cost())+" tokens<br>"
                desc += "Amount: "+format(this.amount())+"<br>"
                desc += "Effect: +"+format(this.effect())+" compost/sec<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow_base(1.5)

                return cost
            },
            effect() {
                let effect = this.amount().div(10)
                return effect
            },
            buy() {
                player.q.tokens = player.q.tokens.sub(this.cost()).max(0)
                addBuyables(this.layer, this.id, 1)
            },
            canAfford() {return player.q.tokens.gte(this.cost())},
        },

        31: {
            amount() {return getBuyableAmount(this.layer, this.id)},
            title: "Plant",
            display() {
                let desc = "Add 1 Plant to the extra garden<br>"
                desc += "Cost: "+format(this.cost())+" tokens<br>"
                desc += "Effect: "+format(this.amount())+" plants<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow_base(1.4)

                return cost
            },
            buy() {
                player.q.tokens = player.q.tokens.sub(this.cost()).max(0)
                addBuyables(this.layer, this.id, 1)
            },
            canAfford() {return player.q.tokens.gte(this.cost())},
        },
        32: {
            amount() {return getBuyableAmount(this.layer, this.id)},
            title: "Tree",
            display() {
                let desc = "Add 1 Tree to the extra garden and increase token gain by 0.02<br>"
                desc += "Cost: "+format(this.cost())+" plants<br>"
                desc += "Effect: "+format(this.amount())+" trees<br>, +"+format(this.amount().div(50))+" tokens/sec<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow_base(1.4).mul(2)

                return cost.floor()
            },
            buy() {
                setBuyableAmount('q', 31, getBuyableAmount('q', 31).sub(this.cost()))
                addBuyables(this.layer, this.id, 1)
            },
            canAfford() {return getBuyableAmount('q', 31).gte(this.cost())},
        },
        
        41: {
            amount() {return getBuyableAmount(this.layer, this.id)},
            title: "Bee",
            display() {
                let desc = "Add 1 Bee<br>"
                desc += "Cost: "+format(this.cost())+" tokens<br>"
                desc += "Effect: "+format(this.amount())+" bees<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow_base(2)

                return cost
            },
            buy() {
                player.q.tokens = player.q.tokens.sub(this.cost()).max(0)
                addBuyables(this.layer, this.id, 1)
            },
            canAfford() {return player.q.tokens.gte(this.cost())},
        },
        42: {
            amount() {return getBuyableAmount(this.layer, this.id)},
            title: "Honey production",
            display() {
                let desc = "Each bee adds 0.01 honey production<br>"
                desc += "Cost: "+format(this.cost())+" tokens<br>"
                desc += "Effect: +"+format(this.effect())+" honey/sec<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow_base(3)

                return cost
            },
            effect() {
                let effect = this.amount().mul(getBuyableAmount('q', 41)).div(100)
                return effect
            },
            buy() {
                player.q.tokens = player.q.tokens.sub(this.cost()).max(0)
                addBuyables(this.layer, this.id, 1)
            },
            canAfford() {return player.q.tokens.gte(this.cost())},
        },
        43: {
            amount() {return getBuyableAmount(this.layer, this.id)},
            title: "Beehive",
            display() {
                let desc = "Add 1 Beehive and multiply token gain by 1.1<br>"
                desc += "Cost: "+format(this.cost())+" honey<br>"
                desc += "Effect: "+format(this.amount())+" beehives, x"+format(this.effect())+" tokens<br>"
                return desc
            },
            cost() {
                let cost = this.amount().pow_base(2)

                return cost
            },
            effect() {
                let effect = this.amount().pow_base(1.1)
                return effect
            },
            buy() {
                player.q.honey = player.q.honey.sub(this.cost()).max(0)
                addBuyables(this.layer, this.id, 1)
            },
            canAfford() {return player.q.honey.gte(this.cost())},
        },
    },
    bars: {
        compost: {
            direction: UP,
            height: 200,
            width: 100,
            progress() {return player.q.compost.div(10)},
        },
    },
})
addLayer("nav", { // Navigation layer
    name: "navigation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {return options.emojiSymbols ? "🧭" : "Nv"},
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
    }},
    color: "#FFFFAA",
    requires() {return 10}, // Can be a function that takes requirement increases into account
    resource: "quests", // Name of prestige currency
    baseResource: "searching points", // Name of resource prestige is based on
    baseAmount() {
        let amt = player.sPoints.max(0)
        return amt
    }, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: [],
    tooltip() {
        let tooltip = "Navigation"
        return tooltip
    },
    tabFormat: {
        "Navigation": {
            content: [
                ["display-text", 
                    "<h2>Navigation</h2>"
                ],
                "blank",
                "clickables",
            ],
        },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return;
        let row = layers[resettingLayer].row;
        
        let keep = [];
        layerDataReset(this.layer, keep)
    },      
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    directMult() {
        let mult = new Decimal(1)
        return mult
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasAchievement('a', 135)},
    clickables: {
        11: {
            title: "Planet Location",
            canClick: true,
            onClick() {
                player.navTab = 'T1'
            },
        },
        21: {
            title: "Venus",
            canClick: true,
            onClick() {
                player.navTab = 'tree-tab'
            },
        },
        31: {
            title: "Solar System",
            canClick: true,
            onClick() {
                player.navTab = 'solar-system'
            },
            unlocked() {return hasMilestone('q', 0)},
        },
    },
})