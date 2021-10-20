import React, { useReducer, useState, useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
 
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

const OldForm=()=> {
const [id, setId] = React.useState('')
  const [password, setPassword] = React.useState('')
  return (
   <>
    <form>
      <h1>로그인1</h1>
      <input name="id" type="text" placeholder="아이디 입력"
        value={id} onChange={event => setId(event.target.value)} />
      <input name="password" type="password" placeholder="비밀번호 입력"
        value={password} onChange={event => setPassword(event.target.value)} />
    </form>
     {`ID : ${id}     PWD : ${password}`}
      </>
  )
}

const NewForm=()=> {
	 const reducer = (state, newState)=>({ ...state, ...newState})
	 const [inputValue, setInputValue] = useReducer(reducer, {id:'', password:''})
	 
	  return (
	   <>
    <form>
      <h1>로그인2</h1>
      <input name="id" type="text" placeholder="아이디 입력"
        value={inputValue.id}
       onChange={event => setInputValue({ [event.target.name]: event.target.value })} />
      <input name="password" type="password" placeholder="비밀번호 입력"
        value={inputValue.password}
        onChange={event => setInputValue({ [event.target.name]: event.target.value })} />
    </form>
    {`ID : ${inputValue.id}     PWD : ${inputValue.password}`} 
    </>
  ) 
}

const Counter=()=> {
   const initialState = {count:0};
   const reducer=(state, action)=> {
     switch(action.type) {
        case 'increment':
            return {count:state.count + 1};
        case 'decrement':
            return {count:state.count - 1};
        default :
            throw new Error();
     }
   } 
    const [state, dispatch] = useReducer(reducer, initialState);
     
      return( 
          <div> 
             Count: {state.count}
              <button onClick={()=> dispatch({type:'decrement'})}>-</button>
              <button onClick={()=> dispatch({type:'increment'})}> +</button>
          </div> 
          
       );
}

const CallBack=()=>{
	
	const [count, setCount] = useState(0);
	const handleClick = useCallback(()=>console.log('clicked : ' + count ),[count]);
	
	return (
	  <div>
	    <button onClick={()=>setCount(count+1)}>add count</button>
	    <button onClick={handleClick}>try!!!</button>
	     <span>{count}</span>
	  </div> 
	 ); 
}

const UseMemo=()=> {
	const [count, setCount] = useState(0);
	const doubleCount = count * 2;
	//const doubleCount = useMemo(()=> count * 2, [count]);
	console.log(doubleCount);
	
	return (
	  <div> 
	      <button onClick={()=> setCount(count+1)}>add count </button>
	       <button>try!!!</button>
	       <span>{count}</span>
	   </div>
	);
}

const ExReducer=()=> {
  return (
     <>
       <OldForm /> 
       <NewForm />
       <Counter />
       <CallBack />
       <UseMemo />
     </>
  );
};

export default ExReducer;