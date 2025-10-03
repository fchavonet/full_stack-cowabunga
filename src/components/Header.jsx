import { useAuth } from "../hooks/useAuth";

function Header() {
  const { user, loginWithGoogle, logout } = useAuth();

  let authSection;

  if (user) {
    authSection = (
      <div className="flex flex-row justify-center items-center gap-4">
        <span className="italic">{user.email}</span>

        <button className="w-50 px-4 py-2 border cursor-pointer" onClick={logout}>
          Logout
        </button>
      </div>
    );
  } else {
    authSection = (
      <button className="w-50 px-4 py-2 border cursor-pointer" onClick={loginWithGoogle}>
        Login with Google
      </button>
    );
  }

  return (
    <header className="p-4 justify-between flex items-center border">
      <h1 className="font-bold">Cowabunga</h1>
      {authSection}
    </header>
  );
}

export default Header;
