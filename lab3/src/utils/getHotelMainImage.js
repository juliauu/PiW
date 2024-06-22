export const getHotelMainImage = (hotelId) => {
  try {
    const imagePath = require(`../Assets/cards${hotelId}.jpg`);
    return imagePath;
  } catch (error) {
    console.error(`Image not found for hotelId: ${hotelId}`);
    return null;
  }
};
