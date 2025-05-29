const apiURL = "http://localhost:8088/teeTimeInvites"

export const createInvite = (inviteObj) => {
  return fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inviteObj)
  }).then(res => res.json())
}

export const updateInviteStatus = (inviteId, status) => {
  return fetch(`${apiURL}/${inviteId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  })
}

export const getAllInvites = () => {
  return fetch("http://localhost:8088/teeTimeInvites").then(res => res.json())
}

export const getPendingInvitesByUser = async (userId) => {
  // Fetch invites with teeTime and senderUser expanded
  const invitesRes = await fetch(
    `http://localhost:8088/teeTimeInvites?inviteeUserId=${userId}&status=pending&_expand=teeTime&_expand=senderUser`
  );
  const invites = await invitesRes.json();

  // Fetch all courses
  const coursesRes = await fetch("http://localhost:8088/courses");
  const courses = await coursesRes.json();

  // Map course name and sender name into each invite
  return invites.map(invite => {
    const course = courses.find(c => c.id === invite.teeTime?.courseId);
    return {
      ...invite,
      senderName: invite.senderUser?.name,
      courseName: course?.name,
      date: invite.teeTime?.time
    };
  });
};