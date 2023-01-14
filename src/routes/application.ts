import Route from '@ember/routing/route';
import { service } from '@ember/service';
import translations from 'ember-intl/translations';

export class ApplicationRoute extends Route {
  @service session;
  @service intl;

  async beforeModel() {
    await this.session.setup();

    const response = await fetch('/translations/en-us.json');
    const en = await response.json();

    translations.push(['en-us', en]);

    for (const [locale, translation] of translations) {
      this.intl.addTranslations(locale, translation);
    }
  }

  model() {
    return ['red', 'yellow', 'blue'];
  }
}
