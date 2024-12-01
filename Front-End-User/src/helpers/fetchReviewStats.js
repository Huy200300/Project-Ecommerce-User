const fetchReviewStats = async (productId) => {
  const response = await fetch(
    `https://backend-ecommerce-mobile.vercel.app/api/reviews/stats/${productId}`
  );
  const data = await response.json();
  if (data.success) {
    return {
      reviewCount: data.reviewCount,
      averageRating: data.averageRating,
    };
  } else {
    return { reviewCount: 0, averageRating: 0 };
  }
};

export default fetchReviewStats;
