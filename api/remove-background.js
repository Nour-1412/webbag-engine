export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "استخدم POST فقط."
    });
  }

  const apiKey = process.env.SEGMIND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: "Segmind API Key غير موجود."
    });
  }

  return res.status(200).json({
    success: true,
    message: "جاهز لاستقبال الصورة."
  });
}
