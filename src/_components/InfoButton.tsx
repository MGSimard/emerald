import { useRef } from "react";
import { IconQuestionMark, IconClose } from "@/_components/Icons";

export function InfoButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Popover API?

  return (
    <>
      <button type="button" className="question-mark" onClick={() => dialogRef.current?.showModal()}>
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

        {qs.map((q) => (
          <section>
            <h3> {q.q} </h3>
            <p>{q.a}</p>
          </section>
        ))}
      </dialog>
    </>
  );
}

const qs = [
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
