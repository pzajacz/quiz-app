import React, {useEffect, useRef, useState} from 'react';
import gsap from "gsap";
import Imgix from "react-imgix";
import ReactGA from "react-ga";
import { FacebookShareButton, FacebookIcon } from "react-share";
import styled from "styled-components";

function QuizBody()  {

  const quizTitle = 'Test quiz';

  const questions = [
    {
      questionText: 'MIELŐTT ELINDÍTOTTUK VOLNA A TRABANTOT, MI VOLT AZ ELSŐ FELADAT?',
      image: 'https://ujszo.com/sites/default/files/styles/max_1300x1300/public/2022-02/1_2.jpg?itok=3M_LWoA4',
      answerOptions: [
        { answerText: 'Kivenni a kurblit a csomagtartóból', isCorrect: false },
        { answerText: 'Megnyitni a benzincsapot', isCorrect: true },
        { answerText: 'Erősebben becsapni az ajtót', isCorrect: false }
      ],
    },
    {
      questionText: 'HOL KELLETT SEBESSÉGET VÁLTANI?',
      image: 'https://ujszo.com/sites/default/files/styles/max_1300x1300/public/2022-02/2_3.jpg?itok=xVKME7jn',
      answerOptions: [
        { answerText: 'A kormánynál', isCorrect: true },
        { answerText: 'Két első ülés között', isCorrect: false },
        { answerText: 'Automata váltós volt', isCorrect: false }
      ],
    },
    {
      questionText: 'MELYIK ORSZÁGBAN GYÁRTOTTÁK A TRABANTOT?',
      image: 'https://ujszo.com/sites/default/files/styles/max_1300x1300/public/2022-02/2_3.jpg?itok=xVKME7jn',
      answerOptions: [
        { answerText: 'Jugoszlávia', isCorrect: false },
        { answerText: 'Csehszlovákia', isCorrect: false },
        { answerText: 'NDK', isCorrect: true }
      ],
      description: "Magyarázat: Mert csak... :) Credibly extend optimal core competencies via enterprise-wide experiences. Efficiently iterate customized architectures through high standards in markets. Energistically integrate just in time action"
    },
    {
      questionText: 'MI LÁTHATÓ A KÉPEN?',
      image: 'https://ujszo.com/sites/default/files/styles/max_1300x1300/public/2022-02/177941209_3827568650674436_2577428001753967337_n.jpg?itok=LNUcoCX5',
      answerOptions: [
        { answerText: 'asztali dísz', isCorrect: false },
        { answerText: 'tányér', isCorrect: false },
        { answerText: 'citromfacsaró', isCorrect: true }
      ],
    },
    {
      questionText: 'MILYEN ESZKÖZ LÁTHATÓ A KÉPEN?',
      image: 'https://ujszo.com/sites/default/files/styles/max_1300x1300/public/2022-02/215157607_4034080956689870_5281488691033926395_n.jpg?itok=d-P3WrUp',
      answerOptions: [
        { answerText: 'kenyérszeletelő gép', isCorrect: false },
        { answerText: 'automata bőrvágó gép', isCorrect: false },
        { answerText: 'szalámiszeletelő gép', isCorrect: true }
      ],
    },
    {
      questionText: 'Mi Franciaország fővárosa?',
      answerOptions: [
        { answerText: 'New York', isCorrect: false },
        { answerText: 'London', isCorrect: false },
        { answerText: 'Párizs', isCorrect: true },
        { answerText: 'Dublin', isCorrect: false }
      ],
      description: "Magyarázat: Mert csak... :) Credibly extend optimal core competencies via enterprise-wide experiences. Efficiently iterate customized architectures through high standards in markets. Energistically integrate just in time action"
    },
    {
      questionText: 'Who is CEO of Tesla?',
      answerOptions: [
        { answerText: 'Jeff Bezos', isCorrect: false },
        { answerText: 'Elon Musk', isCorrect: true },
        { answerText: 'Bill Gates', isCorrect: false },
        { answerText: 'Tony Stark', isCorrect: false }
      ],
    },
    {
      questionText: 'Melyik cég készítette az Iphone-t?',
      answerOptions: [
        { answerText: 'Apple', isCorrect: true },
        { answerText: 'Intel', isCorrect: false },
        { answerText: 'Amazon', isCorrect: false },
        { answerText: 'Microsoft', isCorrect: false }
      ],
    },
    {
      questionText: 'Hány Harry Potter könyv készült?',
      answerOptions: [
        { answerText: '1', isCorrect: false },
        { answerText: '4', isCorrect: false },
        { answerText: '6', isCorrect: false },
        { answerText: '7', isCorrect: true }
      ],
    },
  ];

  // Initials
  const [userAnswer, setUserAnswer] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showDescription, setShowDescription] = useState(false)
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [colorized, setColorized] = useState(false);

  // Anim selector variables
  const quizBody = useRef();
  const outer = useRef();
  const gsapQuizBody = gsap.utils.selector(quizBody);
  const gsapOuter = gsap.utils.selector(outer);

  // Reset these things...
  useEffect(()=> {
    setShowDescription(false);
    setColorized(false);
    document.title = showResults ? `${quizTitle} results` : `${quizTitle}-${currentQuestion + 1}`;
    ReactGA.pageview(`/${document.title.replace(/\s+/g, '-').toLowerCase()}`);
  }, [currentQuestion, showResults])

  useEffect(()=> {
    const gsapOuter = gsap.utils.selector(outer);
    gsap.set(gsapOuter('.quizbody'), {rotationY: 180});
    gsap.to(gsapOuter('.quizbody'),{
      rotationY: 0,
      ease: "power1.in",
      duration: .4
    })
  }, [currentQuestion])

  // Handlers
  const handleAnswerClick = (answerOption, description)=> {
    setUserAnswer([...userAnswer, [answerOption.isCorrect, answerOption.answerText]]);
    answerOption.isCorrect ? setScore(score + 1) : setScore(score);
    setColorized(true);
    if (description) {
      setShowDescription(true);
      setTimeout(()=> {
        descAnim();
      }, 400)
    } else {
      nextQuestion();
      timerAnim();
    }
  };

  const nextQuestion = ()=> {
    if (currentQuestion === questions.length -1 ) {
      setTimeout(() => {
        setShowResults(true);
      }, 3000);
    } else if (showDescription) {
      gsap.to(gsapOuter('.quizbody'),{
        rotationY: -180,
        ease: "power1.in",
        duration: .4,
        onComplete: ()=> {
          setCurrentQuestion(currentQuestion + 1)
        }
      })
      /*setCurrentQuestion(currentQuestion + 1);*/
    } else {
      rotateOutAnim();
/*      setTimeout(() => {
        /!*setCurrentQuestion(currentQuestion + 1);*!/
      }, 3000);*/
    }
  };

  // Animations
  const descAnim = ()=> {
    gsap.to(gsapQuizBody('.descriptionWrapper'), {
      bottom: '50%',
      transform: 'translateY(50%)',
      duration: .8,
      ease: "bounce.out",
      y: -900
    });
  }

  const rotateOutAnim = ()=> {
    gsap.to(gsapOuter('.quizbody'),{
      rotationY: -180,
      ease: "power1.in",
      delay: 3,
      duration: .4,
      onComplete: ()=> {
        setCurrentQuestion(currentQuestion + 1)
      }
    })
  };

  const resetAnim = ()=> {
    return (showResults ? null : gsap.set(gsapQuizBody('.currentTimer'), {clearProps: true}));
  };

  const timerAnim = ()=> {
    return (showResults ? null :
      gsap.to(gsapQuizBody('.currentTimer'), {
        width: '100%',
        duration: 3,
        onComplete: resetAnim,
      })
    );
  };

  return (
    <QuizBodyStyled>

      {/* After the last question show the results section */}
      {showResults ? (
        <div className={"results"}>
          Köszönjük, hogy kitöltötted a kvízt! <br/>
          Elért pontszám: {score} / {questions.length} <br/>
          {`A teljesítményed ${(score/questions.length*100).toFixed(2)}% -os!`}
          <br/><br/>
          <FacebookShareButton
            url={"https://ujszo.com/"}
            quote={`${(score/questions.length*100).toFixed(2)}% -ot értem el, próbáld ki magad te is!`}
            hashtag={"#ujszoquiz"}
            description={"ez a szöveg jelenik majd meg a descriptionban"}
            className={"facebook-share-btn"}>
            <FacebookIcon size={32} round /> Oszd meg az eredményed a barátaiddal!
          </FacebookShareButton>
          <br/><br/>
          <ul className={"resultsAnswerList"}>
            <li key={"header"}><span>Kérdés</span><span>Válasz</span><span>Helyes válasz</span></li>
            {questions.map((question, index) => {
              return (
                <li data-answer={userAnswer[index][0]} key={index}>
                  <span>{ question.questionText }</span>
                  <span>{ userAnswer[index][1] }</span>
                  <span>{ question.answerOptions.map((answer)=> {
                    return answer.isCorrect ? answer.answerText : null;
                  })}</span>
                  {question.description ? <span className={"descriptionIcon"}>?<span className={"descriptionText"}> {question.description} </span></span> : null }
                </li>
              )})}
          </ul>
        </div>
      ) : (
        <div className={"outer"} ref={outer}>
          <div className={"quizbody"} ref={quizBody}>
            <div className={"currentQuestion"}>{`${currentQuestion+1} / ${questions.length} - ${questions[currentQuestion].questionText}`}</div>
            <div className={"currentTimer"} />

            { showDescription ? ( <Description description={questions[currentQuestion].description} nextQuestion={nextQuestion} /> ) : null }

            { questions[currentQuestion].image ?
            <Imgix
              className="lazyload currentImage"
              sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
              src={ questions[currentQuestion].image }
              imgixParams={{
                fit: "crop",
                fm: "jpg",
                ar: "16:9"
              }}
              width={400}
            /> : null }

            {/* List of questions */}
            <ul className={`answersList ${colorized ? "colorized" : null}`}>
              { questions[currentQuestion].answerOptions.map((answerOption, index) => {
                return <QuizQuestionButton
                  key={index}
                  index={index}
                  answerOption={answerOption}
                  answerText={answerOption.answerText}
                  isCorrect={answerOption.isCorrect}
                  showDescription={showDescription}
                  question={questions[currentQuestion]}
                  handleAnswerClick={handleAnswerClick} />

                /*return <li key={index} data-answer={answerOption.isCorrect} className={"answerBtn"} onClick={()=> {
                  if (!showDescription) {
                    handleAnswerClick(answerOption, questions[currentQuestion].description, index)}
                }}>{answerOption.answerText}</li>;*/
              }) }
            </ul>
          </div>
        </div>
      )}

    </QuizBodyStyled>
  );
}

