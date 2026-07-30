export default async function handler(req, res) {

  res.status(200).json({

    success: true,

    message: "WebBag Engine يعمل بنجاح 🚀",

    version: "1.0.0"

  });

}

