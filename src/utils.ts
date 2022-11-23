async function publishToAbly(channel: string, data: any, key: string) {
  try {
    const URL = `https://rest.ably.io/channels/${channel}/messages?key=${key}`

    const body = JSON.stringify({ data })
    if (body.length > 15000) throw new Error("Liian pitkä teksti palvelimelle")

    await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
    return true
  } catch (error) {
    console.log(error, "ABLY ERROR")
    return false
  }
}

export { publishToAbly }
