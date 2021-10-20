// DragDrop.tsx
// https://velog.io/@yiyb0603/React%EC%97%90%EC%84%9C-%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-%ED%95%98%EA%B8%B0
import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  useRef,
} from "react";

// import "./DragDrop.css";

// 해당 인터페이스는 컴포넌트 밖에 작성해주세요!
// interface IFileTypes {
//   id: number; // 파일들의 고유값 id
//   object: File;
// }

const DragDrop = () => {
  // 드래그 중일때와 아닐때의 스타일을 구분하기 위한 state 변수
  const [isDragging, setIsDragging] = useState(false);

  // 각 선택했던 파일들의 고유값 id
  const fileId = useRef(0);
  const [files, setFiles] = useState([]);

  // 드래그 이벤트를 감지하는 ref 참조변수 (label 태그에 들어갈 예정)
  // const dragRef = (useRef < HTMLLabelElement) | (null > null);
  const dragRef = useRef(null);

  const onChangeFiles = useCallback(
    (e) => {
      console.log("onchagnefiles!!!!!!!!!!!!!!");
      console.log(e);

      let selectFiles = [];
      let tempFiles = files;
      // temp 변수를 이용하여 선택했던 파일들을 담습니다.

      // 드래그 했을 때와 안했을 때 가리키는 파일 배열을 다르게 해줍니다.
      if (e.type === "drop") {
        // 드래그 앤 드롭 했을때
        selectFiles = e.dataTransfer.files;
      } else {
        // "파일 첨부" 버튼을 눌러서 이미지를 선택했을때
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        // 스프레드 연산자를 이용하여 기존에 있던 파일들을 복사하고, 선택했던 파일들을 append 해줍니다.
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++, // fileId의 값을 1씩 늘려주면서 각 파일의 고유값으로 사용합니다.
            object: file, // object 객체안에 선택했던 파일들의 정보가 담겨있습니다.
          },
        ];
      }

      console.log(tempFiles);
      setFiles(tempFiles);
    },
    [files]
  ); // 위에서 선언했던 files state 배열을 deps에 넣어줍니다.

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div className="DragDrop">
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }} // label을 이용하여 구현하기에 없애줌
        multiple={true} // 파일 다중선택 허용
        onChange={(e) => {
          onChangeFiles(e);
        }}
      />

      <label
        className={isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"}
        // 드래그 중일때와 아닐때의 클래스 이름을 다르게 주어 스타일 차이

        htmlFor="fileUpload"
        ref={dragRef}
      >
        <div
          style={{
            display: "inline-block",
            cursor: "pointer",
            textAlign: "center",
            width: "400px",
            height: "100px",
            border: "1px",
            backgroundColor: "grey",
          }}
        >
          파일 첨부
        </div>
      </label>
      <div
        style={{
          width: "300px",
          padding: "8px",
          border: "1px solid black",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {files.length > 0 &&
          files.map((file) => {
            const {
              id,
              object: { name },
            } = file;

            return (
              <div key={id}>
                <div>{name}</div>
                <div className="DragDrop-Files-Filter">X</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DragDrop;
