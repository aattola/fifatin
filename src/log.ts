import { ILogtailLog, ILogtailOptions } from "@logtail/types"
import { Base } from "@logtail/core"

class Logger extends Base {
  public constructor(sourceToken: string, options?: Partial<ILogtailOptions>) {
    super(sourceToken, options)

    const sync = async (logs: ILogtailLog[]): Promise<ILogtailLog[]> => {
      const res = await fetch(this._options.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._sourceToken}`,
        },
        body: JSON.stringify(logs),
      })

      if (res.ok) {
        return logs
      }
      throw new Error(res.statusText)
    }

    this.setSync(sync)
  }
}

export { Logger }
