/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReviewContent } from "../types/review";

function convertToContentArray(
  comment: string,
  images: any[]
): ReviewContent[] {
  const result: ReviewContent[] = [];

  if (comment) {
    result.push({ type: "text", content: comment });
  }

  if (images) {
    images.forEach((img) => {
      if (img.thumbUrl) {
        result.push({ type: "image", content: img.thumbUrl });
      }
    });
  }

  return result;
}
export default convertToContentArray;
