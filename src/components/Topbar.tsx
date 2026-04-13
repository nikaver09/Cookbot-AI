import { Sun, Moon } from "lucide-react";

type Props = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export default function TopBar({ theme, setTheme }: Props) {
  return (
    <div className={`topbar ${theme}`}>
      <div className="logo">Cookbot AI</div>

      <button
        className="toggle"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div className={`knob ${theme}`}>
          {theme === "dark" ? (
            <Moon size={14} />
          ) : (
            <Sun size={14} />
          )}
        </div>
      </button>
    </div>
  );
}