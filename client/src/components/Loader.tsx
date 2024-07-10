import lightBgLogo from "/light-bg-logo.png";
import darkBgLogo from "/dark-bg-logo.png";
import { useTheme } from "next-themes";

interface LoaderProps {
  text?: string;
}

function Loader({ text }: LoaderProps) {
  const { theme } = useTheme();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 w-48">
          <img
            src={theme === "light" ? lightBgLogo : darkBgLogo}
            alt="logo"
            className="h-full w-full object-contain"
          />
        </div>
        {text && <p className="font-bold text-primary">{text}</p>}
      </div>
    </div>
  );
}

export default Loader;
