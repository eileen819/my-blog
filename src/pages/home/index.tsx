import Carousel from "components/Carousel";
import PostList from "components/PostList";

export default function Home() {
  return (
    <>
      <Carousel />
      <div className="inner">
        <PostList />
      </div>
    </>
  );
}
