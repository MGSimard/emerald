import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, type Target } from "@/localserver/db";
import { updateSearchedAt, updateSeenAt, updateCapturedAt } from "@/localserver/actions";
import { ResetDatabase } from "@/_components/ResetDatabase";
import { IconSearch, IconSkull, IconCheck, IconEye, IconEyeBlind, IconLink } from "@/_components/Icons";
import { formatDate } from "@/_utils/helpers";
import { toast } from "sonner";
import { useLang } from "@/_components/LangContext";
import { SoftReset } from "./SoftReset";

export function TargetTool() {
  const [showCaptured, setShowCaptured] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");
  const targets = useLiveQuery(() => db.targets.toArray());
  const { lang } = useLang();

  const handleShowCaptured = () => {
    setShowCaptured(!showCaptured);
    toast.success(`Avis capturés ${showCaptured ? "masqué" : "affiché"}.`);
  };

  return (
    <section>
      <div className="section-heading">
        <h1>{lang === "fr" ? "Avis de recherche" : "Bounties"}</h1>
        <div className="section-controls">
          <input
            id="search-input"
            type="search"
            placeholder={lang === "fr" ? "Filtrer..." : "Filter..."}
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            spellCheck="false"
          />
          <div id="section-controls-right">
            <button
              className="btn square"
              type="button"
              onClick={handleShowCaptured}
              aria-label={
                showCaptured
                  ? lang === "fr"
                    ? "Cacher capturés"
                    : "Hide Captured"
                  : lang === "fr"
                    ? "Afficher Capturés"
                    : "Show Captured"
              }
              title={
                showCaptured
                  ? lang === "fr"
                    ? "Cacher capturés"
                    : "Hide Captured"
                  : lang === "fr"
                    ? "Afficher Capturés"
                    : "Show Captured"
              }>
              {showCaptured ? <IconEye /> : <IconEyeBlind />}
            </button>
            <SoftReset />
            <ResetDatabase />
          </div>
        </div>
      </div>
      <TargetList targets={targets} showCaptured={showCaptured} filterQuery={filterQuery} />
    </section>
  );
}

function TargetList({
  targets,
  showCaptured,
  filterQuery,
}: {
  targets: Target[] | undefined;
  showCaptured: boolean;
  filterQuery: string;
}) {
  const { lang } = useLang();

  if (!targets || targets.length <= 0) return null;

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
      target.name[lang]
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalizedFilterQuery) ||
      target.zone[lang]
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalizedFilterQuery) ||
      target.subzone[lang]
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalizedFilterQuery)
    );
  });

  return (
    <ul id="target-list">
      {searchFilteredTargets.map((target) => (
        <TargetCard key={target.id} target={target} />
      ))}
    </ul>
  );
}

function TargetCard({ target }: { target: Target }) {
  const { lang } = useLang();

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
          <h2 className="target-name">
            {wiki ? (
              <a href={wiki} target="_blank">
                {name[lang]}
                <IconLink />
              </a>
            ) : (
              name[lang]
            )}
          </h2>
          <span className="target-zone">{zone[lang]}</span>
          <span className="target-subzone">{subzone[lang]}</span>
        </div>
        <div className="target-actions">
          <button
            className="btn"
            type="button"
            onClick={handleUpdateSearchedAt}
            aria-label={lang === "fr" ? "Dernière recherche" : "Last Search"}
            title={lang === "fr" ? "Dernière recherche" : "Last Search"}>
            {formatDate(searchedAt)}
            <IconSearch />
          </button>
          <button
            className="btn"
            type="button"
            onClick={handleUpdateSeenAt}
            aria-label={lang === "fr" ? "Dernièrement vu" : "Last Seen"}
            title={lang === "fr" ? "Dernièrement vu" : "Last Seen"}>
            {formatDate(seenAt)}
            <IconSkull />
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleUpdateCapturedAt}
            aria-label={
              capturedAt
                ? lang === "fr"
                  ? "Réinitialiser"
                  : "Reset"
                : lang === "fr"
                  ? "Marquer comme capturé"
                  : "Mark as Captured"
            }
            title={
              capturedAt
                ? lang === "fr"
                  ? "Réinitialiser"
                  : "Reset"
                : lang === "fr"
                  ? "Marquer comme capturé"
                  : "Mark as Captured"
            }>
            {formatDate(capturedAt)}
            <IconCheck />
          </button>
        </div>
      </div>
    </li>
  );
}
