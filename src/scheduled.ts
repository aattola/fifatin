import { isPast, differenceInSeconds, add, getUnixTime } from "date-fns"
import { gamesToday } from "./fifa"
import { Bindings } from "./types/general"
import { publishToAbly } from "./utils"

async function scheduled(
  event: ScheduledEvent,
  env: Bindings,
  ctx: { waitUntil: (promise: Promise<any>) => Promise<void> }
) {
  console.log("==============================")
  const data = await gamesToday()
  await env.data.put("games", JSON.stringify(data))

  let ohi: string[] = JSON.parse((await env.data.get("ohi")) || "[]")
  let aloitus: string[] = JSON.parse((await env.data.get("aloitus")) || "[]")

  data.Results.forEach(async (game) => {
    const date = add(new Date(game.Date), { hours: 0 })
    const startTimestamp = getUnixTime(date)
    const past = isPast(date)

    if (past) {
      if (game.MatchStatus !== 0)
        return console.log("match status !== nolla (eli peli meneillään)")

      if (ohi.includes(game.IdMatch))
        return console.log("ilmoitettu jo ohi", game.IdMatch)

      console.log("peli ohi")
      ohi = [...ohi, game.IdMatch]
      env.data.put("ohi", JSON.stringify(ohi))
      return publishToAbly(
        "peliOhi",
        {
          id: game.IdMatch,
          home: game.Home?.ShortClubName,
          away: game.Away?.ShortClubName,
          homeId: game.Home?.IdTeam,
          awayId: game.Away?.IdTeam,
          homeScore: game.Home?.Score,
          awayScore: game.Away?.Score,
        },
        env.ABLY_KEY
      )
    }
    // ei ole vielä pelattu

    if (game.MatchStatus === 0) return console.log("peli on pelattu jo")

    const seconds = differenceInSeconds(date, new Date())
    console.log(seconds, "seconds", date, new Date())

    if (seconds < 90) {
      if (aloitus.includes(game.IdMatch))
        return console.log("ilmoitettu jo alkaminen", game.IdMatch)

      const endDate = add(date, { minutes: 15 })

      aloitus = [...aloitus, game.IdMatch]
      env.data.put("aloitus", JSON.stringify(aloitus))
      return publishToAbly(
        "peliAlkaa",
        {
          id: game.IdMatch,
          timestamp: startTimestamp,
          voteEnds: getUnixTime(endDate),
          home: game.Home?.ShortClubName,
          away: game.Away?.ShortClubName,
          homeId: game.Home?.IdTeam,
          awayId: game.Away?.IdTeam,
        },
        env.ABLY_KEY
      )
    }

    console.log("Tulossa vielä tänään", game.IdMatch)

    return null
  })

  const sent = publishToAbly("valmis", { name: "hei" }, env.ABLY_KEY)
  ctx.waitUntil(sent)
}

export { scheduled }
