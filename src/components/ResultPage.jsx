import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const { exam_id, user_id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`http://localhost:8080/results/${exam_id}/${user_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch result data');
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [exam_id, user_id]);

  if (loading) {
    return <p>Loading result...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const calculateScore = () => {
    if (!result.selected_answers || result.selected_answers.length === 0) {
      return 0;
    }

    const correctAnswers = result.selected_answers.filter(
      (answer) => answer.selected_option === answer.correct_option
    ).length;

    return ((correctAnswers / result.total_questions) * 100).toFixed(2);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <button className="btn btn-primary mb-3" onClick={() => navigate('/')}>
        Go to Home
      </button>

      <h2>Quiz Results</h2>
      <p>Total Questions: {result.total_questions}</p>
      <p>Correct Answers: {result.selected_answers.filter(
        (answer) => answer.selected_option === answer.correct_option
      ).length}</p>
      <p>Incorrect Answers: {result.selected_answers.filter(
        (answer) => answer.selected_option !== answer.correct_option
      ).length}</p>
      <p>Score: {calculateScore()}%</p>

      <div className="questions-list">
        {result.selected_answers.map((answer, index) => {
          const isCorrect = answer.selected_option === answer.correct_option;
          return (
            <div key={index} className={`question-item ${isCorrect ? 'correct' : 'incorrect'}`}>
              <p>
                <strong>Question:</strong> {answer.question_text} <br />
                <strong>Subtopic:</strong> {answer.subtopic_name}
              </p>
              <p style={{ color: isCorrect ? 'green' : 'red' }}>
                <strong>Selected Answer:</strong> {answer.selected_option}
              </p>
              <p>
                <strong>Correct Answer:</strong> {answer.correct_option}
              </p>
            </div>
          );
        })}
        <h3>Questions not present here were not attempted by the user.</h3>
      </div>
    </div>
  );
};

export default ResultPage;
