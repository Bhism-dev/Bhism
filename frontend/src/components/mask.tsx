import type {MaskitoOptions} from '@maskito/core';
import {maskitoAddOnFocusPlugin, maskitoRemoveOnBlurPlugin} from '@maskito/kit';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {getCountryCallingCode} from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/min/metadata';

const countryIsoCode = 'IN';
const code = getCountryCallingCode(countryIsoCode, metadata);
const prefix = `+${code} `;

const phoneOptions = maskitoPhoneOptionsGenerator({
    metadata,
    countryIsoCode,
    strict: true,
});

export default {
    ...phoneOptions,
    plugins: [
        ...phoneOptions.plugins,
        maskitoAddOnFocusPlugin(prefix),
        maskitoRemoveOnBlurPlugin(prefix),
    ],
} as MaskitoOptions;
