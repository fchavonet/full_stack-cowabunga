import { getCardImageUrl } from "../lib/cardImages";

function Card({ id, owned, wanted, onToggleOwned, onToggleWanted }) {
  const src = getCardImageUrl(id);

  // Style for the "Owned" button (active = green).
  let ownedBtnClass = "px-2 py-1 flex-1 text-xs rounded-b-xl rounded-tl-xl border-1 border-gray-700 bg-gray-800 cursor-pointer transition duration-300 ease-in-out";
  if (owned) {
    ownedBtnClass += " text-gray-900 bg-green-500 border-green-500";
  }

  // Style for the "Want" button (active = yellow).
  let wantBtnClass = "px-2 py-1 flex-1 text-xs rounded-b-xl rounded-tr-xl border-1 border-gray-700 bg-gray-800 cursor-pointer transition duration-300 ease-in-out";
  if (wanted) {
    wantBtnClass += " text-gray-900 bg-yellow-500 border-yellow-500";
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="relative flex flex-col justify-center items-center">
        <span className="absolute top-0 right-0 px-2 py-1 text-xs rounded-tr-xl rounded-bl-xl bg-gray-950/75">
          {id}/186
        </span>

        <img className="w-full h-auto rounded-xl outline outline-gray-800 object-contain" src={src} loading="lazy" alt={"Card " + id} />
      </div>

      <div className="w-full flex flex-row gap-3">
        <button className={ownedBtnClass} onClick={() => onToggleOwned(id)}>
          Owned
        </button>

        <button className={wantBtnClass} onClick={() => onToggleWanted(id)}>
          Want
        </button>
      </div>
    </div>
  );
}

export default Card;
