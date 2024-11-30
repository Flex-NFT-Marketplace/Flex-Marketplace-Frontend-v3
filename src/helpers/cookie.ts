export const getCookie = (key: string) => {
  const match =
    typeof window !== "undefined"
      ? document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`))
      : undefined;
  return match?.[2];
};

export const setCookie = ({
  expires,
  key,
  value,
}: {
  expires?: string | number | Date;
  key: string;
  value: string;
}) => {
  document.cookie = `${key}=${value}; expires=${expires}; path=/`;
  return key;
};

export const deleteCookie = (key: string) => {
  document.cookie = `${key}=; expires=${new Date(0).toUTCString()}; path=/`;
  return key;
};
