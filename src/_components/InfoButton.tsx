import { useRef } from "react";
import { IconQuestionMark, IconClose } from "@/_components/Icons";
import { useLang } from "@/_components/LangContext";

export function InfoButton() {
  const { lang } = useLang();

  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className="question-mark"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="Information"
        title="Information">
        <IconQuestionMark />
      </button>
      <dialog id="faq-dialog" ref={dialogRef}>
        <div className="dialog-header">
          <h2>Information</h2>
          <button
            type="button"
            className="btn square"
            onClick={() => dialogRef.current?.close()}
            aria-label="Fermer"
            title="Fermer">
            <IconClose />
          </button>
        </div>

        {lang === "fr"
          ? qsFR.map((q) => (
              <section key={q.q}>
                <h3>{q.q}</h3>
                <p>{q.a}</p>
              </section>
            ))
          : qsEN.map((q) => (
              <section key={q.q}>
                <h3>{q.q}</h3>
                <p>{q.a}</p>
              </section>
            ))}
      </dialog>
    </>
  );
}

const qsFR = [
  {
    q: "Qu'est-ce Emerald?",
    a: "Emerald est une application de suivi local-first, optimisée pour gérer le progrès des Avis de recherche sur Dofus.",
  },
  {
    q: "Que veux dire 'local-first'?",
    a: "L'application sauvegarde votre progression localement, à l'aide du system 'IndexedDB' de votre navigateur. Votre base de donnée se synchronise périodiquement avec les informations du serveur afin de mettre a jour les données des recherchés en cas de changements.",
  },
  {
    q: "Est-ce que Emerald sauvegarde mes données?",
    a: "Aucune de vos données ne sont envoyées à Emerald. Votre progression est stockée sur votre ordinateur uniquement.",
  },
];

const qsEN = [
  {
    q: "What is Emerald?",
    a: "Emerald is a local-first tracking application optimized for managing the progress of Bounties on Dofus.",
  },
  {
    q: "What does 'local-first' mean?",
    a: "The application saves your progress locally, using the 'IndexedDB' system of your browser. Your database periodically synchronizes with server to update bounty data in case of changes.",
  },
  {
    q: "Does Emerald save my data?",
    a: "None of your data is sent to Emerald. Your progress is stored on your computer only.",
  },
];
