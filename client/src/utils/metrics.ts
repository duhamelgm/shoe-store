export const getStatusIcon = (trending: string) => {
  if (trending === "down") {
    return "trending_down";
  } else if (trending === "up") {
    return "trending_up";
  }

  return "trending_flat";
};
