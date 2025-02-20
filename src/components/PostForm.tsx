import AuthContext from "context/AuthContext";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CATEGORIES, CategoryType, IPostProps } from "./PostList";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState<IPostProps | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<CategoryType | string>("");

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary") {
      setSummary(value);
    }
    if (name === "content") {
      setContent(value);
    }
    if (name === "category") {
      setCategory(value as CategoryType);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (post && post?.id) {
        const editPostRef = doc(db, "posts", post.id);
        await updateDoc(editPostRef, {
          title,
          summary,
          content,
          updatedAt: new Date().toLocaleString(),
          category: category,
        });
        navigate(`/posts/${post.id}`);
        toast.success("게시글을 수정했습니다.");
      } else {
        await addDoc(collection(db, "posts"), {
          title: title,
          summary: summary,
          content: content,
          createdAt: new Date().toLocaleString(),
          email: user?.email,
          uid: user?.uid,
          category: category,
        });
        navigate("/");
        toast.success("게시글을 생성했습니다.");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

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

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
      setCategory(post?.category as CategoryType);
    }
  }, [post]);

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="category">카테고리</label>
        <select
          value={category}
          onChange={onChange}
          name="category"
          id="category"
        >
          <option value="">카테고리를 선택해주세요</option>
          {CATEGORIES?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          value={title}
          onChange={onChange}
          type="text"
          name="title"
          id="title"
          className="form__input"
          required
        />
      </div>

      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          value={summary}
          onChange={onChange}
          type="text"
          name="summary"
          id="summary"
          className="form__input"
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          value={content}
          onChange={onChange}
          name="content"
          id="content"
          required
        />
      </div>
      <div className="form__block">
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className="form__btn--submit"
        />
      </div>
    </form>
  );
}
