import { useState } from 'react'

const AnecdoteOfTheDay = ({anecdote, votes, nextAnecdote, voteAnecdote}) => {  
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
      <button onClick={voteAnecdote}>Vote</button>
      <button onClick={nextAnecdote}>Next anecdote</button>
    </div>
  );
}

const AnecdoteWithMostVotes = ({anecdote, votes}) => {
  if (votes === 0) {
    return (    
      <div>  
        <h1>Most Voted Anecdote</h1>
        <p>No votes yet!</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Most Voted Anecdote</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
}

const App = () => {
  const getRandomInt = (min, max) => { // returns int in range [min, max[
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  };

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(getRandomInt(0, anecdotes.length)); // random index
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)); // array filled with 0s
  const [maxIndex, setMaxIndex] = useState(0);

  const nextAnecdote = () => setSelected(getRandomInt(0, anecdotes.length));  
  const voteAnecdote = () => {
    const newVotes = [...votes]; // a copy of votes
    newVotes[selected]++;
    setVotes(newVotes);
    if (newVotes[selected] > votes[maxIndex]) {
      setMaxIndex(selected);
    }
  };

  return (
    <div>
      <AnecdoteOfTheDay anecdote={anecdotes[selected]} votes={votes[selected]} nextAnecdote={nextAnecdote} voteAnecdote={voteAnecdote}/>
      <AnecdoteWithMostVotes anecdote={anecdotes[maxIndex]} votes={votes[maxIndex]}/>
    </div>
  )
}

export default App