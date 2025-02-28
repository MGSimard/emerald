import { resetDatabase } from "@/localserver/actions";

export function ResetDatabase() {
  // TODO When we implemented sonner set up a confirmation setup for this

  return (
    <button className="btn" type="button" onClick={resetDatabase}>
      Reset
    </button>
  );
}
