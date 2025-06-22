import { useState } from "react";

const Boton = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(8).fill(0));
  const [maxVote, setMaxVote] = useState(0);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);

    setSelected(randomIndex);
  };

  const handleVote = () => {
    const votesCopy = [...votes];

    votesCopy[selected] += 1;

    const maxValue = Math.max(...votesCopy);
    const maxIndex = votesCopy.indexOf(maxValue);

    setVotes(votesCopy);
    setMaxVote(maxIndex);
  };
  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div> <h3>has {votes[selected]} votes</h3>
      <Boton onClick={handleClick} text="Random anecdote" />
      <Boton onClick={handleVote} text="Vote" />
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[maxVote]}</div>
      <h3>has {votes[maxVote]} votes</h3>
    </>
  );
};

export default App;
