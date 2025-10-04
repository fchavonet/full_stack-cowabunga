function Stats({ total, owned, wanted, setFilter }) {
  const missing = total - owned;

  function getButtonClass() {
    let base = "w-32 px-2 py-1 text-sm rounded-xl cursor-pointer transition";

    return base;
  }

  return (
    <div className="w-full flex flex-row flex-wrap justify-center items-center gap-4">
      <div className="flex flex-row justify-center items-center gap-4">
        <button className={getButtonClass("all") + " bg-gray-400"} onClick={() => setFilter("all")}>
          All ({total})
        </button>

        <button className={getButtonClass("owned") + " bg-green-500"} onClick={() => setFilter("owned")}>
          Owned: {owned}/{total}
        </button>
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <button className={getButtonClass("wanted") + " bg-yellow-400"} onClick={() => setFilter("wanted")}>
          Want: {wanted}
        </button>

        <button className={getButtonClass("missing") + " bg-red-500"} onClick={() => setFilter("missing")}>
          Missing: {missing}
        </button>
      </div>
    </div>
  );
}

export default Stats;
