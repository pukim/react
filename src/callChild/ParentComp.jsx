function ParentCompo () {
  const childCompoRef = useRef();
  const onClick = () => {
    if (childCompoRef.current) {
      console.log('current name length:', childCompoRef.current.getNameLength();)
      childCompoRef.current.addAge(5);
    }
  }
  return (
    <div>
      <Profile ref={profileRef} />
      <button onClick={onClick}>add age 5</button>
    </div>
  )
}