import { NegotiationList } from '../domain'
import { IAction } from './IAction'

export type NegotiationAction = 'ADD' | 'CLEAR' | 'IMPORT' | 'DELETE'

export type INegotiationListAction = IAction<NegotiationAction, NegotiationList>
