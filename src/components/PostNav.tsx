import { CATEGORIES, CategoryType, TabType } from "./PostList";

interface IPostNavProps {
  activeTab: TabType | CategoryType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType | CategoryType>>;
}

export default function PostNav({ activeTab, setActiveTab }: IPostNavProps) {
  return (
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
      {CATEGORIES?.map((category) => (
        <div
          key={category}
          role="presentation"
          onClick={() => setActiveTab(category)}
          className={activeTab === category ? "post__navigation--active" : ""}
        >
          {category}
        </div>
      ))}
    </div>
  );
}
