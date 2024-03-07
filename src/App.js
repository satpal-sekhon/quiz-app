import { useState } from 'react';
import './App.css';
import StartQuiz from './components/StartQuiz';
import Quiz from './components/Quiz';

function App() {
  const [isQuizStarted, SetIsQuizStarted] = useState(false);
 
  return (
    <div className="App">
      {!isQuizStarted ?
        <StartQuiz onClick={()=>SetIsQuizStarted(true)} /> :
        <Quiz />
      }
    </div>
  );
}

export default App;
