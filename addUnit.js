const readline = require("node:readline/promises");
const fs = require("node:fs/promises");
const path = require("node:path");
const printTable = require("./printTable");

async function addUnit() {
  const dataPath = path.join(__dirname, "units.json");
  const units = JSON.parse(await fs.readFile(dataPath, "utf8"));
  const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });

  // Keep asking until the user supplies an acceptable value.
  async function ask(label, validate = () => true) {
    while (true) {
      const value = (await terminal.question(`${label}: `)).trim();
      if (value && validate(value)) return value;
      console.log("Please enter a valid value.");
    }
  }

  try {
    console.log("\nAdd a unit (Ctrl+C to cancel)\n");
    const unitNumber = Number(await ask("Unit number (unique positive integer)", (value) =>
      /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) > 0 &&
      !units.some((unit) => unit.unitNumber === Number(value))
    ));
    const unitType = await ask("Unit type (e.g. Truck, Tractor, Trailer)");
    const year = await ask("Year (four digits)", (value) => /^[1-9]\d{3}$/.test(value));
    const make = await ask("Make");
    const model = await ask("Model");
    const customer = await ask("Customer");
    const statuses = { "1": "Active", "2": "Out of Service", "3": "Sold" };
    const choice = await ask("Status: 1 = Active, 2 = Out of Service, 3 = Sold", (value) =>
      Object.hasOwn(statuses, value)
    );
    const unit = { unitNumber, unitType, year, make, model, customer, status: statuses[choice] };

    printTable([unit], { title: "New unit" });
    const confirmation = await ask("Save this unit? (y/n)", (value) => /^(y|n)$/i.test(value));
    if (confirmation.toLowerCase() !== "y") {
      console.log("Cancelled. No unit saved.");
      return;
    }

    units.push(unit);
    await fs.writeFile(dataPath, JSON.stringify(units, null, 2) + "\n");
    console.log("Unit saved. Run node summary.js to view all units.");
  } finally {
    terminal.close();
  }
}

addUnit().catch((error) => {
  console.error(`Could not add unit: ${error.message}`);
  process.exitCode = 1;
});
