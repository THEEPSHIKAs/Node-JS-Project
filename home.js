import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/quizzes")
            .then(response => setQuizzes(response.data))
            .catch(error => console.error("Error fetching quizzes:", error));
    }, []);

    return (
        <div>
            <h1>Available Quizzes</h1>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
