import { NegotiationList } from '../domain'
import { IAction } from '.'

export enum INegotiationTypes {
  'ADD' = 'ADD',
  'CLEAR' = 'CLEAR',
  'IMPORT' = 'IMPORT',
  'DELETE' = 'DELETE',
  'LOAD' = 'LOAD',
  'DUPLICATED' = 'DUPLICATED',
}

export type INegotiationAction =
  | INegotiationTypes.ADD
  | INegotiationTypes.CLEAR
  | INegotiationTypes.IMPORT
  | INegotiationTypes.DELETE
  | INegotiationTypes.LOAD
  | INegotiationTypes.DUPLICATED

export type INegotiationListAction = IAction<
  INegotiationAction,
  NegotiationList
>
