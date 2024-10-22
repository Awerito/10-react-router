import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
}

function Home() {
  return <div>Welcome to the Home Page!</div>;
}

function About() {
  return <div>About Us</div>;
}

function Contact() {
  return <div>Contact Information</div>;
}
