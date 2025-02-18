import { generateImage } from "./image.js";

export async function imageController(req, res) {
  const { image } = req.body;

  if (!image || !image.startsWith("http")) {
    return res.status(400).send({ error: "Invalid image URL" });
  }
  try {
    console.log("Processing image:", image);

    const processedImageUrl = await generateImage(image);

    res.status(201).send({ processedImageUrl });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error processing image", details: error.message });
  }
}
