import { startOfToday, getYear, getMonth, getDate } from "date-fns"
import { Game, Games } from "./types/fifa.d"

async function fetchGames() {
  const response = await fetch(
    "https://api.fifa.com/api/v3/calendar/matches?from=2022-11-22T00%3A00%3A00Z&language=en&count=200&idSeason=255711"
  )

  const data = await response.json<Games>()
  return data
}

async function gamesToday() {
  const result = startOfToday()
  const from = `${getYear(result)}-${getMonth(result) + 1}-${getDate(
    result
  )}T00:00:00Z`

  const to = `${getYear(result)}-${getMonth(result) + 1}-${getDate(
    result
  )}T23:59:59Z`

  const response = await fetch(
    `https://api.fifa.com/api/v3/calendar/matches?from=${from}&to=${to}&language=en&count=500&idSeason=255711`
  )

  const data = await response.json<Games>()
  return data
}

async function getGame(id: string): Promise<Game> {
  const response = await fetch(
    `https://api.fifa.com/api/v3/live/football/${id}?language=en`
  )

  const data = await response.json<Game>()

  return data
}

export { fetchGames, getGame, gamesToday }
