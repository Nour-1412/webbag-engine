/**
 * WebBag Engine Status
 */

export const EngineStatus = {

    online: true,

    version: "1.0.0",

    provider: "Background Engine",

    ready() {

        return this.online;

    }

};
