import {requestCache} from '@k03mad/request';

import env from '../../env.js';
import {convertToArray} from '../helpers/array.js';

/** */
class IoT {

    constructor() {
        this.urls = {
            api: 'https://api.iot.yandex.net/v1.0/',
        };

        this.options = {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${env.iot.token}`,
            },
        };
    }

    /**
     * @param {object} opts
     * @param {string} opts.path
     * @param {string} [opts.url]
     * @param {object} [opts.options]
     * @returns {Promise<object>}
     */
    async _getCache({options = {}, path, url = this.urls.api}) {
        const {body} = await requestCache(url + path, {
            ...this.options,
            ...options,
        }, {expire: 10});

        return body;
    }

    /**
     * @returns {Promise<object>}
     */
    userInfo() {
        return this._getCache({path: 'user/info'});
    }

    /**
     * @param {string} id
     * @returns {Promise<string>}
     */
    async getHouseholdNameById(id) {
        const {households} = await this.userInfo();
        return households.find(household => household.id === id).name;
    }

    /**
     * @param {string} id
     * @returns {Promise<string>}
     */
    async getRoomNameById(id) {
        const {rooms} = await this.userInfo();
        return rooms.find(room => room.id === id).name;
    }

    /**
     * @param {string|string[]} ids
     * @returns {Promise<string>}
     */
    async getGroupsNamesByIds(ids) {
        const {groups} = await this.userInfo();
        return convertToArray(ids).map(id => groups.find(group => group.id === id)?.name).join(' + ');
    }

}
export default new IoT();
