import Comment from "./Comment";

const commentsData = [
  {
    name: "Jagpreet Dhanova",
    text: "Nice Video",
    replies: [
      {
        name: "Jagpreet Dhanova",
        text: "Excellent Video",
        replies: [],
      },
      {
        name: "Jagpreet Dhanova",
        text: "Nice work",
        replies: [{
          name: "Jagpreet Dhanova",
          text: "Nice work",
          replies: [],
        },{
          name: "Jagpreet Dhanova",
          text: "Nice work",
          replies: [],
        },],
      },
    ],
  },
  {
    name:"Jagpreet Dhanova",
    text:"Knowledgeable video",
    replies:[]
  },
  {
    name:"Jagpreet Dhanova",
    text:"good work",
    replies:[]
  },
  {
    name:"Jagpreet Dhanova",
    text:"very entertaining",
    replies:[]
  },
];

function CommentsList({ comments }) {
  return (
    <div className="">
      {comments.map((comment, index) => (
        <div key={index} className="mt-2">
          <Comment data={comment} />
          {comment.replies && comment.replies.length > 0 && (
            <div className="pl-4 border-l-black border ml-5">
              <CommentsList comments={comment.replies} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


function CommentContainer() {
  return (
    <div className="m-5 py-2 px-6 ">
      <h1 className="text-2xl font-bold mb-4">Comments:</h1>
      <CommentsList comments={commentsData}/> 
    </div>
  );
}

export default CommentContainer;
