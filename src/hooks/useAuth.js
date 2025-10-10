import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAuth() {
  const [user, setUser] = useState(null);

  // Initialize user session and subscribe to auth state changes.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && data.session.user) {
        setUser(data.session.user);
      } else {
        setUser(null);
      }
    });

    // Listen for login/logout or token refresh events.
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session && session.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    // Clean up the listener on unmount.
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  // Log in using Google OAuth provider.
  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/web-cowabunga/",
      },
    });

    if (error) {
      console.error(error.message);
    }
  }

  // Log out the current user.
  async function logout() {
    await supabase.auth.signOut();
  }

  return { user, loginWithGoogle, logout };
}
