import { precompileTemplate } from '@ember/template-compilation';


export default precompileTemplate(`
    <h2>About</h2>
    <p>Ember Application, powered by Vite</p>
    <LinkTo @route="main">Home</LinkTo>

`);