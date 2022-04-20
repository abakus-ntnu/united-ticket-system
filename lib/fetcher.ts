const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  return fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export default fetcher;
