import { runProvider } from "../gateway/adapter.js";

export default async function handler(req, res) {

    try {

        const imageBuffer = null;

        const provider = await runProvider(imageBuffer);

        return res.status(200).json({

            success: true,

            provider: provider.endpoint,

            message: "WebBag AI Gateway يعمل بنجاح."

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

}
