import Replicate from "replicate";
import "dotenv/config";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateImage(imageUrl) {
  const output = await replicate.run(
    "pollinations/modnet:da7d45f3b836795f945f221fc0b01a6d3ab7f5e163f13208948ad436001e2255",
    {
      input: {
        image: imageUrl,
      },
    }
  );

  const outputStream = output;

  const imageBlob = await outputStream.blob();
  const imageBuffer = await imageBlob.arrayBuffer();
  const image2 = Buffer.from(imageBuffer);

  console.log(output);
  console.log(imageBlob);
  console.log(imageBuffer);
  console.log(image2);
  return image2;
}
