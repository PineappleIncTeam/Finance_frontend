import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "..";

/**
 * @category Redux Hooks
 *
 * @description
 * Типизированная версия хука `useSelector` для Redux, привязанная к типу состояния вашего хранилища.
 * Обеспечивает типобезопасность при выборке данных из Redux-стора.
 *
 * @template RootState - Тип всего состояния Redux, автоматически определяемый из вашего хранилища.
 * @returns {TypedUseSelectorHook<RootState>} Типизированный хук useSelector.
 *
 * @example
 * // Базовое использование:
 * const counter = useAppSelector(state => state.counter.value);
 *
 * // С memoized селектором:
 * const userData = useAppSelector(selectCurrentUser);
 *
 * @remarks
 * 1. Избегает необходимости ручного указания `RootState` при каждом использовании.
 * 2. Гарантирует правильную типизацию возвращаемого значения селектора.
 * 3. Поддерживает как inline-селекторы, так и мемоизированные через `createSelector`.
 *
 * @see {@link https://redux-toolkit.js.org/usage/usage-with-typescript | Redux Toolkit Typed Hooks}
 */

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
