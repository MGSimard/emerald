import { useLiveQuery } from "dexie-react-hooks";
import { db, type Target } from "@/localserver/db";
import { updateSearchedAt, updateSeenAt, updateCapturedAt } from "@/localserver/actions";
import { formatDate } from "@/_utils/helpers";
import { IconSearch, IconSkull, IconCheck } from "@/_components/Icons";

export function TargetList() {
  const targets = useLiveQuery(() => db.targets.toArray());
  if (!targets || targets.length <= 0) return <div>Target list empty.</div>;

  return (
    <ul id="target-list">
      {targets.map((target) => (
        <TargetCard key={target.id} target={target} />
      ))}
    </ul>
  );
}

function TargetCard({ target }: { target: Target }) {
  const { id, name, level, zone, subzone, searchedAt, seenAt, capturedAt, updatedAt } = target;

  return (
    <li className="target-card">
      <div className="target-card-left">
        <span className="target-level">Nv.{level}</span>
      </div>
      <div className="target-card-right">
        <div className="target-metadata">
          <h3 className="target-name">{name}</h3>
          <span className="target-zone">{zone}</span>
          <span className="target-subzone">/ {subzone}</span>
        </div>
        <div className="target-actions">
          <button className="btn" type="button" onClick={() => updateSearchedAt(id)}>
            <IconSearch />
            {formatDate(searchedAt)}
          </button>
          <button className="btn" type="button" onClick={() => updateSeenAt(id)}>
            <IconSkull />
            {formatDate(seenAt)}
          </button>
          <button className="btn" type="button" onClick={() => updateCapturedAt(id)}>
            <IconCheck />
            {formatDate(capturedAt)}
          </button>
        </div>
      </div>
    </li>
  );
}
