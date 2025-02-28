import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, type Target } from "@/localserver/db";
import { updateSearchedAt, updateSeenAt, updateCapturedAt } from "@/localserver/actions";
import { ResetDatabase } from "@/_components/ResetDatabase";
import { IconSearch, IconSkull, IconCheck, IconEye, IconEyeBlind } from "@/_components/Icons";
import { formatDate } from "@/_utils/helpers";

export function TargetList() {
  const [showCaptured, setShowCaptured] = useState(true);
  const targets = useLiveQuery(() => db.targets.toArray());
  if (!targets || targets.length <= 0) return <section>Target list empty.</section>;

  // Sort targets by level, secondary (for monsters that have the same level) by ID.
  // I think the secondary ID sorting for similar levels already happens because
  // the database is already returned in ID ordering?
  const sortedTargets = [...targets].sort((a, b) => {
    return a.level - b.level;
  });

  const filteredTargets = sortedTargets.filter((target) => {
    if (showCaptured) return true;
    return !target.capturedAt;
  });

  return (
    <section>
      <div className="section-heading">
        <h1>Avis de recherche</h1>
        <div className="section-controls">
          <button className="btn" type="button" onClick={() => setShowCaptured(!showCaptured)}>
            Capturés{showCaptured ? <IconEye /> : <IconEyeBlind />}
          </button>
          <ResetDatabase />
        </div>
      </div>
      <ul id="target-list">
        {filteredTargets.map((target) => (
          <TargetCard key={target.id} target={target} />
        ))}
      </ul>
    </section>
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
