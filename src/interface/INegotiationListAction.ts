import { NegotiationList } from '../domain'
import { IAction } from './IAction'

export type INegotiationAction =
  | 'ADD'
  | 'CLEAR'
  | 'IMPORT'
  | 'DELETE'
  | 'LOAD'
  | 'DUPLICATED'

export type INegotiationListAction = IAction<
  INegotiationAction,
  NegotiationList
>
