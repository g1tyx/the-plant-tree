var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: [["tree", [
        ['p', 'w', 'm'],
        ['z', 'g'],
        ['re', 'c', 'e'],
    ]]],
    previousTab: "",
    leftTab: true,
})
addLayer("T1", {
    tabFormat: [["tree", [
        ['q'],
    ]]],
    previousTab: "",
    leftTab: true,
})
addLayer("solar-system", {
    tabFormat: [["tree", [
        ['me'],
        ['ve'],
        ['ea'],
        ['ma'],
    ]]],
    previousTab: "",
    leftTab: true,
})