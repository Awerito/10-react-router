import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

import { BasicShellApp } from "./components/Shell";

export default function App() {
  return (
    <MantineProvider>
      <BasicShellApp />
    </MantineProvider>
  );
}
