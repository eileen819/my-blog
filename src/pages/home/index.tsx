import Carousel from "components/Carousel";
import PostList from "components/PostList";

export default function Home() {
  return (
    <>
      <Carousel />
      <div className="inner">
        <div className="post__navigation">
          <div className="post__navigation--active">전체</div>
          <div>나의 글</div>
        </div>
        <PostList />
      </div>
    </>
  );
}
