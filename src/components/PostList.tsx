import { Link } from "react-router-dom";

export default function PostList() {
  return (
    <div className="post__list">
      {[...Array(10)].map((e, index) => (
        <div key={index} className="post__box">
          <Link to={`/posts/${index}`}>
            <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__author-name">박종성</div>
              <div className="post__date">2025.02.06 목요일</div>
            </div>
            <div className="post__title">게시글</div>
            <div className="post__text">여기는 게시글을 작성한 곳입니다.</div>
            <div className="post__utils-box">
              <div className="post__delete">삭제</div>
              <div className="post__edit">수정</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
