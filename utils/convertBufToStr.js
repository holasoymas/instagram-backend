/**
 * Converts an image buffer to a data URI.
 * @param {Buffer} buffer - The image buffer.
 * @param {string} mimetype - The MIME type of the image.
 * @returns {string} The data URI of the image.
 */

export const convertBufToStr = (buffer, mimetype) => {
  const base64 = buffer.toString('base64');
  return `data:${mimetype};base64,${base64}`;
};

