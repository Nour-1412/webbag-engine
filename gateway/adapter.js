import { WebBagProviders } from "./providers.js";

export async function runProvider(file) {

    const provider = WebBagProviders.get("background");

    if (!provider || !provider.enabled) {

        return {

            success: false,

            message: "لا يوجد محرك مفعل."

        };

    }

    return {

        success: true,

        provider: provider.name,

        endpoint: provider.endpoint,

        image: null

    };

}
