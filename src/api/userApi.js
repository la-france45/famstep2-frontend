export async function updatePoint(userId, point) {
  const response = await fetch(
    `http://localhost:8080/api/users/${userId}/point`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        point: Number(point), // 👈 DTOに合わせる
      }),
    }
  );

  if (!response.ok) {
    throw new Error("failed to update point");
  }
}

export async function updateGoal(userId, goalPoint) {
  const response = await fetch(
    `http://localhost:8080/api/users/${userId}/goal`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        goalPoint: Number(goalPoint), // 👈 DTOに合わせる
      }),
    }
  );

  if (!response.ok) {
    throw new Error("failed to update goal");
  }
}

export async function resetPoint(userId) {
  const response = await fetch(
    `http://localhost:8080/api/users/${userId}/point/reset`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("failed to reset point");
  }
}