import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const target = document.getElementById('app')

if (!target) {
  throw new Error('Elemento raiz #app não foi encontrado.')
}

const app = mount(App, {
  target
})

export default app
