function Stats({ total, owned, wanted, filter, setFilter, type, setType, counts }) {
  const missing = total - owned;

  // Return dynamic button styles based on the active filter
  function getButtonClass(typeName) {
    let base = "w-32 px-4 py-2 text-xs rounded-xl border cursor-pointer transition";
    let state = "";

    if (typeName === filter) {
      if (typeName === "all") {
        state = " text-gray-900 bg-purple-500 border-purple-400";
      } else if (typeName === "owned") {
        state = " text-gray-900 bg-green-500 border-green-400";
      } else if (typeName === "wanted") {
        state = " text-gray-900 bg-yellow-500 border-yellow-400";
      } else if (typeName === "missing") {
        state = " text-gray-900 bg-red-500 border-red-400";
      }
    } else {
      state = " text-gray-100 bg-gray-800 border-gray-700";
    }

    return base + state;
  }

  // Safely return a numeric count for a given key.
  function getCount(key) {
    if (counts && typeof counts[key] === "number") {
      return counts[key];
    }
    return 0;
  }

  // Get total number of cards for the selected category.
  function getCategoryTotal() {
    switch (type) {
      case "regular":
        return getCount("regular");
      case "special":
        return getCount("special");
      case "starter":
        return getCount("starter");
      case "chrome":
        return getCount("chrome");
      case "promotional":
        return getCount("promotional");
      default:
        return getCount("all");
    }
  }

  return (
    <div className="w-full flex flex-row flex-wrap justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="relative inline-block w-full">
          <select className="appearance-none w-full px-3 py-2 pr-8 text-xs text-gray-100 rounded-xl border border-gray-700 bg-gray-800 cursor-pointer transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All</option>
            <option value="regular">Regular</option>
            <option value="special">Special</option>
            <option value="starter">Starter</option>
            <option value="chrome">Chrome</option>
            <option value="promotional">Promotional</option>
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <i className="bi bi-caret-down-fill"></i>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
          <div className="flex flex-row justify-center items-center gap-4">
            <button className={getButtonClass("all")} onClick={() => setFilter("all")} aria-pressed={filter === "all"}>
              All: {getCategoryTotal()}/{total}
            </button>

            <button className={getButtonClass("owned")} onClick={() => setFilter("owned")} aria-pressed={filter === "owned"}>
              Owned: {owned}/{total}
            </button>
          </div>

          <div className="flex flex-row justify-center items-center gap-4">
            <button className={getButtonClass("wanted")} onClick={() => setFilter("wanted")} aria-pressed={filter === "wanted"}>
              Want: {wanted}
            </button>

            <button className={getButtonClass("missing")} onClick={() => setFilter("missing")} aria-pressed={filter === "missing"}>
              Missing: {missing}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
