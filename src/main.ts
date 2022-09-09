import './style.css'
import { NegotiationController } from './controllers/NegotiationController'

const controller = new NegotiationController()
const form = document.forms[0]

form.addEventListener('submit', (event) => {
  event.preventDefault()
  controller.add()
})
