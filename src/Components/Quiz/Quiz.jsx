import React, { useRef } from "react"
import './Quiz.css'
import { data } from '../../assets/data'
// import { resolveEnvPrefix } from "vite"

const Quiz=()=>{

    const[index ,setIndex]=React.useState(0)
    const[question,setQuestion]=React.useState(data[0])
    const[lock,setLock]=React.useState(false)
    const[score,setScore]=React.useState(0)
    const [result,setResult]=React.useState(false)

    let Option1=useRef(null);
    let Option2=useRef(null);
    let Option3=useRef(null);
    let Option4=useRef(null);
     
    let option_arr=[Option1,Option2,Option3,Option4]

    const checkAns=(e,ans)=>{
      if(lock===false){  
         if(question.ans===ans){
        e.target.classList.add("correct");
        setLock(true);
        setScore(prevScore=>prevScore+1);
      }
      else{
        e.target.classList.add("wrong");
        setLock(true);
        option_arr[question.ans-1].current.classList.add("correct");
      }}
    }
    const next=()=>{
      if(lock===true){
        if(index===data.length-1){
           setResult(true);
           return ;
        }
        const newIndex=index+1
        setIndex(newIndex);
        setQuestion(data[newIndex]);
        setLock(false);
        option_arr.map((option)=>{
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
          return null;

        })
      }
      
     }
      
     const reset= () => {
      setIndex(0);
      setQuestion(data[0]);
      setScore(0);
      setLock(false);
      setResult(false);

     }

    return(
        <div className="container">
          <h1>Quiz App</h1>
          <hr ></hr>
          {result?<></>:<><h2>{index+1} . {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e)=>{checkAns(e , 1)}}>{question.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkAns(e , 2 )}}>{question.option2}</li>
            <li ref={Option3} onClick={(e)=>{checkAns(e , 3)}}>{question.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkAns(e , 4)}}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index+1} out of {data.length}</div></>}
          {result?<><h2>You scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button></>:<></>}
          
        </div>
    )
}
export default Quiz
