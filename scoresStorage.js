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
    add();
    // let scores = [];
    // const scoresText = localStorage.getItem('leaderScores');
    // if (scoresText) {
    //   scores = JSON.parse(scoresText);
    // }
  
    // const tableBodyEl = document.getElementById('leaderScores-table-rows');
  
    // if (scores.length) {
    //   for (const [i, score] of scores.entries()) {
    //     const positionTdEl = document.createElement('td');
    //     const scoreTdEl = document.createElement('td');
  
    //     positionTdEl.textContent = i + 1;
    //     scoreTdEl.textContent = score.score;
  
    //     const rowEl = document.createElement('tr');
    //     rowEl.appendChild(positionTdEl);
    //     rowEl.appendChild(scoreTdEl);
  
    //     tableBodyEl.appendChild(rowEl);
    //   }
    // } else {
    //   tableBodyEl.innerHTML = '<tr><td colSpan=5>No One Has Played</td></tr>';
    // }
}

//temporary function to add scores to database
function add(){
    let scores=[];
    newScore={score: 15};
    const tableBodyFirst = document.getElementById('leaderScores-table-rows');
    const tableBodyEl=document.createElement('table');
    let i=0;
    for (const score in scores) {
        const positionTdEl = document.createElement('th');
        const scoreTdEl = document.createElement('td');
  
        positionTdEl.textContent = i + 1;
        scoreTdEl.textContent = scores[score];
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(scoreTdEl);
  
        tableBodyEl.appendChild(rowEl);
        i++;
      }
      //tableBodyFirst.replaceWith(tableBodyEl)
}

//loadAllScores();
add();
loadScores();

function addFromGame(newScore){
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
    scores = this.updateScores(newScore, scores);

    localStorage.setItem('scores', JSON.stringify(scores));
  }

  function updateScores(score, scores) {
    const newScore = { score: newScore };

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    return scores;
  }