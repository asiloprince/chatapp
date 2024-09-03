import { Link } from "react-router-dom";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sm:flex sm:justify-between py-2 px-2 ">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Link to="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">Chat tau</h1>
            </Link>
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block"></nav>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
