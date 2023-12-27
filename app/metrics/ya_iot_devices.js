/* eslint-disable unicorn/filename-case */

import IoT from '../api/iot.js';
import {getNumIfBool} from '../helpers/bool.js';
import {getCurrentFilename} from '../helpers/paths.js';

export default {
    name: getCurrentFilename(import.meta.url),
    help: 'Devices',
    labelNames: [
        'household',
        'room',
        'deviceName',
        'deviceType',
        'stateType',
        'stateInstance',
    ],

    async collect(ctx) {
        ctx.reset();

        const {devices} = await IoT.userInfo();

        await Promise.all(devices.map(async device => {
            const [householdName, roomName] = await Promise.all([
                IoT.getHouseholdNameById(device.household_id),
                IoT.getRoomNameById(device.room),
            ]);

            const save = ['capabilities', 'properties'];

            save.forEach(stateType => {
                device[stateType].forEach(data => {
                    if (data.state?.instance) {
                        const value = getNumIfBool(data.state.value);

                        if (typeof value === 'number') {
                            ctx.labels(
                                householdName,
                                roomName,
                                device.name,
                                device.type,
                                stateType,
                                data.state.instance,
                            ).set(value);
                        }
                    }
                });
            });
        }));
    },
};
