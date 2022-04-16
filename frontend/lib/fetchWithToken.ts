const fetchWithToken = async (input: RequestInfo, init?: RequestInit) => {
  const token = await fetch("/api/token").then((res) => res.json());

  return fetch(input, {
    ...init,
    headers: new Headers({
      ...init?.headers,
      Authorization: "Bearer " + token.access_token,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  }).then((res) => res.json());
};

export default fetchWithToken;
