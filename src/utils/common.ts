export function capitalize(text: string) {
  if (!text) {
    return "";
  }

  return text[0].toUpperCase() + text.slice(1);
}

export function unbeautifyText(text: string) {
  return text
    .split(" ")
    .map((x) => x.toLowerCase())
    .join("-");
}

export function beautifyText(text: string) {
  return text
    .split("-")
    .map((x) => capitalize(x))
    .join(" ");
}

export function fetchMultipleApiUrl(urls: Array<string>) {
  return Promise.allSettled(
    urls.map(async (url) => {
      try {
        const response = await fetch(url);
        return response.json();
      } catch (err) {
        return {};
      }
    })
  );
}
