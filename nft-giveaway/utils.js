function load(filename) {
  const fs = require("fs");
  var array = fs.readFileSync(filename).toString().trim().split("\n");
  return array;
}

let address_list = load("./address_list.txt");
console.log(address_list)
