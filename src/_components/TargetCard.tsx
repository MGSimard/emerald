export function TargetCard() {
  return (
    <li className="target-card">
      <div className="target-card-left"></div>
      <div className="target-card-right">
        <div className="target-metadata">
          <span>Name</span>
          <span>Zone</span>
          <span>Subzone</span>
        </div>
        <div className="target-actions">
          <button type="button">Recherche</button>
          <button type="button">Vu</button>
          <button type="button">Capturé</button>
        </div>
      </div>
    </li>
  );
}
