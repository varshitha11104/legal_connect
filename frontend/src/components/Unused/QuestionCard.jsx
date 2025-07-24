import React, { useState } from 'react';

const QuestionCard = ({ question, onAnswer }) => {
  const [newAnswer, setNewAnswer] = useState('');

  const handleSubmit = () => {
    if (newAnswer.trim()) {
      onAnswer(question.id, newAnswer);
      setNewAnswer('');
    }
  };

  return (
    <div className="border p-4 mb-4 rounded shadow bg-white">
      <h3 className="font-semibold">{question.question}</h3>
      <ul className="mt-2 mb-2">
        {question.answers.map((ans, index) => (
          <li key={index} className="ml-4 list-disc">{ans}</li>
        ))}
      </ul>
      <textarea
        className="w-full border p-2 rounded"
        rows="2"
        placeholder="Write your answer..."
        value={newAnswer}
        onChange={e => setNewAnswer(e.target.value)}
      />
      <button
        className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
        onClick={handleSubmit}
      >
        Post Answer
      </button>
    </div>
  );
};

export default QuestionCard;
