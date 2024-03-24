import React from "react"

interface QuizDataProps {
  quizData: any[]
}

const QuizData: React.FC<QuizDataProps> = ({ quizData }) => {
  return (
    <div>
      {quizData.map((quiz, index) => (
        <div key={index}>
          <p>{quiz.content}</p>
          <p>{quiz.explaination}</p>
          <ul>
            {quiz.answers.map((answer: any, i: number) => (
              <li key={i}>
                {answer.content} - {answer.isCorrect ? "Correct" : "Incorrect"}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default QuizData
