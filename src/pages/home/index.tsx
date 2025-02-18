import Carousel from "components/Carousel";
import PostList from "components/PostList";
import { useState } from "react";

type TabType = "all" | "my";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  return (
    <>
      <Carousel />
      <div className="inner">
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
        </div>
        <PostList />
      </div>
    </>
  );
}
