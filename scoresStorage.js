window.addEventListener('load', loadUsername());
window.addEventListener('load', loadScores());
window.addEventListener('load', loadAllScores());

function loadScores() {
    loadUsername();
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
  
    const tableBodyEl = document.getElementById('userScores-table-rows');
  
    if (scores.length) {
      for (const [i, score] of scores.entries()) {
        const positionTdEl = document.createElement('td');
        const scoreTdEl = document.createElement('td');
  
        positionTdEl.textContent = i + 1;
        scoreTdEl.textContent = score.score;
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(scoreTdEl);
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=5>Play a few games to see your scores</td></tr>';
    }
  }

function loadUsername(){
    let name=localStorage.getItem('userName');
    console.log(name);
    if(name){
        document.getElementById("userScores-table").innerHTML=name;
    }
    else{
        document.getElementById('userScores-table').innerText="Not signed in";
    }
}

function loadAllScores(){

}

loadAllScores();
loadScores();