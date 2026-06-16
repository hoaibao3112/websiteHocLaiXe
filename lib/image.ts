/**
 * Compress an image on the client side using HTML5 Canvas
 * to optimize file size before uploading to the server.
 */
export async function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.75
): Promise<File> {
  // Return original file if not running in a browser environment or not an image
  if (typeof window === "undefined" || !file.type.startsWith("image/")) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions keeping the aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(file);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP for modern, lightweight storage
        const targetType = "image/webp";
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file);
            }
            const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf("."));
            const newName = `${nameWithoutExt || "image"}.webp`;
            const compressedFile = new File([blob], newName, {
              type: targetType,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          targetType,
          quality
        );
      };
      img.onerror = () => {
        resolve(file); // fallback to original file on image load error
      };
    };
    reader.onerror = () => {
      resolve(file); // fallback to original file on read error
    };
  });
}
