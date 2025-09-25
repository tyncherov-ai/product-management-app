export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  else {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  }
};

export const formatPrice = (price?: number) =>
  typeof price === "number"
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
    : "N/A";
