import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
const Trivia = ({ data,
  questionNumber,
  setQuestionNumber,
  setStop}) => {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

//   useEffect(() => {
//     setQuestion(data[questionNumber - 1]);
//   }, [data, questionNumber]);
    useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);
  const delay = (duration, callback) => {
    setStop(() => {
      callback();
    }, duration);
  };
  const handleClick = (a) => {
    setSelectedAnswer(a);
     setClassName("answer active");
    delay(7000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
   
    delay(10000, () => {
        if(a.correct){
            correctAnswer();
            delay(5000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
            // setQuestionNumber((prev) => prev + 1);
            // setSelectedAnswer(null);
        }
       else{
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
       }
    });
   
  };
  return (
    <div className="trivia">
        <div className="question">{question?.question}</div>
        <div className="answers">
        {question?.answers.map((a) => (
          <div className={selectedAnswer === a ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a.text}
          </div>
        ))}
        </div>
    </div>
  )
}

export default Trivia