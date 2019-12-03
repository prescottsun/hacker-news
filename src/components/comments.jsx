import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadData } from "../utils/loadData";
import Moment from "react-moment";

const Comments = props => {
  //   const [comment, setComment] =
  console.log("comment props: ", props.match.params.postId);

  const [commentIds, setCommentIds] = useState([]);
  const [comments, setComments] = useState([]);

  const getCommentIds = async () => {
    const posts = await loadData(
      `https://hacker-news.firebaseio.com/v0/item/${props.match.params.postId}.json`
    );
    const kids = posts.kids;
    // console.log(kids);
    setCommentIds(kids);
  };

  const getComments = async () => {
    const commentInfo = await Promise.all(
      commentIds.map(commentId => {
        return loadData(
          `https://hacker-news.firebaseio.com/v0/item/${commentId}/.json`
        );
      })
    );
    console.log("CommentInfo ", commentInfo);
    setComments(commentInfo);
  };

  useEffect(() => {
    getCommentIds();
  }, []);

  useEffect(() => {
    getComments();
  }, [commentIds]);
  return (
    <ul>
      {comments.map(comment => {
        return (
          <li>
            {comment.text} <br />
            By {comment.by}{" "}
            <Moment unix fromNow>
              {comment.time}
            </Moment>{" "}
          </li>
        );
      })}
    </ul>
  );
};

export default Comments;
