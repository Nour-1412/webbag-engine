export default async function handler(req, res) {
  try {
    const apiKey = process.env.SEGMIND_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Segmind API Key غير موجود."
      });
    }

    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "استخدم POST فقط."
      });
    }

    return res.status(200).json({
      success: true,
      message: "🎉 تم العثور على مفتاح Segmind بنجاح.",
      keyExists: true
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
