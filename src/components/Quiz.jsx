import { useState } from 'react';
import quizQuestions from '../quiz.json';

function Quiz() {
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState([]);

    const setAnswer = (questionIndex, answer) => {
        answer.questionIndex = questionIndex;

        let removeLastGivenAnswer = correctAnswers.filter(function (obj) {
            return obj.questionIndex !== questionIndex;
        });

        setCorrectAnswers(removeLastGivenAnswer);

        if(answer.is_correct){
            setCorrectAnswers(prevState => [...prevState, answer])
        }
    }

    return (<>
        {!isQuizSubmitted ? <>
            <h4>Quiz Questions</h4>
            {
                quizQuestions.map((quiz, questionIndex) =>
                    <div className={questionIndex !== activeQuestionIndex ? `d-none` : `active-question`} key={`question-${questionIndex}`}>
                        <p>{quiz.question}</p>

                        {quiz.options.map((quizOption, optionIndex) =>
                            <div key={`${optionIndex}-of-${questionIndex}`}>
                                <input
                                    type="radio"
                                    name={`option-of-${questionIndex}`}
                                    id={`option-${optionIndex}-of-${questionIndex}`}
                                    onClick={() => setAnswer(questionIndex, quizOption)}
                                />

                                <label htmlFor={`option-${optionIndex}-of-${questionIndex}`}>{quizOption.option}</label><br />
                            </div>
                        )}

                    </div>
                )
            }

            {activeQuestionIndex > 0 &&
                <button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Prev Question</button>
            }

            {activeQuestionIndex < quizQuestions.length - 1 &&
                <button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</button>
            }

            {activeQuestionIndex == quizQuestions.length - 1 &&
                <button onClick={() => setIsQuizSubmitted(true)}>Submit Quiz</button>
            }

        </> : <>
            <h4>Quiz Result</h4>
            {correctAnswers.length} Out of {quizQuestions.length}
        </>}
    </>);
}
export default Quiz;