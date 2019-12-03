import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadData } from "../utils/loadData";
import Moment from "react-moment";

function TopPosts() {
  const [postIds, setPostIds] = useState([]);
  const [posts, setPosts] = useState([]);

  const getPostIds = async () => {
    const topPosts = await loadData(
      `https://hacker-news.firebaseio.com/v0/topstories.json`
    );
    setPostIds(topPosts.slice(0, 25));
  };

  const getPosts = async () => {
    const postInfo = await Promise.all(
      postIds.map(postId => {
        return loadData(
          `https://hacker-news.firebaseio.com/v0/item/${postId}.json`
        );
      })
    );
    console.log("PostInfo: ", postInfo);
    setPosts(postInfo);
  };

  useEffect(() => {
    getPostIds();
  }, []);

  useEffect(() => {
    getPosts();
  }, [postIds]);

  return (
    <ol>
      {posts.map(post => {
        return (
          <li key={post.id}>
            {post.title} (<a href={post.url}>{post.url}</a>)
            <br />
            {post.score} points by {post.by}{" "}
            <Moment unix fromNow>
              {post.time}
            </Moment>{" "}
            | <Link to={`/comments/${post.id}`}>comments</Link>
          </li>
        );
      })}
    </ol>
  );
}

export default TopPosts;
