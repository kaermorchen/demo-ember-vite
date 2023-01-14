/* imported routes */
import { ApplicationRoute } from '../routes/application';
// import { MainRoute } from '../routes/main';

/* imported controllers */
import { ApplicationController } from '../controllers/application';

/* imported templates */
import ApplicationTemplate from '../templates/application';
import AboutTemplate from '../templates/about';

/* imported services */
import DateService from '../services/date';

/* imported components */
import HelloWorld from '../components/HelloWorld';
import Button from '../components/Button';

/* imported helpers */
import MemoryUsage from '../helpers/memory-usage';

/* imported modifiers */
import ClickTracker from '../modifiers/click-tracker';

import { IRegistry } from './utils';

import addonsRegistry from './../addons';

function registry(): IRegistry {
  return {
    ...addonsRegistry,
    'service:date': DateService,
    'controller:application': ApplicationController,
    'route:application': ApplicationRoute,
    'template:application': ApplicationTemplate,
    'template:about': AboutTemplate,
    'component:hello-world': HelloWorld,
    'component:button': Button,
    'helper:ensure-safe-component': function(a) {
      return a;
    },
    'helper:macroCondition': function(a) {
      if (a === 'isNotBS5') {
        return false;
      }
      console.log('macroCondition', a);
      return a;
    },
    'helper:macroGetOwnConfig': function(a) {
      console.log('macroGetOwnConfig', a);
      return a;
    },
    'helper:memory-usage': MemoryUsage,
    'modifier:click-tracker': ClickTracker,
  };
}

export default registry;
