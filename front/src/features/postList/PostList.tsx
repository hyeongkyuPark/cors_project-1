import React, { useState } from 'react';

import styled from 'styled-components';
import postList from './mockdata';
import Header from './Header';

const PostListWrapper = styled.div`
  display: flex;
  max-width: 100vw;
  flex-wrap: wrap;
  padding-top: 150px;
`;
const PostListContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  flex-basis: 50%;
  padding:10px;
  & img {
    width: 100%;
    height: 200px;
  }
  & h3 {
    margin-top: 10px;
  }
`;
const PostList = () => {
  const [post, setPost] = useState(postList);
  return (
    <PostListWrapper>
      <Header />
      {
        post.data.map((p) => (
          <PostListContent>
            <img src={p.Images.sumnail} alt="" />
            <h3>{p.title}</h3>
            <h3>{p.rprice}원</h3>
          </PostListContent>
        ))
      }
    </PostListWrapper>
  );
};

export default PostList;
