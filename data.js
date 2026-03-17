const teams = [
  { id:1, name:"Persija", logo:"assets/logo/persija.png" },
  { id:2, name:"Persib", logo:"assets/logo/persib.png" },
  { id:3, name:"Persebaya", logo:"assets/logo/persebaya.png" },
  { id:4, name:"Arema", logo:"assets/logo/arema.png" }
];

// load data match dari localStorage
let matches = JSON.parse(localStorage.getItem("matches")) || [];
