function Comment({ data }) {
  const { name, text, replies } = data;
  return (
    <div className="flex bg-gray-100 rounded shadow-sm w-3/4 p-2 mb-3">
      <img
        src="https://cdn-icons-png.freepik.com/256/1077/1077063.png?semt=ais_hybrid"
        alt="user"
        className="h-12"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Comment;
