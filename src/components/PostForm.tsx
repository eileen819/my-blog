import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostForm() {
  const navigation = useNavigate();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        summary: summary,
        content: content,
        createdAt: new Date().toLocaleString(),
        email: user?.email,
      });
      navigation("/");
      toast.success("게시글을 생성했습니다.");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
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
        <input type="submit" value="제출" className="form__btn--submit" />
      </div>
    </form>
  );
}
