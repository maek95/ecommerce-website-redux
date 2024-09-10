export async function getAllProducts() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
   
    return data; // return fetched data
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return []; // empty array if failed fetch
  }
}


export async function getAndCleanAllProducts() {
  const fetchedProducts = await getAllProducts();
  const cleanedProducts = fetchedProducts.map((product) => ({
    ...product,
    images: product.images.map(cleanImageUrl),
  }));
  return cleanedProducts;
}

// Utility function to clean the URL
function cleanImageUrl(url) {
  if (!url) return ""; // Return an empty string if the URL is not provided

  // First, remove any unwanted characters like brackets and quotes
  let cleanedUrl = url.replace(/[\[\]"']/g, "");

  // Decode the URL if it contains encoded characters (e.g., %22)
  cleanedUrl = decodeURIComponent(cleanedUrl);

  return cleanedUrl;
}