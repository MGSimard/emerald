import { useLiveQuery } from "dexie-react-hooks";
import { db, type Target } from "@/localserver/db";
import { updateSearchedAt, updateSeenAt, updateCapturedAt } from "@/localserver/actions";
import { formatDate } from "@/_utils/helpers";
import { IconSearch, IconSkull, IconCheck } from "@/_components/Icons";

export function TargetList() {
  const targets = useLiveQuery(() => db.targets.toArray());
  if (!targets || targets.length <= 0) return <div>Target list empty.</div>;

  // Sort targets by level, secondary (for monsters that have the same level) by ID.
  // I think the secondary ID sorting for similar levels already happens because
  // the database is already returned in ID ordering?
  const sortedTargets = [...targets].sort((a, b) => {
    return a.level - b.level;
  });

  return (
    <ul id="target-list">
      {sortedTargets.map((target) => (
        <TargetCard key={target.id} target={target} />
      ))}
    </ul>
  );
}

function TargetCard({ target }: { target: Target }) {
  const { id, name, level, zone, subzone, wiki, searchedAt, seenAt, capturedAt } = target;

  return (
    <li className={`target-card${capturedAt ? " target-captured" : ""}`}>
      <div className="target-card-left">
        <img
          className="target-image"
          alt="a"
          src="https://www.dofuspourlesnoobs.com/uploads/1/3/0/1/13010384/custom_themes/586567114324766674/files/wanted/monsters/roub-ignolles.png"
        />
        <span className="target-level">Nv.{level}</span>
      </div>
      <div className="target-card-right">
        <div className="target-metadata">
          <h3 className="target-name">
            <a href={wiki.toString()} target="_blank">
              {name}
            </a>
          </h3>
          <span className="target-zone">{zone}</span>
          <span className="target-subzone">{subzone}</span>
        </div>
        <div className="target-actions">
          <button className="btn" type="button" onClick={() => updateSearchedAt(id)}>
            {formatDate(searchedAt)}
            <IconSearch />
          </button>
          <button className="btn" type="button" onClick={() => updateSeenAt(id)}>
            {formatDate(seenAt)}
            <IconSkull />
          </button>
          <button className="btn btn-primary" type="button" onClick={() => updateCapturedAt(id)}>
            {formatDate(capturedAt)}
            <IconCheck />
          </button>
        </div>
      </div>
    </li>
  );
}
