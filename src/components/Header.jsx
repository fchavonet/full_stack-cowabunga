import { useAuth } from "../hooks/useAuth";
import logo from "../assets/images/logo-cowabunga.webp";

function Header() {
  const { user, loginWithGoogle, logout } = useAuth();

  let authSection;

  if (user) {
    authSection = (
      <div className="flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-4">
        <span className="text-xs italic">{user.email}</span>

        <button className="w-50 px-4 py-2 border cursor-pointer" onClick={logout}>
          Logout
        </button>
      </div>
    );
  } else {
    authSection = (
      <div className="flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-4">
        <span className="text-xs italic"> Sign in to manage your collection</span>

        <button className="w-50 px-4 py-2 border cursor-pointer" onClick={loginWithGoogle}>
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <header className="h-34 lg:h-18 w-full p-4 fixed top-0 left-0 flex flex-col lg:flex-row justify-between items-center gap-2 border-b bg-white z-50">
      <div className="h-full flex flex-col justify-between items-center">
        <h1 className="hidden">Cowabunga</h1>
        <img className="h-6" src={logo} alt="Cowabunga logo" />
        <h2 className="text-[6px]">Organize your UniVersus Teenage Mutant Ninja Turtles™ collection!</h2>
      </div>
      {authSection}
    </header>
  );
}

export default Header;
