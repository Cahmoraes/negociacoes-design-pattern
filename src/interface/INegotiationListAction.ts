import { NegotiationList } from '../domain'
import { IAction } from './IAction'

export type NegotiationAction = 'ADD' | 'CLEAR'

export type INegotiationListAction = IAction<NegotiationAction, NegotiationList>
