import { resetMessage } from "../slices/photoSlice";
import { AppDispatch } from "../store";

export const useResetComponetMessage = (dispatch: AppDispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};
