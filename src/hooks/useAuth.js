import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && data.session.user) {
        setUser(data.session.user);
      } else {
        setUser(null);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session && session.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

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

  async function logout() {
    await supabase.auth.signOut();
  }

  return { user, loginWithGoogle, logout };
}
