import { softReset } from "@/localserver/actions";
import { IconRefresh } from "@/_components/Icons";
import { toast } from "sonner";
import { useLang } from "@/_components/LangContext";

export function SoftReset() {
  const { lang } = useLang();

  const handleSoftReset = async () => {
    const confirmed = confirm(
      lang === "fr"
        ? "Réinitialiser les temps de recherche & d'observation?\n\nVotre progression de capture ne sera pas réinitialisée.\n\n(Soft Reset)"
        : "Reset search & seen times?\n\nYour capture progress will not be reset.\n\n(Soft Reset)"
    );
    if (!confirmed) return;

    const { success, message } = await softReset();
    if (success) toast.success(message);
    else toast.error(message);
  };

  return (
    <button
      className="btn square"
      type="button"
      onClick={handleSoftReset}
      aria-label={lang === "fr" ? "Réinitialiser recherche & observation" : "Reset search & seen"}
      title={lang === "fr" ? "Réinitialiser recherche & observation" : "Reset search & seen"}>
      <IconRefresh />
    </button>
  );
}
