import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

// https://stenciljs.com/docs/config

export const config: Config = {
    plugins: [
        sass()
    ],
    outputTargets: [
        {
            type: 'www',
            serviceWorker: {
                swSrc: 'src/sw.js'
            },
            prerenderLocations: [
                { path: '/chat' },
            ]
        }
    ],
    globalScript: 'src/global/app.ts',
    globalStyle: 'src/global/app.css'
};
