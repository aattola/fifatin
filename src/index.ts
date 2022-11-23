import { Hono } from "hono"
import { getGame } from "./fifa"
import { scheduled } from "./scheduled"
import { Bindings } from "./types/general"

const app = new Hono<{ Bindings: Bindings }>()

app.get("/", async (c) => {
  const { data } = c.env
  const games = await data.get("games")

  return c.json(JSON.parse(games, null, 2))
})

app.get("/peli/:id", async (c) => {
  const id = c.req.param("id")
  const game = await getGame(id)

  return c.json(game)
})

app.get("/tiimi/:id", async (c) => {
  // const id = c.req.param("id")
  // const game = await getGame(id)

  return c.json({ error: "miksi tarvitset tätä?" })
})

app.get("/set/:key/:value", async (c) => {
  const key = c.req.param("key")
  const value = c.req.param("value")

  const place = await c.env.data.put(key, value)

  return c.text(`set! ${place}`)
})

export default {
  fetch: app.fetch,
  scheduled,
}
