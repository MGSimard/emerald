import { resetDatabase } from "@/localserver/actions";

export function ResetDatabase() {
  return <button onClick={resetDatabase}>Reset Database</button>;
}
