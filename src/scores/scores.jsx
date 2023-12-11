import React from 'react';

import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);
  const [topScores, setTopScores] =React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    fetch('/api/scores')
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
        localStorage.setItem('scores', JSON.stringify(scores));
      })
      .catch(() => {
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });

      fetch('/api/scores')
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
        localStorage.setItem('leaderScores', JSON.stringify(scores));
      })
      .catch(() => {
        const scoresText = localStorage.getItem('leaderScores');
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });
  }, []);

  // Demonstrates rendering an array with React
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{score.score}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }

  const leaderScoreRows = [];
  if (scores.length) {
    for (const [i, score] of leaderScores.entries()) {
      leaderScoreRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{score.score}</td>
        </tr>
      );
    }
  } else {
    leaderScoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }

  return (
    <main className='container-fluid bg-secondary text-center'>
      <table className='table table-warning table-striped-columns'>
        <thead className='table-dark'>
          <tr>
            <th>#</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody id='scores'>{scoreRows}</tbody>
      </table>
      <table className='table table-warning table-striped-columns'>
        <thead className='table-dark'>
          <tr>
            <th>#</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody id='leaderScores'>{leaderScoreRows}</tbody>
      </table>
    </main>
  );
}
