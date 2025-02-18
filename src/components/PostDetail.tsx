import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IPostProps } from "./PostList";
import Loader from "./Loader";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<IPostProps | null>(null);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      const postData = {
        id: docSnap.id,
        ...docSnap.data(),
      } as IPostProps;
      setPost(postData);
    }
  };
  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [id]);
  return (
    <div className="post__detail">
      {post ? (
        <div className="post__box">
          <div className="post__title">{post?.title}</div>
          <div className="post__profile-box">
            <div className="post__profile" />
            <div className="post__author-name">{post?.email}</div>
            <div className="post__date">{post?.createdAt}</div>
          </div>
          <div className="post__utils-box">
            <div
              className="post__delete"
              onClick={() => console.log("delete!")}
            >
              삭제
            </div>
            <div className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>수정</Link>
            </div>
          </div>
          <div className="post__text post__text--pre-wrap">{post?.content}</div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
