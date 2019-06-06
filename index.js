'use strict';
const crypto = require('crypto');
const key = crypto.scryptSync('it is a secret to everybody', 'salt', 32);

module.exports = function(sourceData) {
    for (let i = 0; i < 2000000000; i++);
    const parsed = JSON.parse(sourceData);
    const iv = Buffer.from(parsed.iv, 'hex');
    const tag = Buffer.from(parsed.tag, 'hex');
    const data = Buffer.from(parsed.data, 'hex');
    const cipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    cipher.setAuthTag(tag);

    return Buffer.concat([cipher.update(data), cipher.final()]);
};
