import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Outlet,
  Navigate,
} from "react-router-dom";

// Fake database
const userData = [
  {
    username: "john_doe",
    repos: ["repo1", "repo2", "repo3"],
  },
  {
    username: "jane_doe",
    repos: ["repoA", "repoB"],
  },
  {
    username: "jane_smith",
    repos: ["repoX", "repoY", "repoZ"],
  },
];

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
              {userData.map((user) => (
                <li key={user.username}>
                  <Link to={`/${user.username}`}>{user.username}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:username" element={<UserLayout />}>
              <Route index element={<UserProfile />} />
              <Route path=":reponame" element={<RepoDetail />} />
            </Route>
            {/* Handle unknown routes */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />{" "}
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
}

function Home() {
  return <div>Welcome to the Home Page!</div>;
}

function UserLayout() {
  const { username } = useParams();
  const user = userData.find((user) => user.username === username);

  if (!user) {
    return <Navigate to="/404" />;
  }

  return (
    <div>
      <h2>User profile: {username}</h2>
      <Outlet />
    </div>
  );
}

function UserProfile() {
  const { username } = useParams();
  const user = userData.find((user) => user.username === username);

  return (
    <div>
      <h3>Repositories:</h3>
      <ul>
        {user.repos.map((repo) => (
          <li key={repo}>
            <Link to={`${repo}`}>{repo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RepoDetail() {
  const { username, reponame } = useParams();
  const user = userData.find((user) => user.username === username);

  if (!user || !user.repos.includes(reponame)) {
    return <Navigate to="/404" />;
  }

  return (
    <div>
      <h2>Repository: {reponame}</h2>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
