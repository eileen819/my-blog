import PostList from "components/PostList";
import Profile from "components/Profile";

export default function ProfilePage() {
  return (
    <div className="inner">
      <Profile />
      <h1 className="my-post-nav">나의 글</h1>
      <PostList hasNavigation={false} defaultTab="my" />
    </div>
  );
}
