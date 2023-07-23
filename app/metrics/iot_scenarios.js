import client from 'prom-client';

import IoT from '../api/iot.js';
import {getNumIfBool} from '../helpers/bool.js';
import {getCurrentFilename} from '../helpers/paths.js';

export default new client.Gauge({
    name: getCurrentFilename(import.meta.url),
    help: 'Scenarios',
    labelNames: ['name'],

    async collect() {
        const {scenarios} = await IoT.userInfo();

        scenarios.forEach(scenario => {
            const value = getNumIfBool(scenario.is_active);

            if (typeof value === 'number') {
                this.labels(scenario.name).set(value);
            }
        });
    },
});
