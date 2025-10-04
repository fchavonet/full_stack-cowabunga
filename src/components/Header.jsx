import { useAuth } from "../hooks/useAuth";
import logoCowabunga from "../assets/images/logo-cowabunga.webp";
import logoGoogle from "../assets/images/logo-google.webp";

function Header() {
  const { user, loginWithGoogle, logout } = useAuth();

  let authSection;

  if (user) {
    authSection = (
      <div className="flex flex-col lg:flex-row justify-center items-center gap-1 lg:gap-4">
        <p className="text-xs italic">{user.email}</p>

        <button className="w-50 px-4 py-2 flex flex-row justify-center items-center gap-2 text-sm rounded-xl border-1 border-gray-700 bg-gray-800 cursor-pointer" onClick={logout}>
         Logout <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    );
  } else {
    authSection = (
      <div className="flex flex-col lg:flex-row justify-center items-center gap-1 lg:gap-4">
        <p className="text-xs italic">Sign in to manage your collection<span className="hidden lg:inline ms-4 not-italic">⮕</span></p>

        <button className="w-50 px-4 py-2 flex flex-row justify-center items-center gap-2 text-sm rounded-xl border-1 border-gray-700 bg-gray-800 cursor-pointer" onClick={loginWithGoogle}>
          <img className="h-4" src={logoGoogle} alt="Google logo" />
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <header className="h-34 lg:h-18 w-full p-4 fixed top-0 left-0 flex flex-col lg:flex-row justify-between items-center gap-2 bg-gray-900/75 backdrop-blur-xs shadow-lg z-50">
      <div className="h-full flex flex-col justify-between items-center">
        <h1 className="hidden">Cowabunga</h1>
        <img className="h-6" src={logoCowabunga} alt="Cowabunga logo" />
        <h2 className="text-[6px] font-extralight">Organize your UniVersus Teenage Mutant Ninja Turtles™ collection!</h2>
      </div>

      {authSection}
    </header>
  );
}

export default Header;
