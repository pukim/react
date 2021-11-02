import React, { useState, useImperativeHandle, forwardRef } from "react";

// props와 ref를 인자로 받음
function ChildCompo(props, ref) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  // 1번인자 : ref
  // 2번인자 : 현재 컴포의 값을 부모컴포가 접근할수 있는 CB함수를 전달
  useImperativeHandle(ref, () => ({
    addAge: (value) => setAge(age + value),
    getNameLength: () => name.length,
  }));

  return (
    <div>
      <p>{`name is ${name}`}></p>
      <p>{`age is ${age}`}></p>
      // ...
    </div>
  );
}
// 여기서 forwardRef를 씌워줌으로 ref 매개변수를 사용할수 있게됨
// 부모컴포넌트에서 useRef()를 사용하고 자식의 useImprerativeHandle에 전달한 객체를 사용해 값 수정 가능
export default forwardRef(ChildCompo);
