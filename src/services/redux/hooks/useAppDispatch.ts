import { useDispatch } from "react-redux";

import { DispatchTyped } from "..";

/**
 * @category Redux Hooks
 *
 * @description
 * Типизированный хук для доступа к dispatch-функции Redux-стора.
 * Является обёрткой над стандартным `useDispatch` с предустановленным типом dispatch из стора.
 *
 * @template DispatchTyped - Тип dispatch-функции, автоматически определяемый из store.
 * @returns {DispatchTyped} Типизированная dispatch-функция Redux-стора.
 *
 * @example
 * // Использование в компоненте:
 * const dispatch = useAppDispatch();
 *
 * // Диспатч экшена с автодополнением типов:
 * dispatch(someActionCreator(payload));
 *
 * @warning Требует предварительной правильной типизации Redux-стора.
 * @throws {TypeError} Если store не типизирован должным образом.
 *
 * @remarks
 * 1. Избегает необходимости ручного указания типа при каждом использовании `useDispatch`.
 * 2. Гарантирует типобезопасность экшенов и payload.
 * 3. Требует предварительно правильно типизированного Redux-стора.
 *
 * @see {@link https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type | Redux Toolkit TypeScript Docs}
 */

export const useAppDispatch = () => useDispatch<DispatchTyped>();
