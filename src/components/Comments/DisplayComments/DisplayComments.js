import { useEffect } from "react";
// import useAuthRequest from "../../../hooks/useAuthRequest";
import { useParams } from "react-router";
import axios from "../../../api/axios";

function DisplayComments(props) {
  // const AuthRequest = useAuthRequest();
  const params = useParams();
  //comment and setComment from props
  const { comments, setComments } = props;
  // console.log(comments);
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    // Pobieranie poszczególnych składowych daty
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${hours}:${minutes}, ${day}.${month}.${year}`;
  };

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.post(`/comment/comm/${params.id}`);
      setComments(response.data);
    };

    getComments();
  }, []);

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold mb-4">Komentarze</h2>
      {comments.map((comment) => (
        <div
          className="bg-white shadow-md rounded-lg p-4 mb-4"
          key={comment.id}
        >
          <p className="text-gray-800">{comment.text}</p>
          <p className="text-gray-400 text-3 decoration-4 mt-2">
            {comment.userId} <br></br>
            {formatDate(comment.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DisplayComments;
