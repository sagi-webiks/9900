import { InteractionMode } from "@/types";
import { atom, useAtom } from "jotai";

export interface DialogState<T = unknown> {
  dialogName: string | null;
  open: boolean;
  mode: InteractionMode;
  data?: T;
}

export const dialogStateAtom = atom<DialogState>({
  dialogName: null,
  open: false,
  mode: InteractionMode.None,
  data: undefined,
});

export function useDialog<T = unknown>() {
  const [dialogState, setDialogState] = useAtom(dialogStateAtom);

  const openDialog = (dialogName: string, mode: InteractionMode = InteractionMode.View, data?: T) => {
    setDialogState({ dialogName, open: true, mode, data });
  };

  const closeDialog = () => {
    setDialogState({
      dialogName: null,
      open: false,
      mode: InteractionMode.None,
      data: undefined,
    });
  };

  return {
    openDialog,
    closeDialog,
    dialogState: dialogState as DialogState<T>,
  };
}
