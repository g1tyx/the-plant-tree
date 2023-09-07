// ************ Themes ************
var themes = ["default", "aqua", "plant"]

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
        unlocked: true,
	},
	aqua: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
		color: "#bfdfff",
		points: "#dfefff",
		locked: "#c4a7b3",
		background: "#001f3f",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
        unlocked: true,
	},
    plant: {
        1: "#cfffaf",
        2: "#97af7f",
        3: "#5f6f4f",
        color: "#cfffaf",
        points: "#dfffcf",
        locked: "#a7b3c4",
        background: "#0f2f00",
        background_tooltip: "rgba(15, 31, 0, 0.75)",
        unlocked() {return hasMilestone('a', 0)},
    },
}
function changeTheme() {

	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
}
function getThemeName() {
	return options.theme? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
	}
    colors_theme = colors[options.theme || "default"];
    if(!colors_theme["unlocked"]) {
        switchTheme();
    }
	changeTheme();
	resizeCanvas();
}
