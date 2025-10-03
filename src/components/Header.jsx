import { useAuth } from "../hooks/useAuth";

function Header() {
  const { user, loginWithGoogle, logout } = useAuth();

  let authSection;

  if (user) {
    authSection = (
      <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4">
        <span className="text-xs italic">{user.email}</span>

        <button className="w-50 px-4 py-2 border cursor-pointer" onClick={logout}>
          Logout
        </button>
      </div>
    );
  } else {
    authSection = (
      <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4">
        <span className="text-xs italic"> Sign in to manage your collection</span>

        <button className="w-50 px-4 py-2 border cursor-pointer" onClick={loginWithGoogle}>
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <header className="h-32 lg:h-16 w-full p-4 fixed top-0 left-0 flex flex-col lg:flex-row justify-between items-center border-b bg-white z-50">
      <h1 className="mb-2 lg:mb-0 font-bold">Cowabunga</h1>
      {authSection}
    </header>
  );
}

export default Header;
