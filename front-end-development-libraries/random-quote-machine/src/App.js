import { useState } from 'react';
import './App.css';
import QuoteBox from './QuoteBox';
import RandInt from './RandomExtensions';
import allQuotes from './quotes.json'

function randomColor() {
  document.documentElement.style.setProperty("--bs-body-bg", `hsl(${RandInt(0, 360)}deg, 50%, 70%)`);
}

function newQuote() {
  randomColor();
  return allQuotes[RandInt(0, allQuotes.length)]
}

export default function App() {
  const [quote, setQuote] = useState(newQuote());
  return (<QuoteBox quote={quote.quote} author={quote.author} newQuote={() => setQuote(newQuote())}/>);
}
