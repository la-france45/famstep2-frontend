export async function login(name, password) {
  const response = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("login failed");
  }

  return await response.json();
}

export async function getMe() {
  const response = await fetch("http://localhost:8080/api/me", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("not authenticated");
  }

  return await response.json();
}

export async function logout() {
  await fetch("http://localhost:8080/api/logout", {
    method: "POST",
    credentials: "include",
  });
}
