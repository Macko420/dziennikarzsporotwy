import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "../../../functions/dateFormat";

function Card(props) {
  const data = props.data;
  return (
    <Link
      to={`/articles/${data.article_id}`}
      className="no-underline text-black"
    >
      <div className="row my-3">
        <div className="col-md-3 mr-3">
          <img className="img-fluid rounded" src={data.img} alt={data.title} />
        </div>
        <div className="col-md-8 relative">
          <div className="font-bold text-[150%]">{data.title}</div>
          <div className="">{data.snippet || "snippet"}</div>
          <div className="absolute-md bottom-1 right-1 mt-2">
            {dateFormat(data.updatedAt)}
          </div>
        </div>
      </div>
      <hr></hr>
    </Link>
  );
}

export default Card;
