import { useBirthdayViewModel } from "../viewmodels/useBirthdayViewModel";
import { Header } from "./Header";
import { StartScreen } from "./StartScreen";
import { DialogueScreen } from "./DialogueScreen";
import { EndScreen } from "./EndScreen";
import { Modal } from "./Modal";

export function BirthdayPage() {
  const vm = useBirthdayViewModel();

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-bg-base font-sans text-text-primary">
      <Header isDark={vm.isDark} toggleTheme={vm.toggleTheme} langLabel={vm.langLabel} cycleLang={vm.cycleLang} aria={vm.t.aria} />

      {vm.screen === "start" && <StartScreen t={vm.t} begin={vm.begin} />}
      {vm.screen === "dialogue" && <DialogueScreen items={vm.items} />}
      {vm.screen === "end" && <EndScreen t={vm.t} openModal={vm.openModal} scrollTop={vm.scrollTop} />}

      <Modal
        open={vm.modalOpen}
        quote={vm.t.modalQuote}
        sign={vm.t.modalSign}
        ariaLabel={vm.t.aria.bonus}
        closeLabel={vm.t.aria.close}
        onClose={vm.closeModal}
      />
    </div>
  );
}
