import { useRef } from "react";
import { IconQuestionMark } from "@/_components/Icons";

export function InfoButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Popover API?

  return (
    <>
      <button type="button" className="question-mark" onClick={() => dialogRef.current?.showModal()}>
        <IconQuestionMark />
      </button>
      <dialog id="faq-dialog" ref={dialogRef}>
        <h2>Information</h2>
        <p>
          Emerald est une application de suivi local-first, optimisée pour gérer le progrès des Avis de recherche dans
          Dofus.
        </p>
      </dialog>
    </>
  );
}
