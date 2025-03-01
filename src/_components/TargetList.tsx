import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, type Target } from "@/localserver/db";
import { updateSearchedAt, updateSeenAt, updateCapturedAt } from "@/localserver/actions";
import { ResetDatabase } from "@/_components/ResetDatabase";
import { IconSearch, IconSkull, IconCheck, IconEye, IconEyeBlind, IconLink, IconRefresh } from "@/_components/Icons";
import { formatDate } from "@/_utils/helpers";
import { toast } from "sonner";

export function TargetList() {
  const [showCaptured, setShowCaptured] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");
  const targets = useLiveQuery(() => db.targets.toArray());

  if (!targets || targets.length <= 0) {
    return (
      <section>
        <div className="section-heading">
          <h1>Avis de recherche</h1>
          <div className="section-controls">
            <input id="search-input" type="search" disabled aria-disabled />
            <div id="section-controls-right">
              <button className="btn" type="button" disabled aria-disabled>
                <span>Capturés</span>
                <IconEye />
              </button>
              <button className="btn" type="button" disabled aria-disabled>
                <span>Réinitialiser</span>
                <IconRefresh />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const sortedTargets = [...targets].sort((a, b) => {
    return a.level - b.level;
  });

  const filteredTargets = sortedTargets.filter((target) => {
    if (showCaptured) return true;
    return !target.capturedAt;
  });

  const searchFilteredTargets = filteredTargets.filter((target) => {
    const normalizedFilterQuery = filterQuery
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "");

    return (
      target.name
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalizedFilterQuery) ||
      target.zone
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalizedFilterQuery) ||
      target.subzone.normalize("NFKD").toLowerCase().includes(normalizedFilterQuery)
    );
  });

  const handleShowCaptured = () => {
    setShowCaptured(!showCaptured);
    toast.success(`Avis capturés ${showCaptured ? "masqué" : "affiché"}.`);
  };

  return (
    <section>
      <div className="section-heading">
        <h1>Avis de recherche</h1>
        <div className="section-controls">
          <input
            id="search-input"
            type="search"
            placeholder="Filtrer..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
          <div id="section-controls-right">
            <button className="btn" type="button" onClick={handleShowCaptured}>
              <span>Capturés</span>
              {showCaptured ? <IconEye /> : <IconEyeBlind />}
            </button>
            <ResetDatabase />
          </div>
        </div>
      </div>
      <ul id="target-list">
        {searchFilteredTargets.map((target) => (
          <TargetCard key={target.id} target={target} />
        ))}
      </ul>
    </section>
  );
}

function TargetCard({ target }: { target: Target }) {
  const { id, name, level, zone, subzone, image, wiki, searchedAt, seenAt, capturedAt } = target;

  const handleUpdateSearchedAt = async () => {
    const { success, message } = await updateSearchedAt(id);
    if (success) toast.success(message);
    else toast.error(message);
  };

  const handleUpdateSeenAt = async () => {
    const { success, message } = await updateSeenAt(id);
    if (success) toast.success(message);
    else toast.error(message);
  };

  const handleUpdateCapturedAt = async () => {
    const { success, message } = await updateCapturedAt(id);
    if (success) toast.success(message);
    else toast.error(message);
  };

  return (
    <li className={`target-card${capturedAt ? " target-captured" : ""}`}>
      <div className="target-card-left">
        <img className="target-image" alt="a" src={image} />
        <span className="target-level">Lv.{level}</span>
      </div>
      <div className="target-card-right">
        <div className="target-metadata">
          <h3 className="target-name">
            <a href={wiki} target="_blank">
              {name}
              <IconLink />
            </a>
          </h3>
          <span className="target-zone">{zone}</span>
          <span className="target-subzone">{subzone}</span>
        </div>
        <div className="target-actions">
          <button
            className="btn"
            type="button"
            onClick={handleUpdateSearchedAt}
            aria-label="Dernière recherche"
            title="Dernière recherche">
            {formatDate(searchedAt)}
            <IconSearch />
          </button>
          <button
            className="btn"
            type="button"
            onClick={handleUpdateSeenAt}
            aria-label="Dernièrement vu"
            title="Dernièrement vu">
            {formatDate(seenAt)}
            <IconSkull />
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleUpdateCapturedAt}
            aria-label={capturedAt ? "Réinitialiser" : "Marquer comme capturé"}
            title={capturedAt ? "Réinitialiser" : "Marquer comme capturé"}>
            {formatDate(capturedAt)}
            <IconCheck />
          </button>
        </div>
      </div>
    </li>
  );
}
