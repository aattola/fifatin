import { isPast, differenceInSeconds, add, getUnixTime } from "date-fns"
import { gamesToday } from "./fifa"
import { Logger } from "./log"
import { Bindings } from "./types/general"
import { publishToAbly } from "./utils"

async function scheduled(
  event: ScheduledEvent,
  env: Bindings,
  ctx: { waitUntil: (promise: Promise<any>) => Promise<void> }
) {
  const logger = new Logger(env.LOGTAIL)

  logger.info("Scheduled event", { timestamp: event.timeStamp })
  const data = await gamesToday()
  await env.data.put("games", JSON.stringify(data))

  data.Results.forEach(async (game) => {
    const date = add(new Date(game.Date), { hours: 0 })
    const startTimestamp = getUnixTime(date)
    const past = isPast(date)

    if (past) {
      if (game.MatchStatus !== 0)
        return logger.info("match status !== nolla (eli peli meneillään)")

      let ohi: string[] = JSON.parse((await env.data.get("ohi")) || "[]")
      if (ohi.includes(game.IdMatch))
        return logger.info("ilmoitettu jo ohi", { id: game.IdMatch })

      const found = ohi.filter((a) => a === game.IdMatch)
      if (found.length !== 0)
        return logger.info("ilmoitettu jo ohi (filter)", { id: game.IdMatch })

      logger.info("peli ohi " + ohi)
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

    if (game.MatchStatus === 0) return logger.info("peli on pelattu jo")

    const seconds = differenceInSeconds(date, new Date())
    logger.info("seconds " + seconds, { date, now: new Date() })

    if (seconds < 90) {
      let aloitus: string[] = JSON.parse(
        (await env.data.get("aloitus")) || "[]"
      )

      if (aloitus.includes(game.IdMatch))
        return logger.info("ilmoitettu jo alkaminen", { id: game.IdMatch })

      const endDate = add(date, { minutes: 30 })

      aloitus = [...aloitus, game.IdMatch]
      env.data.put("aloitus", JSON.stringify(aloitus))
      logger.info("Ilmoitetaan alkamisesta... ", { id: game.IdMatch })
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

    logger.info("Tulossa vielä tänään", { id: game.IdMatch })

    return null
  })

  const sent = publishToAbly("valmis", { name: "hei" }, env.ABLY_KEY)
  ctx.waitUntil(sent)
}

export { scheduled }
