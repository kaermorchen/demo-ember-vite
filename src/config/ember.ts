import Ember from 'ember';
import { cached } from 'tracked-toolbox';

// @ts-expect-error - Ember._tracked is not exported
const tracked = Ember['_tracked'];

export { tracked, cached };
export default Ember;
