import { resetDatabase } from "@/localserver/actions";
import { IconRefresh } from "@/_components/Icons";
import { toast } from "sonner";

export function ResetDatabase() {
  const handleResetDatabase = async () => {
    const { success, message } = await resetDatabase();
    if (success) toast.success(message);
    else toast.error(message);
  };

  return (
    <button className="btn" type="button" onClick={handleResetDatabase}>
      Réinitialiser <IconRefresh />
    </button>
  );
}
