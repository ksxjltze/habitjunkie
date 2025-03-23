import Image from "next/image";
import Dashboard from "../components/Dashboard"
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
}
