function Stats({ total, owned, wanted, filter, setFilter }) {
  const missing = total - owned;

  function getButtonClass(type) {
    let base = "w-32 px-4 py-2 text-xs rounded-xl border cursor-pointer transition";
    let state = "";

    if (type === filter) {
      if (type === "all") {
        state = " text-gray-900 bg-purple-500 border-purple-400";
      } else if (type === "owned") {
        state = " text-gray-900 bg-green-500 border-green-400";
      } else if (type === "wanted") {
        state = " text-gray-900 bg-yellow-500  border-yellow-400";
      } else if (type === "missing") {
        state = " text-gray-900 bg-red-500 border-red-400";
      }
    } else {
      state = " text-gray-100 bg-gray-800 border-gray-700";
    }

    return base + state;
  }

  return (
    <div className="w-full flex flex-row flex-wrap justify-center items-center gap-4">
      <div className="flex flex-row justify-center items-center gap-4">
        <button className={getButtonClass("all")} onClick={() => setFilter("all")} aria-pressed={filter === "all"}>
          All ({total})
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
  );
}

export default Stats;
