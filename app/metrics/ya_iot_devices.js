import client from 'prom-client';

import IoT from '../api/iot.js';
import {getNumIfBool} from '../helpers/bool.js';
import {getCurrentFilename} from '../helpers/paths.js';

export default new client.Gauge({
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

    async collect() {
        const {devices} = await IoT.userInfo();
        const data = [];

        await Promise.all(devices.map(async device => {
            const [householdName, roomName] = await Promise.all([
                IoT.getHouseholdNameById(device.household_id),
                IoT.getRoomNameById(device.room),
            ]);

            const save = ['capabilities', 'properties'];

            save.forEach(stateType => {
                device[stateType].forEach(elem => {
                    if (elem.state?.instance) {
                        const value = getNumIfBool(elem.state.value);

                        if (typeof value === 'number') {
                            data.push({
                                labels: [
                                    householdName,
                                    roomName,
                                    device.name,
                                    device.type,
                                    stateType,
                                    elem.state.instance,
                                ],
                                value,
                            });
                        }
                    }
                });
            });
        }));

        data
            .sort((a, b) => a.labels.join().localeCompare(b.labels.join()))
            .forEach(elem => this.labels(...elem.labels).set(elem.value));
    },
});
