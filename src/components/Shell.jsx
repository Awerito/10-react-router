import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Outlet,
} from "react-router-dom";

export function BasicShellApp() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Router>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
            </ul>
          </nav>
        </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="posts" element={<PostsLayout />}>
              <Route index element={<PostsList />} />
              <Route path=":id" element={<PostDetails />} />
            </Route>
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
}

function Home() {
  return <div>Welcome to the Home Page!</div>;
}

function PostsLayout() {
  return (
    <div>
      <h2>Posts</h2>
      <Outlet />{" "}
      {/* Outlet to render either the post list or individual post */}
    </div>
  );
}

function PostsList() {
  const posts = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
    { id: 3, title: "Post 3" },
  ];

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}

function PostDetails() {
  const { id } = useParams();

  return (
    <div>
      <h3>Post Details for Post ID: {id}</h3>
      <p>This is the detailed view for post {id}.</p>
    </div>
  );
}
