/* eslint-disable unicorn/filename-case */

import IoT from '../api/iot.js';
import {getNumIfBool} from '../helpers/bool.js';
import {getCurrentFilename} from '../helpers/paths.js';

export default {
    name: getCurrentFilename(import.meta.url),
    help: 'Scenarios',
    labelNames: ['name'],

    async collect(ctx) {
        ctx.reset();

        const {scenarios} = await IoT.userInfo();

        scenarios.forEach(scenario => {
            const value = getNumIfBool(scenario.is_active);

            if (typeof value === 'number') {
                ctx.labels(scenario.name).set(value);
            }
        });
    },
};
