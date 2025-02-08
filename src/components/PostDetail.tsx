export default function PostDetail() {
  return (
    <div className="post__detail">
      <div className="post__box">
        <div className="post__title">제목입니다.</div>
        <div className="post__profile-box">
          <div className="post__profile" />
          <div className="post__author-name">박종성</div>
          <div className="post__date">2025.02.06 목요일</div>
        </div>
        <div className="post__utils-box">
          <div className="post__delete">삭제</div>
          <div className="post__edit">수정</div>
        </div>
        <div className="post__text">여기는 게시글을 작성한 곳입니다.</div>
      </div>
    </div>
  );
}
