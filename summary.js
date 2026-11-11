const units = [
  { unitNumber: 183324, unitType: "Truck", year: "2001", make: "Honda", model: "Acty", customer: "Company A" , status: "Active" },
  { unitNumber: 234235, unitType: "Tractor", year: "2010", make: "John Deere", model: "5055E", customer: "Company B" , status: "Out of Service" },
  { unitNumber: 243412, unitType: "Tractor", year: "2022", make: "New Holland", model: "T7", customer: "Company C" , status: "Active" },
  { unitNumber: 644343, unitType: "Trailer", year: "2019", make: "Casita", model: "Independence", customer: "Company D" , status: "Out of Service" },
  { unitNumber: 773432, unitType: "Truck", year: "2006", make: "Mack", model: "Anthem", customer: "Company E" , status: "Sold" },
];

// Prints the entire array as a formatted table
console.table(units);
