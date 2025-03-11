
const getColors = require('get-image-colors');
const getDominantColor = async (imageUrl) => {
  if (!imageUrl) {
    throw new Error('Image URL is required');
  }
  console.log('Image URL: ' + imageUrl);
  const colors = await getColors(imageUrl);
  if (colors.length === 0) {
    throw new Error('No colors found in the image');
  }
  // Sort colors by percentage
  colors.sort((a, b) => b.percent - a.percent);
  const responseColors = colors.map(color => ({
    hex: color.hex(),
    percentage: color.percent,
  }));
  let gradientBackground = '';
  if (colors.length >= 2) {
    // Create a gradient from the top two colors
    const topTwoColors = colors.slice(0, 2).map(color => color.hex());
    gradientBackground = `linear-gradient(45deg, ${topTwoColors.join(', ')})`;
  }

  // Prepare the response
  return {
    dominantColor: colors[0].hex(),
    dominantColorPercentage: colors[0].percent,
    colors: responseColors,
    background: gradientBackground,
  };
};

// Export the function for use in other parts of the application
module.exports = { getDominantColor };
