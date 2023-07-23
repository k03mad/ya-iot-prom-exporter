/**
 * @param {boolean} elem
 * @returns {any}
 */
export const getNumIfBool = elem => {
    const values = {
        true: 1,
        false: 0,
    };

    return values[elem] ?? elem;
};
