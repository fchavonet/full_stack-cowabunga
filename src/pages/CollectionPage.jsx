import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import { getAllCardIds } from "../lib/cardImages";
import Card from "../components/Card";
import Stats from "../components/Stats";

function CollectionPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState({});
  const [type, setType] = useState("all");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Retrieve all card IDs grouped by category.
  const alreadyLoadedRef = useRef(false);

  const { all, regular, special, starter, chrome, promotional, counts } = getAllCardIds();

  useEffect(() => {
    // Fetch cards from Supabase on mount or when user changes.
    async function fetchCards() {
      if (!user) {
        return;
      }

      if (alreadyLoadedRef.current) {
        return;
      }

      alreadyLoadedRef.current = true;

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

      // Artificial delay for smooth UI loading.
      setTimeout(() => {
        setCards(map);
        setLoading(false);
      }, 1500);
    }

    fetchCards();
  }, [user]);

  // Reset filter to "all" whenever card type changes.
  useEffect(() => {
    setFilter("all");
  }, [type]);

  // Toggle "owned" status (exclusive with "wanted").
  async function toggleOwned(cardId) {
    if (!user) {
      return;
    }
    const current = cards[cardId] || { owned: false, wanted: false };

    const payload = {
      user_id: user.id,
      card_id: cardId,
      owned: !current.owned,
      wanted: false,
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

    const payload = {
      user_id: user.id,
      card_id: cardId,
      owned: false,
      wanted: !current.wanted,
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

  // Select which card IDs to display based on selected type.
  let idsToShow = all;

  if (type === "regular") {
    idsToShow = regular;
  } else if (type === "special") {
    idsToShow = special;
  } else if (type === "starter") {
    idsToShow = starter;
  } else if (type === "chrome") {
    idsToShow = chrome;
  } else if (type === "promotional") {
    idsToShow = promotional;
  }

  // Compute statistics for the selected type.
  const totalForType = idsToShow.length;
  const ownedCount = idsToShow.filter((id) => cards[id]?.owned).length;
  const wantedCount = idsToShow.filter((id) => cards[id]?.wanted).length;

  // Filter displayed cards based on active filter.
  const displayed = idsToShow.filter((id) => {
    const row = cards[id];

    if (filter === "all") {
      return true;
    }

    if (filter === "owned") {
      return row?.owned;
    }

    if (filter === "wanted") {
      return row?.wanted;
    }

    if (filter === "missing") {
      return !row || !row.owned;
    }

    return true;
  });

  // Format badge text shown on each card.
  function formatBadge(id) {
    // Extract the numeric suffix from a card ID.
    function extractNumFromId(identifier) {
      const match = identifier.match(/(\d{3})$/);

      if (match && match[1]) {
        return parseInt(match[1], 10);
      }

      return null;
    }

    // Pad a number to three digits.
    function pad3(n) {
      return String(n).padStart(3, "0");
    }

    // Regular card.
    if (/^[0-9]{3}$/.test(id)) {
      return id + "/" + counts.regular;
    }

    // Special cards.
    if (/^sp-/.test(id)) {
      const num = extractNumFromId(id);

      if (num !== null) {
        return num + "/" + counts.regular;
      }

      return id;
    }

    // Starter deck cards.
    if (/^st\d?-/.test(id)) {
      const match = id.match(/^st(\d*)-(\d{3})$/);
      let serie = "1";
      let num = "000";

      if (match) {
        if (match[1]) {
          serie = match[1];
        }

        if (match[2]) {
          num = match[2];
        }
      }

      return "ST" + serie + " " + num;
    }

    // Chrome cards.
    if (/^ch-/.test(id) || /^cr-/.test(id)) {
      const num = extractNumFromId(id);

      if (num !== null) {
        return "CR " + pad3(num);
      }

      return id;
    }

    // Promotional cards.
    if (/^p-/.test(id) || /^pr-/.test(id)) {
      const num = extractNumFromId(id);

      if (num !== null) {
        return "P " + pad3(num);
      }

      return id;
    }

    // Default (fallback).
    return id;
  }

  // Show loader until all data is ready.
  if (loading) {
    return (
      <div className="h-full pt-34 lg:pt-18 flex flex-col justify-center items-center gap-2">
        <div className="w-16 h-16 border-4 border-gray-100 border-t-green-500 rounded-full animate-spin"></div>
        <p>Loading your collection...</p>
      </div>
    );
  }

  return (
    <div className="pt-38 lg:pt-22 flex flex-col justify-start items-center">
      <Stats total={totalForType} owned={ownedCount} wanted={wantedCount} filter={filter} setFilter={setFilter} type={type} setType={setType} counts={counts} />

      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
        {displayed.map((id, index) => {
          const row = cards[id] || {};

          let containerClass = "p-2 flex flex-col justify-center items-center rounded-2xl bg-gray-900 opacity-0 outline-2 outline-gray-800 shadow-lg transition duration-300 ease-in-out transform translate-y-8 hover:scale-102";

          if (row.owned) {
            containerClass += " outline-2 outline-green-500 shadow-lg shadow-green-500";
          } else if (row.wanted) {
            containerClass += " outline-2 outline-yellow-500 shadow-lg shadow-yellow-500";
          }

          return (
            <div className={containerClass} key={id + "-" + type + "-" + filter}
              style={{
                animation: "fadeInUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) " + (index * 0.04)
                  + "s forwards"
              }}
            >
              <Card id={id} badge={formatBadge(id)} owned={!!row.owned} wanted={!!row.wanted} onToggleOwned={toggleOwned} onToggleWanted={toggleWanted} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CollectionPage;