// And the components...
const Description = (props)=> {
  const {description, nextQuestion} = props
  return (
    <div className={"descriptionWrapper"}>
      <div className={"description"}>{ description }</div>
      <div className={"nextQuestion"} onClick={nextQuestion}>Következő kérdés</div>
    </div>
  )
};

const QuizQuestionButton = (props)=> {
  const { answerOption, answerText, isCorrect, index, showDescription, question, handleAnswerClick } = props;
  return (
    <li key={index} data-answer={isCorrect} className="answerBtn" onClick={()=> {
      return (showDescription ? null : handleAnswerClick(answerOption, question.description, index))
    }}>{answerText}</li>
  )
};

// Some styling stuff
const QuizBodyStyled = styled.div`
  .outer {
    perspective: 1300px;
  }

  .quizbody {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    width: 400px;
    position: relative;
    background-color: #f0f0f0;
    padding: 30px;
    border: 1px solid #d6d6d6;
    overflow: hidden;
  }

  .currentQuestion {
    font-weight: 700;
    font-size: 18px;
    color: #00535e;
    text-transform: uppercase;
    line-height: 21px;
    margin-bottom: 10px;
  }

  .currentTimer {
    width: 0;
    height: 10px;
    display: block;
    margin-bottom: 10px;
    background-color: #a5aec0;
  }

  .currentImage {
    margin-bottom: 30px;
  }

  .descriptionWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #dbe2e9;
    padding: 40px 30px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 120%;
    box-shadow: 0 0 9px 6px #00000045;
  }

  .descriptionWrapper .nextQuestion {
    transition: box-shadow .3s;
    border: 1px solid #cbd4de;
    background-color: #ffffff;
    display: inline-block;
    min-width: 50%;
    text-align: center;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 30px;
    box-shadow: 0 2px 3px 0 #9fa6ae;
  }

  .descriptionWrapper .nextQuestion:hover {
    box-shadow: 0 4px 8px 0 #9fa6ae;
  }

  .answersList {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 400px;
  }

  .answerBtn {
    cursor: pointer;
    padding: 10px 0;
    text-align: center;
    margin: 0 5% 5px;
    font-weight: 700;
    font-size: 13px;
    color: #555555;
    border: 1px solid #cbd4de;
    background-color: #dbe2e9;
    list-style: none;
  }

  .answerBtn:hover {
    background-color: #cfdfea;
  }

  .resultsAnswerList li[data-answer="false"],
  .colorized li[data-answer="false"] {
    background-color: #e9dbe2;
  }

  .resultsAnswerList li[data-answer="true"],
  .colorized li[data-answer="true"] {
    background-color: #dbe9df;
  }

  .resultsAnswerList {
    width: 700px;
    border: 1px solid #cbd4de;
    padding: 10px 20px;
    border-radius: 3px;
  }

  .resultsAnswerList li {
    position: relative;
    padding: 10px 0;
    margin: 5px 0;
    font-weight: 700;
    font-size: 13px;
    color: #555555;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    min-height: 20px;
  }

  .resultsAnswerList li > span {
    padding: 0 10px;
  }

  .resultsAnswerList li span:nth-child(2) {
    align-self: flex-end;
    margin-left: auto;
  }

  .resultsAnswerList li span:nth-child(2),
  .resultsAnswerList li span:nth-child(3) {
    text-align: center;
    width: 20%;
  }

  .resultsAnswerList li .descriptionIcon {
    position: absolute;
    right: 5px;
    cursor: pointer;
    border: 1px solid #cbd4de;
    background-color: #dbe2e9;
    width: 14px;
    height: 14px;
    border-radius: 12px;
    padding: 2px;
    text-align: center;
  }

  .resultsAnswerList li .descriptionText {
    position: absolute;
    right: 0;
    display: none;
    left: 30px;
    top: 0;
    width: 130px;
    background-color: #dbe2e9;
    padding: 10px;
  }

  .resultsAnswerList li .descriptionIcon:hover .descriptionText {
    display: block;
  }
`;

export default QuizBody;
