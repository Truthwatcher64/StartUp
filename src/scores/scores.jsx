import React from 'react';

import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);
  const [topScores, setTopScores] =React.useState([]);

   // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    fetch('/api/leaderScores')
      .then((response) => response.json())
      .then((topScores) => {
        setTopScores(topScores);
        localStorage.setItem('leaderScores', JSON.stringify(scores));
      })
      .catch(() => {
        const scoresText = localStorage.getItem('leaderScores');
        if (scoresText) {
          setTopScores(JSON.parse(scoresText));
        }
      });
  }, []);


   // Demonstrates rendering an array with React
   let topScoreRows = [];

   if (topScores.length) {
     for (const [i, score] of topScores.entries()) {
       topScoreRows.push(
         <tr key={i}>
           <td>{i+1}</td>
           <td>{score.score}</td>
         </tr>
       );
     }
   } else {
     topScoreRows.push(
       <tr key='0'>
         <td colSpan='4'>Be the first to score</td>
       </tr>
     );
   }


  return (
<div id='center-page' style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>Best Scores of All Time</p>
        <main className='container-fluid bg-secondary text-center'>
        <table className='table table-warning table-striped-columns' style={{ maxWidth: '500px' }}>
            <thead className='table-dark'>
            <tr>
                <th>#</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody id='leaderScores'>{topScoreRows}</tbody>
        </table>
        </main>
    </div>
  );
}
