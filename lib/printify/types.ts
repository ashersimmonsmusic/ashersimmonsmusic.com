export type PrintifyProduct = {
  id: string;
  title: string;
  imageUrl: string;
  /** Formatted with currency symbol, e.g. "£24.00". Omitted if no enabled variant has a price. */
  price?: string;
};
