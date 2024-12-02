import SummaryAip from "../common";

const fetchReviewStats = async (productId) => {
  const response = await fetch(`${SummaryAip.review_stats.url}/${productId}`);
  const data = await response?.json();
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
