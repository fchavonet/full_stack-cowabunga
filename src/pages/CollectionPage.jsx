import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import Card from "../components/Card";
import Stats from "../components/Stats";

const TOTAL_CARDS = 186;

function CollectionPage() {
  const { user } = useAuth();

  const [cards, setCards] = useState({});
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cards from Supabase on mount or when user changes.
    async function fetchCards() {
      if (!user) {
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("card_status")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error(error);
        setLoading(false);

        return;
      }

      const map = {};

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        map[row.card_id] = row;
      }

      setTimeout(() => {
        setCards(map);
        setLoading(false);
      }, 1500);
    }

    fetchCards();
  }, [user]);

  // Toggle "owned" status (exclusive with "wanted").
  async function toggleOwned(cardId) {
    if (!user) {
      return;
    }

    const current = cards[cardId] || { owned: false, wanted: false };
    const nextOwned = !current.owned;
    // Enforce exclusivity.
    const nextWanted = false;

    const payload = {
      user_id: user.id,
      card_id: cardId,
      owned: nextOwned,
      wanted: nextWanted,
    };

    const { data, error } = await supabase
      .from("card_status")
      .upsert(payload, { onConflict: "user_id,card_id" })
      .select()
      .single();

    if (error) {
      console.error(error);

      return;
    }

    setCards((prev) => ({ ...prev, [cardId]: data }));
  }

  // Toggle "wanted" status (exclusive with "owned").
  async function toggleWanted(cardId) {
    if (!user) {
      return;
    }

    const current = cards[cardId] || { owned: false, wanted: false };
    const nextWanted = !current.wanted;
    // Enforce exclusivity.
    const nextOwned = false;

    const payload = {
      user_id: user.id,
      card_id: cardId,
      owned: nextOwned,
      wanted: nextWanted,
    };

    const { data, error } = await supabase
      .from("card_status")
      .upsert(payload, { onConflict: "user_id,card_id" })
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setCards((prev) => ({ ...prev, [cardId]: data }));
  }

  // Count owned and wanted cards.
  let ownedCount = 0;
  let wantedCount = 0;

  // Filter displayed cards based on current filter.
  const values = Object.values(cards);

  for (let i = 0; i < values.length; i++) {
    const row = values[i];

    if (row.owned) {
      ownedCount++;
    }

    if (row.wanted) {
      wantedCount++;
    }
  }

  const displayed = [];

  for (let i = 1; i <= TOTAL_CARDS; i++) {
    const id = String(i).padStart(3, "0");
    const row = cards[id];

    if (filter === "all") {
      displayed.push(id);
    } else if (filter === "owned" && row?.owned) {
      displayed.push(id);
    } else if (filter === "wanted" && row?.wanted) {
      displayed.push(id);
    } else if (filter === "missing" && (!row || !row.owned)) {
      displayed.push(id);
    }
  }

  // Show loader until all data is ready.
  if (loading) {
    return (
      <div className="h-full pt-34 lg:pt-18 flex flex-col justify-center items-center gap-2">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        <p>Loading your collection...</p>
      </div>
    );
  }

  return (
    <div className="pt-38 lg:pt-22 flex flex-col justify-center items-center">
      <Stats total={TOTAL_CARDS} owned={ownedCount} wanted={wantedCount} filter={filter} setFilter={setFilter} />


      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {displayed.map((id) => {
          const row = cards[id] || {};
          let containerClass = "p-2 flex flex-col justify-center items-center border rounded-2xl transition";
          if (row.owned) {
            containerClass += " border-green-500";
          } else if (row.wanted) {
            containerClass += " border-yellow-500";
          }

          return (
            <div key={id} className={containerClass}>
              <Card id={id} owned={!!row.owned} wanted={!!row.wanted} onToggleOwned={toggleOwned} onToggleWanted={toggleWanted} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CollectionPage;
