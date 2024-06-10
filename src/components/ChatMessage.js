function ChatMessage({name,message}) {
  return (
    <div className="flex items-center shadow-sm p-1">
      <img src="https://cdn-icons-png.freepik.com/256/1077/1077063.png?semt=ais_hybrid" alt="" className="h-5"/>
      <span className="font-bold px-4">{name}</span>
      <span>{message}</span>
    </div>
  )
}

export default ChatMessage
