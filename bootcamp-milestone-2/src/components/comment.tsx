import React from "react";
import { IComment } from "../database/blogschema";
import style from "./comment.module.css";

type CommentProps = {
  comment: IComment;
};

function parseComentTime(time: Date) {
  return new Date(time).toDateString();
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className={style.comment_container}>
      <h4 className={style.comment_name}>{comment.user}</h4>
      <p className={style.comment_time}>{parseComentTime(comment.time)}</p>
      <p className={style.comment_comment}>{comment.comment}</p>
    </div>
  );
}