const home = document.getElementById("home");
const away = document.getElementById("away");

// isi dropdown
teams.forEach(t=>{
  home.innerHTML += `<option value="${t.id}">${t.name}</option>`;
  away.innerHTML += `<option value="${t.id}">${t.name}</option>`;
});

// helper
function getTeam(id){
  return teams.find(t => t.id == id);
}

// tambah match
function addMatch(){
  let id = document.getElementById("matchId").value;
  let date = document.getElementById("date").value;
  let h = parseInt(home.value);
  let a = parseInt(away.value);
  let sh = parseInt(document.getElementById("scoreH").value);
  let sa = parseInt(document.getElementById("scoreA").value);

  if(!id || !date) return alert("Isi Match ID & Tanggal!");
  if(h === a) return alert("Tim tidak boleh sama!");

  matches.push({ id, date, home:h, away:a, sh, sa });

  localStorage.setItem("matches", JSON.stringify(matches));

  render();
}

// render klasemen
function renderKlasemen(){
  let table = {};

  teams.forEach(t=>{
    table[t.id] = { ...t, main:0, m:0, s:0, k:0, poin:0 };
  });

  matches.forEach(m=>{
    let h = table[m.home];
    let a = table[m.away];

    h.main++; a.main++;

    if(m.sh > m.sa){
      h.m++; h.poin+=3;
      a.k++;
    } else if(m.sh < m.sa){
      a.m++; a.poin+=3;
      h.k++;
    } else {
      h.s++; a.s++;
      h.poin++; a.poin++;
    }
  });

  let arr = Object.values(table).sort((a,b)=>b.poin - a.poin);

  let html = "<div class='card'><h3>Klasemen</h3>";

  arr.forEach((t,i)=>{
    html += `
    <div class="row">
      <div>${i+1}</div>
      <div class="team">
        <img src="${t.logo}">
        ${t.name}
      </div>
      <div>${t.poin}</div>
    </div>
    `;
  });

  html += "</div>";

  document.getElementById("klasemenPage").innerHTML = html;
}

// render match
function renderMatch(){
  let html = "<div class='card'><h3>Match</h3>";

  matches.forEach(m=>{
    let h = getTeam(m.home);
    let a = getTeam(m.away);

    html += `
    <div class="row">
      <div>${m.id}</div>
      <div>${h.name} ${m.sh} - ${m.sa} ${a.name}</div>
      <div>${m.date}</div>
    </div>
    `;
  });

  html += "</div>";

  document.getElementById("matchList").innerHTML = html;
}

// tab
function showPage(page){
  document.getElementById("klasemenPage").style.display="none";
  document.getElementById("matchPage").style.display="none";

  document.getElementById("tabKlasemen").classList.remove("active");
  document.getElementById("tabMatch").classList.remove("active");

  if(page==="klasemen"){
    document.getElementById("klasemenPage").style.display="block";
    document.getElementById("tabKlasemen").classList.add("active");
  } else {
    document.getElementById("matchPage").style.display="block";
    document.getElementById("tabMatch").classList.add("active");
  }
}

// render semua
function render(){
  renderKlasemen();
  renderMatch();
}

render();
