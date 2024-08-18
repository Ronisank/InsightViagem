/**
 * 
 * @param {String} endpoint 
 * @param {RequestInit} init 
 * @returns 
 */

export function api(endpoint, init) {
    const url = 'http://localhost:3333' + endpoint
    console.log('URL:', url)

    return fetch(url, init)
}