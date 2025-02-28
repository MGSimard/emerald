import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/localserver/db";

export function TestDexie() {
  const targets = useLiveQuery(() => db.targets.toArray());
  if (!targets || targets.length <= 0) return <div>Target list empty.</div>;

  return (
    <ul>
      {targets.map((target) => (
        <li key={target.id}>{target.name}</li>
      ))}
    </ul>
  );
}
