import React, { useState } from 'react';
import '../../css/Questionnaire.css';
import FullPageWrapper from './FullPagewrapper';

const Questionnaire = () => {
  const [qna, setQna] = useState([
    { question: 'What is intellectual property?', answer: 'It refers to creations of the mind like inventions, designs, and artistic works.' },
    { question: 'What is the process of filing a divorce?', answer: '' }, // Unanswered
    { question: 'What rights do tenants have?', answer: 'Tenants have the right to a safe environment, privacy, and due notice for eviction.' }
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [answerInputs, setAnswerInputs] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim() !== '' || newAnswer.trim() !== '') {
      setQna([...qna, { question: newQuestion.trim(), answer: newAnswer.trim() }]);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  const handleAnswerChange = (index, value) => {
    setAnswerInputs({ ...answerInputs, [index]: value });
  };

  const handleAnswerSubmit = (index) => {
    if (answerInputs[index]?.trim()) {
      const updatedQna = [...qna];
      updatedQna[index].answer = answerInputs[index].trim();
      setQna(updatedQna);
      setAnswerInputs({ ...answerInputs, [index]: '' });
    }
  };

  return (
    <FullPageWrapper>
    <div className="page-container">
    <div className="questionnaire-page">
      <h1>Public Q&A Forum</h1>
      <form onSubmit={handleSubmit} className="qna-form">
        <input
          type="text"
          placeholder="Ask a Question (optional)..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Answer (optional)..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="qna-container">
        {qna.map((item, index) => (
          <div key={index} className="qna-card" draggable>
            <div className="qna-question">{item.question || '— No question —'}</div>
            {item.answer ? (
              <div className="qna-answer">{item.answer}</div>
            ) : (
              <div className="qna-answer-input">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answerInputs[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                <button onClick={() => handleAnswerSubmit(index)}>Submit Answer</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
    </FullPageWrapper>
  );
};

export default Questionnaire;
