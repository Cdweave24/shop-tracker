const printTable = require("./printTable");

const units = require("./units.json");

// Prints the entire array as a formatted table
const sortedUnits = [...units].sort((a, b) => a.unitNumber - b.unitNumber);
printTable(sortedUnits, { title: "Shop Tracker — Units" });
