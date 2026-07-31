const SEGMIND_API =
"https://api.segmind.com/v1/remove-background";

export async function runProvider(imageBuffer) {

    const apiKey = process.env.SEGMIND_API_KEY;

    if (!apiKey) {

        throw new Error("Segmind API Key غير موجود.");

    }

    return {

        endpoint: SEGMIND_API,

        apiKey,

        imageBuffer

    };

}
