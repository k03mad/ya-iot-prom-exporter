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
        'groups',
        'deviceName',
        'deviceType',
        'stateType',
        'stateInstance',
    ],

    async collect() {
        const {devices} = await IoT.userInfo();

        await Promise.all(devices.map(async device => {
            const [householdName, roomName, groupsNames] = await Promise.all([
                IoT.getHouseholdNameById(device.household_id),
                IoT.getRoomNameById(device.room),
                IoT.getGroupsNamesByIds(device.groups),
            ]);

            const save = ['capabilities', 'properties'];

            save.forEach(stateType => {
                device[stateType].forEach(data => {
                    if (data.state?.instance) {
                        const value = getNumIfBool(data.state.value);

                        if (typeof value === 'number') {
                            this.labels(
                                householdName,
                                roomName,
                                groupsNames,
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
});
