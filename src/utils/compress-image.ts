// utils/compressImage.ts
// Compresses and resizes an image file in the browser before uploading to Supabase.
// Uses the native Canvas API — no extra libraries needed.
//
// Usage in your review form:
//   const compressed = await compressImage(file);
//   // then upload `compressed` to Supabase instead of the original `file`

export async function compressImage(
  file: File,
  options: {
    maxWidthOrHeight?: number; // max px for width or height (default: 200)
    quality?: number; // 0.0 – 1.0 JPEG quality (default: 0.8)
    outputType?: string; // mime type output (default: "image/jpeg")
  } = {},
): Promise<File> {
  const {
    maxWidthOrHeight = 200,
    quality = 0.8,
    outputType = "image/jpeg",
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Calculate new dimensions while keeping aspect ratio
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidthOrHeight) {
          height = Math.round((height * maxWidthOrHeight) / width);
          width = maxWidthOrHeight;
        }
      } else {
        if (height > maxWidthOrHeight) {
          width = Math.round((width * maxWidthOrHeight) / height);
          height = maxWidthOrHeight;
        }
      }

      // Draw resized image to canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context unavailable"));

      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to Blob then to File
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Canvas toBlob failed"));

          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, ".jpg"), // rename extension to .jpg
            { type: outputType },
          );

          console.log(
            `Image compressed: ${(file.size / 1024).toFixed(1)}KB → ${(
              compressedFile.size / 1024
            ).toFixed(1)}KB`,
          );

          resolve(compressedFile);
        },
        outputType,
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}
