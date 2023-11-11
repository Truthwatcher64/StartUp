window.addEventListener('load', () => {
    if(loadUsername){
        window.addEventListener('load', loadScores());
    }
});
window.addEventListener('load', add());
window.addEventListener('load', loadLeaderScores());

function loadScores() {
    loadUsername();
    let scores=[];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
    console.log(scores);
    console.log(scores.length);
    const tableBodyEl=document.getElementById('userScores-table-rows');

    if (scores.length) {
        for (const [i, score] of scores.entries()) {
          const positionTdEl = document.createElement('th');
          const scoreTdEl = document.createElement('td');
    
          positionTdEl.textContent = i + 1;
          scoreTdEl.textContent = score.score;
    
          const rowEl = document.createElement('tr');
          rowEl.appendChild(positionTdEl);
          rowEl.appendChild(scoreTdEl);
    
          tableBodyEl.appendChild(rowEl);
        }
      } 
      else {
        tableBodyEl.innerHTML = '<tr><td colSpan=4>Play Some Games</td></tr>';
      }
  }

function loadUsername(){
    let name=localStorage.getItem('userName');
    console.log(name);
    if(name){
        document.getElementById("userScores-table").innerHTML=name;
        return true;
    }
    else{
        document.getElementById('userScores-table').innerText="Not signed in";
        return false;
    }

}


//temporary function to add scores to database
function add(){
    let scores=[];
    newScore={'score' : 62};
    scores.push(newScore);
    newScore={'score' : 40};
    scores.push(newScore);
    newScore={'score' : 32};
    scores.push(newScore);
    newScore={'score' : 28};
    scores.push(newScore);
    newScore={'score' : 15};
    scores.push(newScore);

    localStorage.setItem('leaderScores', JSON.stringify(scores));


}
function loadLeaderScores(){
    const scoresText = localStorage.getItem('leaderScores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    const tableBodyEl=document.getElementById('leaderScores-table-rows');

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
        tableBodyEl.innerHTML = '<tr><td colSpan=4>No One Has Played Yet</td></tr><tr><td colSpan=4>Be The First To Get A HighScore</td></tr>';
      }

}

