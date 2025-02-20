import AuthContext from "context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PostNav from "./PostNav";

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Native",
];

export type TabType = "all" | "my";
export interface IPostProps {
  id: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
  category?: CategoryType;
}

interface IPostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: IPostListProps) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<IPostProps[]>([]);
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const onDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글을 삭제했습니다.");
      setPosts((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      // 탭에 따라서 보여지는 postList 다르게 하기
      let postsQuery;
      if (activeTab === "my" && user) {
        // 나의 글만 보이게 하기
        postsQuery = query(
          collection(db, "posts"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc")
        );
      } else if (activeTab === "all") {
        // 모든 글 보이게 하기
        postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc")
        );
      } else {
        // 카테고리의 글 보이게 하기
        postsQuery = query(
          collection(db, "posts"),
          where("category", "==", activeTab),
          orderBy("createdAt", "desc")
        );
      }
      const Data = await getDocs(postsQuery);
      const postArray = Data?.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as IPostProps[];

      setPosts(postArray);
    };
    getPosts();
  }, [activeTab, user]);

  return (
    <>
      {hasNavigation && (
        <PostNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
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
                <div className="post__summary">{post?.summary}</div>
              </Link>
              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    onClick={() => onDelete(post.id)}
                  >
                    삭제
                  </div>
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
    </>
  );
}
