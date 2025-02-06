import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Post List</Link>
        </li>
        <li>
          <Link to="/posts/:id">Post Detail</Link>
        </li>
        <li>
          <Link to="/posts/new">Post New</Link>
        </li>
        <li>
          <Link to="/posts/edit/:id">Post Edit</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/posts" element={<h1>Posts Page</h1>} />
        <Route path="/posts/:id" element={<h1>Posts Detail Page</h1>} />
        <Route path="/posts/new" element={<h1>Posts New Page</h1>} />
        <Route path="/posts/edit/:id" element={<h1>Posts Edit Page</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
        {/* 모든 존재하지 않는 경로 처리 */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

// Link 컴포넌트는 BrowserRouter로 감싸야만 동작 가능
