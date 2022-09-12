import './style.css'
import { makeServer } from './util/server'
import { NegotiationController } from './controllers/NegotiationController'

makeServer()
new NegotiationController()
