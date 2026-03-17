// ambil data dari localStorage
let matches = JSON.parse(localStorage.getItem("matches")) || [];

// isi dropdown
function init() {
  let home = document.getElementById("home");
  let away = document.getElementById("away");

  teams.forEach(t => {
    home.innerHTML += `<option>${t.name}</option>`;
    away.innerHTML += `<option>${t.name}</option>`;
  });

  render();
}

// tambah match
function addMatch() {
  let h = document.getElementById("home").value;
  let a = document.getElementById("away").value;
  let sh = parseInt(document.getElementById("scoreH").value);
  let sa = parseInt(document.getElementById("scoreA").value);

  if(h === a) return alert("Tim tidak boleh sama!");

  matches.push({home:h, away:a, h:sh, a:sa});
  localStorage.setItem("matches", JSON.stringify(matches));

  render();
}

// hitung klasemen
function calculate() {
  let table = {};

  teams.forEach(t=>{
    table[t.name] = {name:t.name, logo:t.logo, main:0, win:0, draw:0, lose:0, poin:0};
  });

  matches.forEach(m=>{
    let h = table[m.home];
    let a = table[m.away];

    h.main++; a.main++;

    if(m.h > m.a){
      h.win++; h.poin+=3; a.lose++;
    } else if(m.h < m.a){
      a.win++; a.poin+=3; h.lose++;
    } else {
      h.draw++; a.draw++;
      h.poin++; a.poin++;
    }
  });

  return Object.values(table).sort((a,b)=>b.poin-a.poin);
}

// render
function render() {
  let data = calculate();

  let html = "";

  data.forEach((t,i)=>{
    let zone = "";
    if(i<4) zone="green";
    if(i>=data.length-3) zone="red";

    html += `
      <div class="row ${zone}">
        <div>${i+1}</div>
        <img src="${t.logo}">
        <div>${t.name}</div>
        <div>${t.poin}</div>
      </div>
    `;
  });

  document.getElementById("table").innerHTML = html;
}

init();
