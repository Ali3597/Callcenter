import { useCallback, useState } from "react";

export function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  return [state, useCallback(() => setState((state) => !state))];
}
