import { EngineStatus } from "../gateway/status.js";
import { WebBagProviders } from "../gateway/providers.js";

export default async function handler(req, res) {

    if (!EngineStatus.ready()) {

        return res.status(503).json({
            success: false,
            message: "WebBag Engine غير جاهز."
        });

    }

    const provider = WebBagProviders.get("background");

    return res.status(200).json({

        success: true,

        provider: provider.name,

        version: EngineStatus.version,

        message: "Gateway متصل بنجاح."

    });

}
