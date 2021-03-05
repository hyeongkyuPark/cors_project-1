import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import styled from 'styled-components';
import { modifyNoticeRequestAsync, reomveNoticeRequestAsync } from '../../../api/noticeApi';
import { getNoticeDetailRequest } from '../adminSlice';

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 4.5vw;
  @media screen and (min-width: 455px) {
    font-size: 20.484px;
  }
`;

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 1em 0;
  & h1 {
    font-size: 6vw;
    font-weight: 400;
  }
  @media screen and (min-width: 455px) {
    width: 455px;
    & h1 {
    font-size: 27.312px;
  }
  }
`;

const BackLink = styled(Link)`
  position: absolute;
  left: 0.5em;
`;

const BackLogo = styled.img`
  width: 1.8em;
  height: 1.8em;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  & ul {
    width: 100%;
  }
  & li {
    width: 100%;
    padding: 1em;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  & li h2 {
    font-size: 3.5vw;
    margin-bottom: 0.5em;
  }
  & li p {
    font-size: 3vw;
  }
  & li:not(:last-child) {
    margin-bottom: 1em;
  }
  @media screen and (min-width: 455px) {
    width: 455px;
    & li h2 {
      font-size: 15.932px;
    }
    & li p {
      font-size: 13.656px;
    }
  }
`;

const TitleArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5em 1em;
  border-bottom: 1px solid #ccc;
  & h2, & input {
    font-size: 3.5vw;
    margin-bottom: 0.5em;
  }
  & p {
    font-size: 3vw;
  }
  @media screen and (min-width: 455px) {
    width: 455px;
    & h2, & input {
      font-size: 15.932px;
    }
    & p {
      font-size: 13.656px;
    }
  }
`;

const TextArea = styled.div`
  padding: 1em;
  height: 100%;
  & pre, & textarea {
      width: 100%;
      height: 100%;
      padding: 1em;
      border: 1px solid #ccc;
      overflow: auto;
      word-break: keep-all;
      white-space: pre-wrap;
      font-size: 3.5vw;
  }
  & textarea {
    resize: none;
  }
  @media screen and (min-width: 455px) {
    & pre, & textarea {
      font-size: 15.932px;
    }
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & button {
    cursor: pointer;
    padding: 0.5em 1em;
    font-size: 3.5vw;
    color: #fff;
    border: 1px solid #a3c3ff;
    border-radius: 5px;
    &.delete {
      background: #395fa655;
    }
    &.modify {
      background: #fff;
      color: #3960a6;
      margin-right: 1em;
    }
  }
  @media screen and (min-width: 455px) {
    width: 455px;
    & button {
      font-size: 13.656px;
    }
  }
`;

const DeleteModal = styled.div`
  position: absolute;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5em 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  & p {
    font-size: 4.5vw;
    padding: 0.5em 0;
  }
  & button {
    cursor: pointer;
    padding: 0.5em 1em;
    font-size: 3.5vw;
    color: #fff;
    border: 1px solid #a3c3ff;
    border-radius: 5px;
    &.delete {
      background: #395fa655;
    }
    &.modify {
      background: #fff;
      color: #3960a6;
      margin-right: 1em;
    }
  }
  @media screen and (min-width: 455px) {
    & p {
      font-size: 20.484px;
    }
    & button {
      font-size: 13.656px;
    }
  }
`;

const ModalButtonBox = styled.div``;

function AdminNoticeDetail():JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: idParam } = useParams<{ id: string }>();
  const [isModify, setIsModify] = useState(false);
  const [isModalVisable, setIsModalVisable] = useState(false);
  const { noticeDetail } = useSelector((state) => state.adminSlice);
  const { title, content, noticeId } = noticeDetail;
  const [inputs, setInputs] = useState({
    title,
    content,
  });

  const onchangeInputs = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickModifyMode = () => {
    if (isModify) {
      setInputs({
        title,
        content,
      });
    }

    setIsModify(!isModify);
  };

  const onClickModify = async () => {
    console.log(`${idParam}번 수정하기`);
    const formData = new FormData();
    formData.append('noticeId', noticeId);
    formData.append('title', inputs.title);
    formData.append('content', inputs.content);
    try {
      const result = await modifyNoticeRequestAsync(formData);
      if (result.status === 200) {
        dispatch(getNoticeDetailRequest({
          ...noticeDetail,
          title: inputs.title,
          content: inputs.content,
        }));
        ToastsStore.success('공지사항 수정이 완료되었습니다.');
        setIsModify(!isModify);
      }
    } catch (error) {
      setIsModalVisable(false);
      ToastsStore.error('서버에러 또는 권한 불충분');
      setIsModify(!isModify);
    }
  };

  const onClickDelete = async () => {
    console.log(`${idParam}번 삭제하기`);
    try {
      const result = await reomveNoticeRequestAsync(noticeId);
      if (result.status === 200) {
        history.push('/admin/notice');
        ToastsStore.success('공지사항 삭제가 완료되었습니다.');
      }
    } catch (error) {
      setIsModalVisable(false);
      ToastsStore.error('서버에러 또는 권한 불충분');
    }
  };

  return (
    <Layout>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} lightBackground />
      <Header>
        <BackLink to="/admin/notice">
          <BackLogo src="/images/icons/back.png" />
        </BackLink>
        <h1>공지사항 관리</h1>
      </Header>
      <Content>
        {
          isModify
            ? (
              <>
                <TitleArea>
                  <input onChange={onchangeInputs} type="text" name="title" value={inputs.title} />
                  <p>2021.03.02</p>
                </TitleArea>
                <TextArea>
                  <textarea onChange={onchangeInputs} name="content" value={inputs.content} />
                </TextArea>
                <ButtonBox>
                  <button onClick={onClickModifyMode} className="modify" type="button">취소</button>
                  <button onClick={onClickModify} className="delete" type="button">수정하기</button>
                </ButtonBox>
              </>
            )
            : (
              <>
                <TitleArea>
                  <h2>{title}.</h2>
                  <p>2021.03.02</p>
                </TitleArea>
                <TextArea>
                  <pre>
                    {content}
                  </pre>
                </TextArea>
                <ButtonBox>
                  <button onClick={onClickModifyMode} className="modify" type="button">수정</button>
                  <button onClick={() => setIsModalVisable(true)} className="delete" type="button">삭제</button>
                </ButtonBox>
              </>
            )
        }
      </Content>
      {
        isModalVisable
          ? (
            <DeleteModal>
              <p>정말 삭제하시겠습니까?</p>
              <ModalButtonBox>
                <button onClick={() => setIsModalVisable(false)} className="modify" type="button">취소</button>
                <button onClick={onClickDelete} className="delete" type="button">삭제</button>
              </ModalButtonBox>
            </DeleteModal>
          )
          : null
      }
    </Layout>
  );
}

export default AdminNoticeDetail;
