import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export default function TopBar({
  theme,
  setTheme,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  return (
    <div
      className={`topbar ${theme}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        padding: "14px 18px",

        position: "relative",
        zIndex: 5,
      }}
    >
      {/* LOGO */}
      <div
        className="logo"
        style={{
          marginLeft: isMobile ? "58px" : "0px",
          transition: "margin-left 0.25s ease",

          fontSize: "26px",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        Cookbot AI
      </div>

      {/* THEME TOGGLE */}
      <button
        className="toggle"
        onClick={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
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