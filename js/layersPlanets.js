addLayer("me", { // Mercury layer
    name: "mercury", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "☿",
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,

        resources: {
            metal: new Decimal(0),
            glass: new Decimal(0),
            soil: new Decimal(0),
            rockets: new Decimal(0),

            plants: new Decimal(0),
        },

        infra: {
            panels: new Decimal(0),
            launchPad: false,
            greenhouses: new Decimal(0)
        },

        shipLoad: {
            metal: new Decimal(0),
            glass: new Decimal(0),
            soil: new Decimal(0),

            plants: new Decimal(0),
        },

        wildlife: {
            herbivores: new Decimal(0),
            carnivores: new Decimal(0),
        },
    }},
    tree: "solar-system",
    color: "#555555",
    requires() {return 10}, // Can be a function that takes requirement increases into account
    resource: "Mercury plants", // Name of prestige currency
    baseResource: "Research", // Name of resource prestige is based on
    baseAmount() {
        let amt = player.r.points.max(0)
        return amt
    }, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: [],

    coordinates() {
        return {
            x: new Decimal(player.timePlayed*0.171).cos().mul(150),
            y: new Decimal(player.timePlayed*0.171).sin().mul(150),
        }
    },

    nodeStyle: {
        'transform': function() {return 'translate('+format(new Decimal(player.timePlayed/1).sin()*50)+'px, 0px)'},
    },
    tooltip() {
        let tooltip = "Mercury"
        return tooltip
    },
    tabFormat: {
        "Overview": {
            content: [
                ["display-text", 
                    "<h2>Mercury</h2>"
                ],
                "blank",
                ["display-text", function() {
                    return `x: ${format(tmp[this.layer].coordinates.x, 6)} y: ${format(tmp[this.layer].coordinates.y, 6)}`
                }],
                "blank",
                ["display-text", function() {
                    return `
                    Distance to Venus: ${format(getDistance([tmp.me.coordinates.x, tmp.me.coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]))}<br>
                    Distance to Earth: ${format(getDistance([tmp.me.coordinates.x, tmp.me.coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]))}<br>
                    Distance to Mars: ${format(getDistance([tmp.me.coordinates.x, tmp.me.coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]))}<br>
                    `
                }],
                "blank",
                ["display-text", function() {
                    return `
                    Atmosphere integrity: ${format(tmp[this.layer].atmosphere.mul(100))}%
                    `
                }],
            ],
        },
        "Rockets": {
            content: [
                ["display-text", 
                    "<h2>Mercury</h2>"
                ],
                ["display-text", function() {
                    return `
                    Distance to Venus: ${format(getDistance([tmp.me.coordinates.x, tmp.me.coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]))}<br>
                    Distance to Earth: ${format(getDistance([tmp.me.coordinates.x, tmp.me.coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]))}<br>
                    Distance to Mars: ${format(getDistance([tmp.me.coordinates.x, tmp.me.coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]))}<br>
                    `
                }],
                "blank",
                ["row", [
                    ["bar", "venus"],
                    ["bar", "earth"],
                    ["bar", "mars"],
                ]],
                ["display-text", 
                    "Distances to each planet"
                ],
                "blank",
                function() {
                    return player[this.layer].infra.launchPad ? ["clickables", [3, 4]] : "blank"
                },
                "blank",
                function() {
                    return player[this.layer].resources.rockets.gt(0) ? ["display-text", `
                        ${format(player[this.layer].shipLoad.metal)}/100 metal on ship<br>
                        ${format(player[this.layer].shipLoad.glass)}/100 glass on ship<br>
                        ${format(player[this.layer].shipLoad.soil)}/1000 soil on ship<br>
                        ${format(player[this.layer].shipLoad.plants)}/100 plants on ship<br>
                        `] : "blank"
                },
            ],
        },
        "Infrastructure": {
            content: [
                ["display-text", function() {
                    return `
                    You have ${format(player.me.resources.metal)} metal.<br><br>
                    You have ${format(player.me.resources.glass)} glass.<br><br>
                    You have ${format(player.me.resources.soil)} soil.<br><br>
                    You have ${format(player.me.resources.rockets)} rockets.<br><br><br><br>
                    You have ${format(player.me.infra.panels)} solar panels. (+${format(player.me.infra.panels.root(1.2).mul(3).mul(smartMilestoneEffect('sr', 3, {me: 1}).me))} energy/sec)<br><br>
                    You have ${format(player.me.infra.greenhouses)} greenhouses.<br><br>
                    `
                }],
                ["clickables", [2]],
            ],
        },
        "Wildlife": {
            content: [
                ["display-text", function() {
                    return `
                    This planet contains ${format(player[this.layer].resources.plants)} plants.<br><br>
                    ${format(player[this.layer].wildlife.herbivores)} herbivores call this planet their home.<br><br>
                    ${format(player[this.layer].wildlife.carnivores)} carnivores call this planet their home.<br><br>
                    `
                }],
            ],
        },
    },

    bars: {
        venus: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.me.coordinates.x, tmp.me.coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]).div(350)
            },
            display: "Ve",
            fillStyle: {
                'background-color'() {return tmp.ve.color},
            },
        },
        earth: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.me.coordinates.x, tmp.me.coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]).div(400)
            },
            display: "Ea",
            fillStyle: {
                'background-color'() {return tmp.ea.color},
            },
        },
        mars: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.me.coordinates.x, tmp.me.coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]).div(500)
            },
            display: "Ma",
            fillStyle: {
                'background-color'() {return tmp.ma.color},
            },
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
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.navTab == "solar-system"},

    atmosphere() {
        return player[this.layer].resources.plants.root(2).div(100).min(1)
    },


    update(diff) {
        let capacity = player[this.layer].infra.greenhouses.mul(100)
        if(player[this.layer].resources.plants.gte(capacity)) {
            player[this.layer].resources.plants = player[this.layer].resources.plants.sub(capacity).mul(new Decimal(0.90).add(tmp[this.layer].atmosphere.div(10)).pow(diff)).add(capacity)
        }
        player[this.layer].resources.plants = player[this.layer].resources.plants.min(10000)

        let herbGoal = player[this.layer].resources.plants.div(100).root(1.2)
        player[this.layer].wildlife.herbivores = player[this.layer].wildlife.herbivores.sub(herbGoal).mul(new Decimal(0.99).pow(diff)).add(herbGoal)

        let carnGoal = player[this.layer].wildlife.herbivores.add(player[this.layer].wildlife.carnivores).div(100).root(1.2)
        player[this.layer].wildlife.carnivores = player[this.layer].wildlife.carnivores.sub(carnGoal).mul(new Decimal(0.99).pow(diff)).add(carnGoal)
    },


    clickables: {
        21: {
            title: "Solar Panel",
            display: "Use 0.25 metal and 0.25 glass to construct 1 solar panel",
            canClick() {
                return player[this.layer].resources.metal.gte(0.25) && player[this.layer].resources.glass.gte(0.25) && player[this.layer].infra.panels.lt(100)
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(0.25)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(0.25)
                player[this.layer].infra.panels = player[this.layer].infra.panels.add(1)
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(0.25)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(0.25)
                player[this.layer].infra.panels = player[this.layer].infra.panels.add(1)
            },
        },
        22: {
            title: "Rocket",
            display: "Use 3 metal and 2 solar panels to construct 1 rocket",
            canClick() {
                return player[this.layer].resources.metal.gte(3) && player[this.layer].infra.panels.gte(2)
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(3)
                player[this.layer].infra.panels = player[this.layer].infra.panels.sub(2)
                player[this.layer].resources.rockets = player[this.layer].resources.rockets.add(1)
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(3)
                player[this.layer].infra.panels = player[this.layer].infra.panels.sub(2)
                player[this.layer].resources.rockets = player[this.layer].resources.rockets.add(1)
            },
        },
        23: {
            title: "Launch Pad",
            display: "Use 2 metal to construct a launch pad",
            canClick() {
                return player[this.layer].resources.metal.gte(2) && !player[this.layer].infra.launchPad
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].infra.launchPad = true
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].infra.launchPad = true
            },
        },
        24: {
            title: "Greenhouse",
            display: "Use 2 metal, 2 glass and 10 soil to construct a greenhouse",
            canClick() {
                return player[this.layer].resources.metal.gte(2) && player[this.layer].resources.glass.gte(2) && player[this.layer].resources.soil.gte(10) && player[this.layer].infra.greenhouses.lt(100)
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(2)
                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(10)
                player[this.layer].infra.greenhouses = player[this.layer].infra.greenhouses.add(1)
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(2)
                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(10)
                player[this.layer].infra.greenhouses = player[this.layer].infra.greenhouses.add(1)
            },
        },

        31: {
            title: "Load Metal",
            display: "Load 25% of your current metal on Mercury into the ship.",
            canClick() {
                return player[this.layer].resources.metal.gt(0) && player[this.layer].shipLoad.metal.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.metal.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.metal))

                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(load)

                player[this.layer].shipLoad.metal = player[this.layer].shipLoad.metal.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.metal.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.metal))

                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(load)

                player[this.layer].shipLoad.metal = player[this.layer].shipLoad.metal.add(load)
            },
        },
        32: {
            title: "Load Glass",
            display: "Load 25% of your current glass on Mercury into the ship.",
            canClick() {
                return player[this.layer].resources.glass.gt(0) && player[this.layer].shipLoad.glass.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.glass.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.glass))

                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(load)

                player[this.layer].shipLoad.glass = player[this.layer].shipLoad.glass.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.glass.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.glass))

                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(load)

                player[this.layer].shipLoad.glass = player[this.layer].shipLoad.glass.add(load)
            },
        },
        33: {
            title: "Load Soil",
            display: "Load 25% of your current soil on Mercury into the ship.",
            canClick() {
                return player[this.layer].resources.soil.gt(0) && player[this.layer].shipLoad.soil.lt(1000) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.soil.div(4)
                load = load.min(new Decimal(1000).sub(player[this.layer].shipLoad.soil))

                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(load)

                player[this.layer].shipLoad.soil = player[this.layer].shipLoad.soil.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.soil.div(4)
                load = load.min(new Decimal(1000).sub(player[this.layer].shipLoad.soil))

                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(load)

                player[this.layer].shipLoad.soil = player[this.layer].shipLoad.soil.add(load)
            },
        },
        34: {
            title: "Load Plants",
            display: "Load 25% of your current plants on Mercury into the ship.",
            canClick() {
                return player[this.layer].resources.plants.gt(0) && player[this.layer].shipLoad.plants.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.plants.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.plants))

                player[this.layer].resources.plants = player[this.layer].resources.plants.sub(load)

                player[this.layer].shipLoad.plants = player[this.layer].shipLoad.plants.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.plants.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.plants))

                player[this.layer].resources.plants = player[this.layer].resources.plants.sub(load)

                player[this.layer].shipLoad.plants = player[this.layer].shipLoad.plants.add(load)
            },
        },

        41: {
            title: "Launch to Venus",
            display() {return `
                Launch your rocket to Venus.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 've')
            },
            onHold() {
                transferResources(this.layer, 've')
            },
        },
        42: {
            title: "Launch to Earth",
            display() {return `
                Launch your rocket to Earth.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 'ea')
            },
            onHold() {
                transferResources(this.layer, 'ea')
            },
        },
        43: {
            title: "Launch to Mars",
            display() {return `
                Launch your rocket to Mars.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 'ma')
            },
            onHold() {
                transferResources(this.layer, 'ma')
            },
        },
    },
})
addLayer("ve", { // Venus layer
    name: "venus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♀",
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,

        resources: {
            metal: new Decimal(0),
            glass: new Decimal(0),
            soil: new Decimal(0),
            rockets: new Decimal(0),

            plants: new Decimal(0)
        },

        infra: {
            panels: new Decimal(0),
            launchPad: false,
            greenhouses: new Decimal(0)
        },

        shipLoad: {
            metal: new Decimal(0),
            glass: new Decimal(0),
            soil: new Decimal(0),

            plants: new Decimal(0),
        },

        wildlife: {
            herbivores: new Decimal(0),
            carnivores: new Decimal(0),
        },
    }},
    tree: "solar-system",
    color: "#FF7700",
    requires() {return 10}, // Can be a function that takes requirement increases into account
    resource: "Venus plants", // Name of prestige currency
    baseResource: "Research", // Name of resource prestige is based on
    baseAmount() {
        let amt = player.r.points.max(0)
        return amt
    }, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ['me'],

    coordinates() {
        return {
            x: new Decimal(player.timePlayed/12.3).cos().mul(200),
            y: new Decimal(player.timePlayed/12.3).sin().mul(200),
        }
    },

    nodeStyle: {
        'transform': function() {return 'translate('+format(new Decimal(player.timePlayed/3.8).sin()*75)+'px, 0px)'},
    },
    tooltip() {
        let tooltip = "Venus"
        return tooltip
    },
    tabFormat: {
        "Overview": {
            content: [
                ["display-text", 
                    "<h2>Venus</h2> is fully terraformed."
                ],
                "blank",
                ["display-text", function() {
                    return `x: ${format(tmp[this.layer].coordinates.x, 6)} y: ${format(tmp[this.layer].coordinates.y, 6)}`
                }],
                "blank",
                ["display-text", function() {
                    return `
                    Distance to Mercury: ${format(getDistance([tmp.ve.coordinates.x, tmp.ve.coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]))}<br>
                    Distance to Earth: ${format(getDistance([tmp.ve.coordinates.x, tmp.ve.coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]))}<br>
                    Distance to Mars: ${format(getDistance([tmp.ve.coordinates.x, tmp.ve.coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]))}<br>
                    `
                }],
                "blank",
                ["clickables", [1]],
            ],
        },
        "Rockets": {
            content: [
                ["display-text", 
                    "<h2>Venus</h2>"
                ],
                ["display-text", function() {
                    return `
                    Distance to Mercury: ${format(getDistance([tmp.ve.coordinates.x, tmp.ve.coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]))}<br>
                    Distance to Earth: ${format(getDistance([tmp.ve.coordinates.x, tmp.ve.coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]))}<br>
                    Distance to Mars: ${format(getDistance([tmp.ve.coordinates.x, tmp.ve.coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]))}<br>
                    `
                }],
                "blank",
                ["row", [
                    ["bar", "mercury"],
                    ["bar", "earth"],
                    ["bar", "mars"],
                ]],
                ["display-text", 
                    "Distances to each planet"
                ],
                "blank",
                function() {
                    return player[this.layer].infra.launchPad ? ["clickables", [3, 4]] : "blank"
                },
                "blank",
                function() {
                    return player[this.layer].resources.rockets.gt(0) ? ["display-text", `
                        ${format(player[this.layer].shipLoad.metal)}/100 metal on ship<br>
                        ${format(player[this.layer].shipLoad.glass)}/100 glass on ship<br>
                        ${format(player[this.layer].shipLoad.soil)}/1000 soil on ship<br>
                        ${format(player[this.layer].shipLoad.plants)}/100 plants on ship<br>
                        `] : "blank"
                },
            ],
        },
        "Infrastructure": {
            content: [
                ["display-text", function() {
                    return `
                    You have ${format(player.ve.resources.metal)} metal.<br><br>
                    You have ${format(player.ve.resources.glass)} glass.<br><br>
                    You have ${format(player.ve.resources.soil)} soil.<br><br>
                    You have ${format(player.ve.resources.rockets)} rockets.<br><br><br><br>
                    You have ${format(player.ve.infra.panels)} solar panels. (+${format(player.ve.infra.panels.root(1.2).mul(3))} energy/sec)<br><br>
                    `
                }],
                ["clickables", [2]],
            ],
        },
        "Wildlife": {
            content: [
                ["display-text", function() {
                    return `
                    This planet contains ${format(player[this.layer].resources.plants)} plants.<br><br>
                    ${format(player[this.layer].wildlife.herbivores)} herbivores call this planet their home.<br><br>
                    ${format(player[this.layer].wildlife.carnivores)} carnivores call this planet their home.<br><br>
                    `
                }],
            ],
        },
    },

    bars: {
        mercury: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.ve.coordinates.x, tmp.ve.coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]).div(350)
            },
            display: "Me",
            fillStyle: {
                'background-color'() {return tmp.me.color},
            },
        },
        earth: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.ve.coordinates.x, tmp.ve.coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]).div(450)
            },
            display: "Ea",
            fillStyle: {
                'background-color'() {return tmp.ea.color},
            },
        },
        mars: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.ve.coordinates.x, tmp.ve.coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]).div(550)
            },
            display: "Ma",
            fillStyle: {
                'background-color'() {return tmp.ma.color},
            },
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.navTab == "solar-system"},


    update(diff) {
        player.ve.resources.plants = player.p.points

        let herbGoal = player[this.layer].resources.plants.div(100).root(1.2)
        player[this.layer].wildlife.herbivores = player[this.layer].wildlife.herbivores.sub(herbGoal).mul(new Decimal(0.99).pow(diff)).add(herbGoal)

        let carnGoal = player[this.layer].wildlife.herbivores.add(player[this.layer].wildlife.carnivores).div(100).root(1.2)
        player[this.layer].wildlife.carnivores = player[this.layer].wildlife.carnivores.sub(carnGoal).mul(new Decimal(0.99).pow(diff)).add(carnGoal)

        if(hasMilestone('sr', 5)) clickClickable('ve', 34)
    },


    clickables: {
        11: {
            title: "Go to Venus",
            canClick: true,
            onClick() {
                player.navTab = 'tree-tab'
            },
        },
        
        21: {
            title: "Solar Panel",
            display: "Use 0.25 metal and 0.25 glass to construct 1 solar panel",
            canClick() {
                return player[this.layer].resources.metal.gte(0.25) && player[this.layer].resources.glass.gte(0.25) && player[this.layer].infra.panels.lt(100)
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(0.25)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(0.25)
                player[this.layer].infra.panels = player[this.layer].infra.panels.add(1)
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(0.25)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(0.25)
                player[this.layer].infra.panels = player[this.layer].infra.panels.add(1)
            },
        },
        22: {
            title: "Rocket",
            display: "Use 3 metal and 2 solar panels to construct 1 rocket",
            canClick() {
                return player[this.layer].resources.metal.gte(3) && player[this.layer].infra.panels.gte(2)
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(3)
                player[this.layer].infra.panels = player[this.layer].infra.panels.sub(2)
                player[this.layer].resources.rockets = player[this.layer].resources.rockets.add(1)
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(3)
                player[this.layer].infra.panels = player[this.layer].infra.panels.sub(2)
                player[this.layer].resources.rockets = player[this.layer].resources.rockets.add(1)
            },
        },
        23: {
            title: "Launch Pad",
            display: "Use 2 metal to construct a launch pad",
            canClick() {
                return player[this.layer].resources.metal.gte(2) && !player[this.layer].infra.launchPad
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].infra.launchPad = true
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].infra.launchPad = true
            },
        },

        31: {
            title: "Load Metal",
            display: "Load 25% of your current metal on Venus into the ship.",
            canClick() {
                return player[this.layer].resources.metal.gt(0) && player[this.layer].shipLoad.metal.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.metal.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.metal))

                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(load)

                player[this.layer].shipLoad.metal = player[this.layer].shipLoad.metal.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.metal.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.metal))

                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(load)

                player[this.layer].shipLoad.metal = player[this.layer].shipLoad.metal.add(load)
            },
        },
        32: {
            title: "Load Glass",
            display: "Load 25% of your current glass on Venus into the ship.",
            canClick() {
                return player[this.layer].resources.glass.gt(0) && player[this.layer].shipLoad.glass.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.glass.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.glass))

                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(load)

                player[this.layer].shipLoad.glass = player[this.layer].shipLoad.glass.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.glass.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.glass))

                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(load)

                player[this.layer].shipLoad.glass = player[this.layer].shipLoad.glass.add(load)
            },
        },
        33: {
            title: "Load Soil",
            display: "Load 25% of your current soil on Venus into the ship.",
            canClick() {
                return player[this.layer].resources.soil.gt(0) && player[this.layer].shipLoad.soil.lt(1000) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.soil.div(4)
                load = load.min(new Decimal(1000).sub(player[this.layer].shipLoad.soil))

                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(load)

                player[this.layer].shipLoad.soil = player[this.layer].shipLoad.soil.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.soil.div(4)
                load = load.min(new Decimal(1000).sub(player[this.layer].shipLoad.soil))

                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(load)

                player[this.layer].shipLoad.soil = player[this.layer].shipLoad.soil.add(load)
            },
        },
        34: {
            title: "Load Plants",
            display: "Load 25% of your current plants on Venus into the ship.",
            canClick() {
                return player[this.layer].resources.plants.gt(0) && player[this.layer].shipLoad.plants.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.plants.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.plants))

                player[this.layer].resources.plants = player[this.layer].resources.plants.sub(load)

                player[this.layer].shipLoad.plants = player[this.layer].shipLoad.plants.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.plants.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.plants))

                player[this.layer].resources.plants = player[this.layer].resources.plants.sub(load)

                player[this.layer].shipLoad.plants = player[this.layer].shipLoad.plants.add(load)
            },
        },

        41: {
            title: "Launch to Mercury",
            display() {return `
                Launch your rocket to Mercury.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 'me')
            },
            onHold() {
                transferResources(this.layer, 'me')
            },
        },
        42: {
            title: "Launch to Earth",
            display() {return `
                Launch your rocket to Earth.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 'ea')
            },
            onHold() {
                transferResources(this.layer, 'ea')
            },
        },
        43: {
            title: "Launch to Mars",
            display() {return `
                Launch your rocket to Mars.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 'ma')
            },
            onHold() {
                transferResources(this.layer, 'ma')
            },
        },
    },
})
addLayer("ea", { // Earth layer
    name: "earth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🜨",
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,

        money: new Decimal(0),
        resources: {
            metal: new Decimal(0),
            glass: new Decimal(0),
            soil: new Decimal(0),
            rockets: new Decimal(0),

            plants: new Decimal(0),
        },

        clickableData: {
            cooldown: new Decimal(100),
        },

        infra: {
            panels: new Decimal(0),
            launchPad: false,
        },

        shipLoad: {
            metal: new Decimal(0),
            glass: new Decimal(0),
            soil: new Decimal(0),

            plants: new Decimal(0),
        },

        wildlife: {
            herbivores: new Decimal(0),
            carnivores: new Decimal(0),
        },

        //Automation
        autoSell: false,
    }},
    tree: "solar-system",
    color: "#55AAFF",
    requires() {return 10}, // Can be a function that takes requirement increases into account
    resource: "Earth plants", // Name of prestige currency
    baseResource: "Research", // Name of resource prestige is based on
    baseAmount() {
        let amt = player.r.points.max(0)
        return amt
    }, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ['ve'],

    coordinates() {
        return {
            x: new Decimal(player.timePlayed/-15.3).cos().mul(250),
            y: new Decimal(player.timePlayed/-15.3).sin().mul(250),
        }
    },

    nodeStyle: {
        'transform': function() {return 'translate('+format(new Decimal(player.timePlayed/8.41).sin()*100)+'px, 0px)'},
    },
    tooltip() {
        let tooltip = "Earth"
        return tooltip
    },
    tabFormat: {
        "Overview": {
            content: [
                ["display-text", 
                    "<h2>Earth</h2>'s ecosystems are still alive."
                ],
                "blank",
                ["display-text", function() {
                    return `x: ${format(tmp[this.layer].coordinates.x, 6)} y: ${format(tmp[this.layer].coordinates.y, 6)}`
                }],
                "blank",
                ["display-text", function() {
                    return `
                    Distance to Mercury: ${format(getDistance([tmp.ea.coordinates.x, tmp.ea.coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]))}<br>
                    Distance to Venus: ${format(getDistance([tmp.ea.coordinates.x, tmp.ea.coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]))}<br>
                    Distance to Mars: ${format(getDistance([tmp.ea.coordinates.x, tmp.ea.coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]))}<br>
                    `
                }],
                "blank",
            ],
        },
        "Rockets": {
            content: [
                ["display-text", 
                    "<h2>Earth</h2>"
                ],
                ["display-text", function() {
                    return `
                    Distance to Mercury: ${format(getDistance([tmp.ea.coordinates.x, tmp.ea.coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]))}<br>
                    Distance to Venus: ${format(getDistance([tmp.ea.coordinates.x, tmp.ea.coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]))}<br>
                    Distance to Mars: ${format(getDistance([tmp.ea.coordinates.x, tmp.ea.coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]))}<br>
                    `
                }],
                "blank",
                ["row", [
                    ["bar", "mercury"],
                    ["bar", "venus"],
                    ["bar", "mars"],
                ]],
                ["display-text", 
                    "Distances to each planet"
                ],
                "blank",
                function() {
                    return player[this.layer].infra.launchPad ? ["clickables", [3, 4]] : "blank"
                },
                "blank",
                function() {
                    return player[this.layer].resources.rockets.gt(0) ? ["display-text", `
                        ${format(player[this.layer].shipLoad.metal)}/100 metal on ship<br>
                        ${format(player[this.layer].shipLoad.glass)}/100 glass on ship<br>
                        ${format(player[this.layer].shipLoad.soil)}/1000 soil on ship<br>
                        ${format(player[this.layer].shipLoad.plants)}/100 plants on ship<br>
                        `] : "blank"
                },
            ],
        },
        "Market": {
            content: [
                ["display-text", function() {
                    return `
                    You have <h2>${format(player.ea.money)}</h2> money.<br><br>
                    You have <h3>${format(player.sr.points)}</h3> energy.
                    `
                }],
                "blank",
                ["clickables", [1]],
                "blank",
                ["display-text", function() {
                    return `
                    You have <h3>${format(player.ea.resources.metal)}</h3> metal.<br><br>
                    You have <h3>${format(player.ea.resources.glass)}</h3> glass.<br><br>
                    You have <h3>${format(player.ea.resources.soil)}</h3> soil.<br><br>
                    You have <h3>${format(player.ea.resources.rockets)}</h3> rockets.<br><br>
                    `
                }],
            ],
        },
        "Infrastructure": {
            content: [
                ["display-text", function() {
                    return `
                    You have ${format(player.ea.resources.metal)} metal.<br><br>
                    You have ${format(player.ea.resources.glass)} glass.<br><br>
                    You have ${format(player.ea.resources.soil)} soil.<br><br>
                    You own ${format(player.ea.resources.plants)} plants on Earth.<br><br>
                    You have ${format(player.ea.resources.rockets)} rockets.<br><br><br><br>
                    You have ${format(player.ea.infra.panels)} solar panels. (+${format(player.ea.infra.panels.root(1.2).mul(3))} energy/sec)<br><br>
                    `
                }],
                ["clickables", [2]],
            ],
        },
    },

    bars: {
        mercury: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.ea.coordinates.x, tmp.ea.coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]).div(400)
            },
            display: "Me",
            fillStyle: {
                'background-color'() {return tmp.me.color},
            },
        },
        venus: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.ea.coordinates.x, tmp.ea.coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]).div(450)
            },
            display: "Ve",
            fillStyle: {
                'background-color'() {return tmp.ve.color},
            },
        },
        mars: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.ea.coordinates.x, tmp.ea.coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]).div(600)
            },
            display: "Ma",
            fillStyle: {
                'background-color'() {return tmp.ma.color},
            },
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
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.navTab == "solar-system"},


    update(diff){
        player.ea.clickableData.cooldown = player.ea.clickableData.cooldown.add(diff)

        if(hasMilestone('sr', 4) && player.ea.autoSell) clickClickable('ea', 11)
    },


    clickables: {
        11: {
            title: "Sell energy",
            display() {
                return `Sell 25% of your current energy for <b>${format(this.value())} money</b>`
            },
            canClick() {return player.ea.clickableData.cooldown.gte(1)},
            onClick() {
                player.ea.money = player.ea.money.add(this.value())
                player.sr.points = player.sr.points.mul(0.75)
                player.ea.clickableData.cooldown = new Decimal(0)
            },
            value() {
                let value = player.sr.points.div(4).root(2).div(10)

                if(hasMilestone('sr', 0)) value = value.mul(2)
                value = value.mul(smartMilestoneEffect('sr', 1))

                return value
            },
        },
        12: {
            title: "Buy metal",
            display() {
                return `Use 25% of your current money for <b>${format(player.ea.money.div(4).root(1.1).floor().div(10))} metal</b>`
            },
            canClick() {return player.ea.clickableData.cooldown.gte(0.25) && player.ea.money.div(4).root(1.1).floor().div(10).gt(0)},
            onClick() {
                player.ea.resources.metal = player.ea.resources.metal.add(player.ea.money.div(4).root(1.1).floor().div(10))
                player.ea.money = player.ea.money.mul(0.75)
                player.ea.clickableData.cooldown = new Decimal(0)
            },
        },
        13: {
            title: "Buy glass",
            display() {
                return `Use 25% of your current money for <b>${format(player.ea.money.div(4).root(1.1).floor().div(20))} glass</b>`
            },
            canClick() {return player.ea.clickableData.cooldown.gte(0.25) && player.ea.money.div(4).root(1.1).floor().div(20).gt(0)},
            onClick() {
                player.ea.resources.glass = player.ea.resources.glass.add(player.ea.money.div(4).root(1.1).floor().div(20))
                player.ea.money = player.ea.money.mul(0.75)
                player.ea.clickableData.cooldown = new Decimal(0)
            },
        },
        14: {
            title: "Buy soil",
            display() {
                return `Use 25% of your current money for <b>${format(player.ea.money.div(4).root(1.1).floor())} soil</b>`
            },
            canClick() {return player.ea.clickableData.cooldown.gte(0.25) && player.ea.money.div(4).root(1.1).floor().gt(0)},
            onClick() {
                player.ea.resources.soil = player.ea.resources.soil.add(player.ea.money.div(4).root(1.1).floor())
                player.ea.money = player.ea.money.mul(0.75)
                player.ea.clickableData.cooldown = new Decimal(0)
            },
        },

        21: {
            title: "Solar Panel",
            display: "Use 0.25 metal and 0.25 glass to construct 1 solar panel",
            canClick() {
                return player[this.layer].resources.metal.gte(0.25) && player[this.layer].resources.glass.gte(0.25) && player[this.layer].infra.panels.lt(100)
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(0.25)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(0.25)
                player[this.layer].infra.panels = player[this.layer].infra.panels.add(1)
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(0.25)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(0.25)
                player[this.layer].infra.panels = player[this.layer].infra.panels.add(1)
            },
        },
        22: {
            title: "Rocket",
            display: "Use 3 metal and 2 solar panels to construct 1 rocket",
            canClick() {
                return player[this.layer].resources.metal.gte(3) && player[this.layer].infra.panels.gte(2)
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(3)
                player[this.layer].infra.panels = player[this.layer].infra.panels.sub(2)
                player[this.layer].resources.rockets = player[this.layer].resources.rockets.add(1)
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(3)
                player[this.layer].infra.panels = player[this.layer].infra.panels.sub(2)
                player[this.layer].resources.rockets = player[this.layer].resources.rockets.add(1)
            },
        },
        23: {
            title: "Launch Pad",
            display: "Use 2 metal to construct a launch pad",
            canClick() {
                return player[this.layer].resources.metal.gte(2) && !player[this.layer].infra.launchPad
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].infra.launchPad = true
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].infra.launchPad = true
            },
        },

        31: {
            title: "Load Metal",
            display: "Load 25% of your current metal on Earth into the ship.",
            canClick() {
                return player[this.layer].resources.metal.gt(0) && player[this.layer].shipLoad.metal.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.metal.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.metal))

                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(load)

                player[this.layer].shipLoad.metal = player[this.layer].shipLoad.metal.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.metal.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.metal))

                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(load)

                player[this.layer].shipLoad.metal = player[this.layer].shipLoad.metal.add(load)
            },
        },
        32: {
            title: "Load Glass",
            display: "Load 25% of your current glass on Earth into the ship.",
            canClick() {
                return player[this.layer].resources.glass.gt(0) && player[this.layer].shipLoad.glass.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.glass.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.glass))

                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(load)

                player[this.layer].shipLoad.glass = player[this.layer].shipLoad.glass.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.glass.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.glass))

                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(load)

                player[this.layer].shipLoad.glass = player[this.layer].shipLoad.glass.add(load)
            },
        },
        33: {
            title: "Load Soil",
            display: "Load 25% of your current soil on Earth into the ship.",
            canClick() {
                return player[this.layer].resources.soil.gt(0) && player[this.layer].shipLoad.soil.lt(1000) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.soil.div(4)
                load = load.min(new Decimal(1000).sub(player[this.layer].shipLoad.soil))

                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(load)

                player[this.layer].shipLoad.soil = player[this.layer].shipLoad.soil.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.soil.div(4)
                load = load.min(new Decimal(1000).sub(player[this.layer].shipLoad.soil))

                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(load)

                player[this.layer].shipLoad.soil = player[this.layer].shipLoad.soil.add(load)
            },
        },
        34: {
            title: "Load Plants",
            display: "Load 25% of your current plants on Earth into the ship.",
            canClick() {
                return player[this.layer].resources.plants.gt(0) && player[this.layer].shipLoad.plants.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.plants.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.plants))

                player[this.layer].resources.plants = player[this.layer].resources.plants.sub(load)

                player[this.layer].shipLoad.plants = player[this.layer].shipLoad.plants.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.plants.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.plants))

                player[this.layer].resources.plants = player[this.layer].resources.plants.sub(load)

                player[this.layer].shipLoad.plants = player[this.layer].shipLoad.plants.add(load)
            },
        },

        41: {
            title: "Launch to Mercury",
            display() {return `
                Launch your rocket to Mercury.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 'me')
            },
            onHold() {
                transferResources(this.layer, 'me')
            },
        },
        42: {
            title: "Launch to Venus",
            display() {return `
                Launch your rocket to Venus.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 've')
            },
            onHold() {
                transferResources(this.layer, 've')
            },
        },
        43: {
            title: "Launch to Mars",
            display() {return `
                Launch your rocket to Mars.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.ma.coordinates.x, tmp.ma.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 'ma')
            },
            onHold() {
                transferResources(this.layer, 'ma')
            },
        },
    },
})
addLayer("ma", { // Mars layer
    name: "mars", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♂",
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,

        resources: {
            metal: new Decimal(0),
            glass: new Decimal(0),
            soil: new Decimal(0),
            rockets: new Decimal(0),

            plants: new Decimal(0),
        },

        infra: {
            panels: new Decimal(0),
            launchPad: false,
            greenhouses: new Decimal(0)
        },

        shipLoad: {
            metal: new Decimal(0),
            glass: new Decimal(0),
            soil: new Decimal(0),

            plants: new Decimal(0),
        },

        wildlife: {
            herbivores: new Decimal(0),
            carnivores: new Decimal(0),
        },
    }},
    tree: "solar-system",
    color: "#CC3300",
    requires() {return 10}, // Can be a function that takes requirement increases into account
    resource: "Mars plants", // Name of prestige currency
    baseResource: "Research", // Name of resource prestige is based on
    baseAmount() {
        let amt = player.r.points.max(0)
        return amt
    }, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ['ea'],

    coordinates() {
        return {
            x: new Decimal(player.timePlayed/20.1).cos().mul(350),
            y: new Decimal(player.timePlayed/20.1).sin().mul(350),
        }
    },

    nodeStyle: {
        'transform': function() {return 'translate('+format(new Decimal(player.timePlayed/14.8).sin()*125)+'px, 0px)'},
    },
    tooltip() {
        let tooltip = "Mars"
        return tooltip
    },
    tabFormat: {
        "Overview": {
            content: [
                ["display-text", 
                    "<h2>Mars</h2>"
                ],
                "blank",
                ["display-text", function() {
                    return `x: ${format(tmp[this.layer].coordinates.x, 6)} y: ${format(tmp[this.layer].coordinates.y, 6)}`
                }],
                "blank",
                ["display-text", function() {
                    return `
                    Distance to Mercury: ${format(getDistance([tmp.ma.coordinates.x, tmp.ma.coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]))}<br>
                    Distance to Venus: ${format(getDistance([tmp.ma.coordinates.x, tmp.ma.coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]))}<br>
                    Distance to Earth: ${format(getDistance([tmp.ma.coordinates.x, tmp.ma.coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]))}<br>
                    `
                }],
                "blank",
                ["display-text", function() {
                    return `
                    Atmosphere integrity: ${format(tmp[this.layer].atmosphere.mul(100))}%
                    `
                }],
            ],
        },
        "Rockets": {
            content: [
                ["display-text", 
                    "<h2>Mars</h2>"
                ],
                ["display-text", function() {
                    return `
                    Distance to Mercury: ${format(getDistance([tmp.ma.coordinates.x, tmp.ma.coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]))}<br>
                    Distance to Venus: ${format(getDistance([tmp.ma.coordinates.x, tmp.ma.coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]))}<br>
                    Distance to Earth: ${format(getDistance([tmp.ma.coordinates.x, tmp.ma.coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]))}<br>
                    `
                }],
                "blank",
                ["row", [
                    ["bar", "mercury"],
                    ["bar", "venus"],
                    ["bar", "earth"],
                ]],
                ["display-text", 
                    "Distances to each planet"
                ],
                "blank",
                function() {
                    return player[this.layer].infra.launchPad ? ["clickables", [3, 4]] : "blank"
                },
                "blank",
                function() {
                    return player[this.layer].resources.rockets.gt(0) ? ["display-text", `
                        ${format(player[this.layer].shipLoad.metal)}/100 metal on ship<br>
                        ${format(player[this.layer].shipLoad.glass)}/100 glass on ship<br>
                        ${format(player[this.layer].shipLoad.soil)}/1000 soil on ship<br>
                        ${format(player[this.layer].shipLoad.plants)}/100 plants on ship<br>
                        `] : "blank"
                },
            ],
        },
        "Infrastructure": {
            content: [
                ["display-text", function() {
                    return `
                    You have ${format(player.ma.resources.metal)} metal.<br><br>
                    You have ${format(player.ma.resources.glass)} glass.<br><br>
                    You have ${format(player.ma.resources.soil)} soil.<br><br>
                    You have ${format(player.ma.resources.rockets)} rockets.<br><br><br><br>
                    You have ${format(player.ma.infra.panels)} solar panels. (+${format(player.ma.infra.panels.root(1.2).mul(3).mul(smartMilestoneEffect('sr', 3, {ma: 1}).ma))} energy/sec)<br><br>
                    You have ${format(player.ma.infra.greenhouses)} greenhouses.<br><br>
                    `
                }],
                ["clickables", [2]],
            ],
        },
        "Wildlife": {
            content: [
                ["display-text", function() {
                    return `
                    This planet contains ${format(player[this.layer].resources.plants)} plants.<br><br>
                    ${format(player[this.layer].wildlife.herbivores)} herbivores call this planet their home.<br><br>
                    ${format(player[this.layer].wildlife.carnivores)} carnivores call this planet their home.<br><br>
                    `
                }],
            ],
        },
    },

    bars: {
        mercury: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.ma.coordinates.x, tmp.ma.coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]).div(500)
            },
            display: "Me",
            fillStyle: {
                'background-color'() {return tmp.me.color},
            },
        },
        venus: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.ma.coordinates.x, tmp.ma.coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]).div(550)
            },
            display: "Ve",
            fillStyle: {
                'background-color'() {return tmp.ve.color},
            },
        },
        earth: {
            direction: UP,
            width: 50,
            height: 200,
            instant: true,
            progress() {
                return getDistance([tmp.ma.coordinates.x, tmp.ma.coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]).div(600)
            },
            display: "Ma",
            fillStyle: {
                'background-color'() {return tmp.ea.color},
            },
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
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.navTab == "solar-system"},

    atmosphere() {
        return player[this.layer].resources.plants.root(2).div(100).min(1)
    },


    update(diff) {
        let capacity = player[this.layer].infra.greenhouses.mul(100)
        if(player[this.layer].resources.plants.gte(capacity)) {
            player[this.layer].resources.plants = player[this.layer].resources.plants.sub(capacity).mul(new Decimal(0.90).add(tmp[this.layer].atmosphere.div(10)).pow(diff)).add(capacity)
        }
        player[this.layer].resources.plants = player[this.layer].resources.plants.min(10000)

        let herbGoal = player[this.layer].resources.plants.div(100).root(1.2)
        player[this.layer].wildlife.herbivores = player[this.layer].wildlife.herbivores.sub(herbGoal).mul(new Decimal(0.99).pow(diff)).add(herbGoal)

        let carnGoal = player[this.layer].wildlife.herbivores.add(player[this.layer].wildlife.carnivores).div(100).root(1.2)
        player[this.layer].wildlife.carnivores = player[this.layer].wildlife.carnivores.sub(carnGoal).mul(new Decimal(0.99).pow(diff)).add(carnGoal)
    },


    clickables: {
        21: {
            title: "Solar Panel",
            display: "Use 0.25 metal and 0.25 glass to construct 1 solar panel",
            canClick() {
                return player[this.layer].resources.metal.gte(0.25) && player[this.layer].resources.glass.gte(0.25) && player[this.layer].infra.panels.lt(100)
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(0.25)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(0.25)
                player[this.layer].infra.panels = player[this.layer].infra.panels.add(1)
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(0.25)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(0.25)
                player[this.layer].infra.panels = player[this.layer].infra.panels.add(1)
            },
        },
        22: {
            title: "Rocket",
            display: "Use 3 metal and 2 solar panels to construct 1 rocket",
            canClick() {
                return player[this.layer].resources.metal.gte(3) && player[this.layer].infra.panels.gte(2)
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(3)
                player[this.layer].infra.panels = player[this.layer].infra.panels.sub(2)
                player[this.layer].resources.rockets = player[this.layer].resources.rockets.add(1)
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(3)
                player[this.layer].infra.panels = player[this.layer].infra.panels.sub(2)
                player[this.layer].resources.rockets = player[this.layer].resources.rockets.add(1)
            },
        },
        23: {
            title: "Launch Pad",
            display: "Use 2 metal to construct a launch pad",
            canClick() {
                return player[this.layer].resources.metal.gte(2) && !player[this.layer].infra.launchPad
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].infra.launchPad = true
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].infra.launchPad = true
            },
        },
        24: {
            title: "Greenhouse",
            display: "Use 2 metal, 2 glass and 10 soil to construct a greenhouse",
            canClick() {
                return player[this.layer].resources.metal.gte(2) && player[this.layer].resources.glass.gte(2) && player[this.layer].resources.soil.gte(10) && player[this.layer].infra.greenhouses.lt(100)
            },
            onClick() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(2)
                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(10)
                player[this.layer].infra.greenhouses = player[this.layer].infra.greenhouses.add(1)
            },
            onHold() {
                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(2)
                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(2)
                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(10)
                player[this.layer].infra.greenhouses = player[this.layer].infra.greenhouses.add(1)
            },
        },

        31: {
            title: "Load Metal",
            display: "Load 25% of your current metal on Mars into the ship.",
            canClick() {
                return player[this.layer].resources.metal.gt(0) && player[this.layer].shipLoad.metal.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.metal.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.metal))

                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(load)

                player[this.layer].shipLoad.metal = player[this.layer].shipLoad.metal.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.metal.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.metal))

                player[this.layer].resources.metal = player[this.layer].resources.metal.sub(load)

                player[this.layer].shipLoad.metal = player[this.layer].shipLoad.metal.add(load)
            },
        },
        32: {
            title: "Load Glass",
            display: "Load 25% of your current glass on Mars into the ship.",
            canClick() {
                return player[this.layer].resources.glass.gt(0) && player[this.layer].shipLoad.glass.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.glass.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.glass))

                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(load)

                player[this.layer].shipLoad.glass = player[this.layer].shipLoad.glass.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.glass.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.glass))

                player[this.layer].resources.glass = player[this.layer].resources.glass.sub(load)

                player[this.layer].shipLoad.glass = player[this.layer].shipLoad.glass.add(load)
            },
        },
        33: {
            title: "Load Soil",
            display: "Load 25% of your current soil on Mars into the ship.",
            canClick() {
                return player[this.layer].resources.soil.gt(0) && player[this.layer].shipLoad.soil.lt(1000) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.soil.div(4)
                load = load.min(new Decimal(1000).sub(player[this.layer].shipLoad.soil))

                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(load)

                player[this.layer].shipLoad.soil = player[this.layer].shipLoad.soil.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.soil.div(4)
                load = load.min(new Decimal(1000).sub(player[this.layer].shipLoad.soil))

                player[this.layer].resources.soil = player[this.layer].resources.soil.sub(load)

                player[this.layer].shipLoad.soil = player[this.layer].shipLoad.soil.add(load)
            },
        },
        34: {
            title: "Load Plants",
            display: "Load 25% of your current plants on Mars into the ship.",
            canClick() {
                return player[this.layer].resources.plants.gt(0) && player[this.layer].shipLoad.plants.lt(100) && player[this.layer].resources.rockets.gt(0)
            },
            onClick() {
                let load = player[this.layer].resources.plants.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.plants))

                player[this.layer].resources.plants = player[this.layer].resources.plants.sub(load)

                player[this.layer].shipLoad.plants = player[this.layer].shipLoad.plants.add(load)
            },
            onHold() {
                let load = player[this.layer].resources.plants.div(4)
                load = load.min(new Decimal(100).sub(player[this.layer].shipLoad.plants))

                player[this.layer].resources.plants = player[this.layer].resources.plants.sub(load)

                player[this.layer].shipLoad.plants = player[this.layer].shipLoad.plants.add(load)
            },
        },

        41: {
            title: "Launch to Mercury",
            display() {return `
                Launch your rocket to Mercury.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.me.coordinates.x, tmp.me.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 'me')
            },
            onHold() {
                transferResources(this.layer, 'me')
            },
        },
        42: {
            title: "Launch to Venus",
            display() {return `
                Launch your rocket to Venus.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.ve.coordinates.x, tmp.ve.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 've')
            },
            onHold() {
                transferResources(this.layer, 've')
            },
        },
        43: {
            title: "Launch to Earth",
            display() {return `
                Launch your rocket to Earth.<br>
                Cost: ${format(this.cost())} energy.
            `},
            cost() {
                return getDistance([tmp[this.layer].coordinates.x, tmp[this.layer].coordinates.y],[tmp.ea.coordinates.x, tmp.ea.coordinates.y]).pow(1.5)
            },
            canClick() {return player[this.layer].resources.rockets.gt(0) && player.sr.points.gte(this.cost())},
            onClick() {
                transferResources(this.layer, 'ea')
            },
            onHold() {
                transferResources(this.layer, 'ea')
            },
        },
    },
})
addLayer("sr", { // Solar research layer
    name: "Solar Research", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {return options.emojiSymbols ? "☀️" : "SR"},
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,

        visited: false,
    }},
    tree: "solar-system",
    color: "#FFCC00",
    requires() {return 10}, // Can be a function that takes requirement increases into account
    resource: "Energy", // Name of prestige currency
    baseResource: "Research", // Name of resource prestige is based on
    baseAmount() {
        let amt = player.r.points.max(0)
        return amt
    }, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: [],
    nodeStyle: {
        'transform': function() {return 'translate('+format(new Decimal(player.timePlayed*2).sin()*10)+'px, '+format(new Decimal(player.timePlayed*1.1).sin()*5)+'px)'},
    },
    tooltip() {
        let tooltip = "Solar Research"
        return tooltip
    },
    tabFormat: {
        "Overview": {
            content: [
                "main-display",
                ["display-text", function() {
                    return "("+format(tmp.sr.energyProduction)+"/sec)<br><h2>Solar Research</h2><br>"
                }
                ],
                "blank",
                ["display-text", function() {
                    return `
                    Mercury's solar panels contribute to ${format(player.me.infra.panels.root(1.2).mul(3).mul(smartMilestoneEffect('sr', 3, {me: 1}).me))}/sec<br>
                    Venus' solar panels contribute to ${format(player.ve.infra.panels.root(1.2).mul(3))}/sec<br>
                    Earth's solar panels contribute to ${format(player.ea.infra.panels.root(1.2).mul(3))}/sec<br>
                    Mars' solar panels contribute to ${format(player.ma.infra.panels.root(1.2).mul(3).mul(smartMilestoneEffect('sr', 3, {ma: 1}).ma))}/sec<br>
                    `
                }],
                "blank",
                "milestones",
                "blank",
            ],
        },
        "Solar System": {
            content: [
                ["clickables", [1]],
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
    layerShown(){return player.navTab == "solar-system"},


    update(diff){
        if(player.tab == 'sr') player.sr.visited = true

        player.sr.points = player.sr.points.add(tmp.sr.energyProduction.mul(diff))
    },


    energyProduction(){
        if(!player.sr.visited) {
            return new Decimal(0)
        }
        let gain = new Decimal(3)

        gain = gain.add(player.me.infra.panels.root(1.2).mul(3).mul(smartMilestoneEffect('sr', 3, {me: 1}).me))
        gain = gain.add(player.ve.infra.panels.root(1.2).mul(3))
        gain = gain.add(player.ea.infra.panels.root(1.2).mul(3))
        gain = gain.add(player.ma.infra.panels.root(1.2).mul(3).mul(smartMilestoneEffect('sr', 3, {ma: 1}).ma))

        gain = gain.mul(smartMilestoneEffect('sr', 2))

        return gain
    },

    milestones: {
        0: {
            requirementDescription: "Mercury: 90 Plants, 1 Greenhouse",
            effectDescription: "Double the value of your energy",
            done() {
                return player.me.resources.plants.gte(90) && player.me.infra.greenhouses.gte(1)
            }, 
        },
        1: {
            requirementDescription: "Mars: 1 Herbivore",
            effectDescription() {return `Multiply the value of your energy based on plants on Mars<br>Currently: x${format(this.effect())}`},
            done() {
                return player.ma.wildlife.herbivores.gte(1)
            },
            unlocked() {return hasMilestone('sr', 0)},
            effect() {
                let eff = player.ma.resources.plants.div(100).add(1).root(2)

                return eff
            },
        },
        2: {
            requirementDescription: "Mercury: 1/20th of a Carnivore",
            effectDescription() {return `Multiply energy gain based on herbivores on Mercury<br>Currently: x${format(this.effect())}`},
            done() {
                return player.me.wildlife.carnivores.gte(0.05)
            },
            unlocked() {return hasMilestone('sr', 1)},
            effect() {
                let eff = player.me.wildlife.herbivores.add(1).root(1.2)

                return eff
            },
        },
        3: {
            requirementDescription: "Mars: 30% Atmosphere",
            effectDescription() {return `Multiply solar panel effectiveness based on atmosphere, on Mars and Mercury<br>Currently: Mars x${format(this.effect().ma)}, Mercury x${format(this.effect().me)}`},
            done() {
                return tmp.ma.atmosphere.gte(0.3)
            },
            unlocked() {return hasMilestone('sr', 2)},
            effect() {return{
                ma: tmp.ma.atmosphere.mul(10).add(1).pow(2),
                me: tmp.me.atmosphere.mul(10).add(1).pow(2),
            }},
        },
        4: {
            requirementDescription: "Earth: Load a rocket to maximum capacity",
            effectDescription: "Automatically sell energy to the market",
            done() {
                return player.ea.shipLoad.metal.gte(100) && player.ea.shipLoad.glass.gte(100) && player.ea.shipLoad.soil.gte(1000) && player.ea.shipLoad.plants.gte(100)
            },
            unlocked() {return hasMilestone('sr', 3)},
            toggles: [['ea', 'autoSell']],
        },
        5: {
            requirementDescription: "Mercury: 75% Atmosphere",
            effectDescription: "Automatically load plants on ships from venus",
            done() {
                return tmp.me.atmosphere.gte(0.75)
            },
            unlocked() {return hasMilestone('sr', 4)},
        },
        6: {
            requirementDescription: "Mercury and Mars: 100% Atmosphere",
            effectDescription: "Coming soon...",
            done() {
                return tmp.me.atmosphere.gte(1) && tmp.ma.atmosphere.gte(1)
            },
            unlocked() {return hasMilestone('sr', 5)},
        },
    },

    clickables: {
        11: {
            title: "Sun",
            canClick: true,
            onClick() {},
            style: {
                'background-color': '#FFFF00',
                'width': '75px',
                'min-height': '75px',
                'transition-duration': '0.1s',
                'transform': 'translate(75px, 350px)'
            },
            tooltip() {
                return `x: ${format(Math.random() / 900, 6)} y: ${format(Math.random() / 900, 6)}`
            },
        },
        12: {
            title: "Me",
            canClick: true,
            onClick() {player.tab = 'me'},
            style() {
                let style = {
                'background-color': tmp.me.color,
                'width': '25px',
                'min-height': '25px',
                'transition-duration': '0.1s',
                }

                Object.assign(style, 
                    {'transform': `translate(${(new Decimal(player.timePlayed*0.171).cos()*150)}px, ${(new Decimal(player.timePlayed*0.171).sin()*150)+350}px)`}
                )

                return style
            },
            tooltip() {
                return `x: ${format(tmp.me.coordinates.x, 6)} y: ${format(tmp.me.coordinates.y, 6)}`
            },
        },
        13: {
            title: "Ve",
            canClick: true,
            onClick() {player.tab = 've'},
            style() {
                let style = {
                'background-color': tmp.ve.color,
                'width': '25px',
                'min-height': '25px',
                'transition-duration': '0.1s',
                }

                Object.assign(style, 
                    {'transform': `translate(${(new Decimal(player.timePlayed/12.3).cos()*200)-25}px, ${(new Decimal(player.timePlayed/12.3).sin()*200)+350}px)`}
                )

                return style
            },
            tooltip() {
                return `x: ${format(tmp.ve.coordinates.x, 6)} y: ${format(tmp.ve.coordinates.y, 6)}`
            },
        },
        14: {
            title: "Ea",
            canClick: true,
            onClick() {player.tab = 'ea'},
            style() {
                let style = {
                'background-color': tmp.ea.color,
                'width': '25px',
                'min-height': '25px',
                'transition-duration': '0.1s',
                }

                Object.assign(style, 
                    {'transform': `translate(${(new Decimal(player.timePlayed/-15.3).cos()*250)-50}px, ${(new Decimal(player.timePlayed/-15.3).sin()*250)+350}px)`}
                )

                return style
            },
            tooltip() {
                return `x: ${format(tmp.ea.coordinates.x, 6)} y: ${format(tmp.ea.coordinates.y, 6)}`
            },
        },
        15: {
            title: "Ma",
            canClick: true,
            onClick() { player.tab = 'ma'},
            style() {
                let style = {
                'background-color': tmp.ma.color,
                'width': '25px',
                'min-height': '25px',
                'transition-duration': '0.1s',
                }

                Object.assign(style, 
                    {'transform': `translate(${(new Decimal(player.timePlayed/20.1).cos()*350)-75}px, ${(new Decimal(player.timePlayed/20.1).sin()*350)+350}px)`}
                )

                return style
            },
            tooltip() {
                return `x: ${format(tmp.ma.coordinates.x, 6)} y: ${format(tmp.ma.coordinates.y, 6)}`
            },
        },
    },
})