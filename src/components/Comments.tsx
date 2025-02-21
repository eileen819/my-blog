import { useContext, useState } from "react";
import { IComments, IPostProps } from "./PostList";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

interface ICommentsProps {
  post: IPostProps;
  getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: ICommentsProps) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const onDeleteComment = async (comment: IComments) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
    if (post?.id && confirm) {
      try {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          comments: arrayRemove(comment),
        });
        await getPost(post.id);
        toast.success("댓글을 삭제했습니다.");
      } catch (error) {
        console.log(error);
        toast.error("댓글 삭제에 실패했습니다.");
      }
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "comment") {
      setComment(value);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!post?.id || !user?.uid) {
      toast.error("댓글을 작성할 수 없습니다.");
      return;
    }

    try {
      const postRef = doc(db, "posts", post.id);

      const commentObj = {
        content: comment,
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toLocaleString(),
      };

      await updateDoc(postRef, {
        comments: arrayUnion(commentObj),
        updatedAt: new Date().toLocaleString(),
      });

      await getPost(post.id);

      toast.success("댓글을 생성했습니다.");
      setComment("");
    } catch (error: any) {
      console.log(error);
      toast.error(error.code);
    }
  };

  return (
    <div className="comments">
      <form onSubmit={onSubmit} className="comments__form">
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            value={comment}
            onChange={onChange}
            name="comment"
            id="comment"
            required
          />
        </div>
        <div className="form__block form__block--reverse">
          <input type="submit" value="입력" className="form__btn--submit" />
        </div>
      </form>
      <div className="comments__list">
        {post?.comments?.map((comment) => (
          <div key={comment?.createdAt} className="comment__box">
            <div className="comment__profile-box">
              <div className="comment__email">{comment?.email}</div>
              <div className="comment__date">{comment?.createdAt}</div>
              {comment.uid === user?.uid && (
                <div
                  className="comment__delete"
                  onClick={() => onDeleteComment(comment)}
                >
                  삭제
                </div>
              )}
            </div>
            <div className="comment__text">{comment?.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
