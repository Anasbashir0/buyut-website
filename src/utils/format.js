export const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, "")}`;

export const currentYear = () => new Date().getFullYear();
