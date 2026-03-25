export async function getChildren() {

  const response = await fetch(
    "http://localhost:8080/api/parent/children",
    {
      method: "GET",
      credentials: "include"
    }
  )

  if (!response.ok) {
    throw new Error("failed to fetch children")
  }

  return await response.json()
}