import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QuizPage = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/quizzes/${id}`)
            .then(response => {
                setQuiz(response.data);
                setTimer(response.data.timeLimit);
            })
            .catch(error => console.error("Error fetching quiz:", error));
    }, [id]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleAnswer = (answer) => {
        if (answer === quiz.questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        if (currentQuestion + 1 < quiz.questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            alert(`Quiz complete! Your score: ${score}/${quiz.questions.length}`);
        }
    };

    if (!quiz) return <div>Loading...</div>;

    return (
        <div>
            <h1>{quiz.title}</h1>
            <p>Time remaining: {timer} seconds</p>
            <h2>{quiz.questions[currentQuestion].questionText}</h2>
            {quiz.questions[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>
                    {option}
                </button>
            ))}
        </div>
    );
};

export default QuizPage;
