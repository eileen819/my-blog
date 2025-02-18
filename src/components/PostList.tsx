import AuthContext from "context/AuthContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface IPostProps {
  id: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
}

export default function PostList() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<IPostProps[]>([]);
  const getPosts = async () => {
    const queryDocs = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );
    const Data = await getDocs(queryDocs);
    const postArray = Data?.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as IPostProps[];

    setPosts(postArray);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="post__list">
      {posts?.length > 0 ? (
        posts?.map((post) => (
          <div key={post?.id} className="post__box">
            <Link to={`/posts/${post?.id}`}>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">{post?.email}</div>
                <div className="post__date">{post?.createdAt}</div>
              </div>
              <div className="post__title">{post?.title}</div>
              <div className="post__text">{post?.summary}</div>
            </Link>
            {post?.email === user?.email && (
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">
                  <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="post__no-post">게시글이 없습니다.</div>
      )}
    </div>
  );
}
