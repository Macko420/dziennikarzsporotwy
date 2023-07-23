import { useState, useEffect } from "react";
import useAuthRequest from "../../../hooks/useAuthRequest";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router";

function CommentsForm(props) {
  const { auth } = useAuth();
  const params = useParams();
  const AuthRequest = useAuthRequest();
  const [comment, setComment] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { comments, setComments } = props;

  useEffect(() => {
    setErrMsg("");
  }, [comment]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!comment) {
      setErrMsg("No data");
      return;
    }
    try {
      const user = auth?.user;
      const id = params.id;
      const response = await AuthRequest.post(
        "/comment",
        JSON.stringify(
          { comment, user, id },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
      );
      setComment("");
      setComments([...comments, response.data.rescomm]);
    } catch (err) {
      if (!err?.response) {
        console.log(err);
        setErrMsg("No server response");
      } else if (err.response?.status === 404) {
        setErrMsg("No data");
      } else if (err.response?.status === 403) {
        setErrMsg("To add a comment you must be logged in");
      }
    }
  };

  return (
    <>
      <p aria-live="assertive">{errMsg}</p>
      <form onSubmit={handleSubmit} className="p-4 rounded-lg">
        <label htmlFor="comment" className="font-medium mb-1 block">
          Dodaj komentarz:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          className="border-gray-300 border p-2 rounded-md w-full"
          rows="4"
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 mt-2 rounded-lg hover:bg-blue-600"
        >
          Wyślij
        </button>
      </form>
    </>
  );
}

export default CommentsForm;
