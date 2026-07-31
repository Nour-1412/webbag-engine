/**
 * WebBag AI Gateway
 * إدارة جميع محركات الذكاء الاصطناعي
 */

export const WebBagProviders = {

    active: "background",

    providers: {

        background: {

            name: "Background Engine",

            enabled: true,

            endpoint: "/api/remove-background"

        }

    },

    get(name) {

        return this.providers[name];

    }

};

