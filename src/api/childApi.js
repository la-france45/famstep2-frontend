// src/api/childApi.js

export async function getChildTop() {

  const response = await fetch(
    "http://localhost:8080/api/child/me",
    {
      method: "GET",
      credentials: "include"
    }
  )

  if (!response.ok) {
    throw new Error("failed to fetch child top")
  }

  return await response.json()
}