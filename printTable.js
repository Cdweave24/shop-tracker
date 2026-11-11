// Print an array of objects as a table using console.log().
function printTable(rows, { title = "", color = Boolean(process.stdout.isTTY) } = {}) {
  // ANSI escape codes add terminal colors without installing a package.
  const paint = (text, code) => color ? `\x1b[${code}m${text}\x1b[0m` : text;
  if (rows.length === 0) {
    console.log("(empty table)");
    return;
  }

  // Collect every property name, including properties missing from some rows.
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const headings = columns.map((column) =>
    column.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toUpperCase())
  );
  const values = rows.map((row) =>
    columns.map((column) => {
      const value = String(row[column] ?? "");
      return column === "status" ? `● ${value}` : value;
    })
  );

  // Each column must fit both its heading and its longest value.
  const widths = columns.map((column, index) =>
    Math.max(headings[index].length, ...values.map((row) => row[index].length))
  );

  const border = (left, middle, right) => paint(
    left + widths.map((width) => "─".repeat(width + 2)).join(middle) + right,
    "90"
  );
  const separator = paint("│", "90");
  const formatRow = (row, header = false) =>
    separator + " " + row.map((value, index) => {
      // Pad before coloring so invisible escape codes do not affect alignment.
      const cell = value.padEnd(widths[index]);
      if (header) return paint(cell, "1;36");
      if (columns[index] === "status") {
        const statusColors = { Active: "32", "Out of Service": "33", Sold: "90" };
        return paint(cell, statusColors[value.slice(2)] ?? "37");
      }
      return cell;
    }).join(` ${separator} `) + " " + separator;

  if (title) console.log(`\n${paint(title, "1;36")} ${paint(`(${rows.length} units)`, "90")}`);
  console.log(border("╭", "┬", "╮"));
  console.log(formatRow(headings, true));
  console.log(border("├", "┼", "┤"));
  values.forEach((row) => console.log(formatRow(row)));
  console.log(border("╰", "┴", "╯"));
}

module.exports = printTable;
