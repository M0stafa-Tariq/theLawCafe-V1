import { scheduleJob } from "node-schedule";

export function generalCron() {
  scheduleJob("0 0 0 * * *", async () => {});
}
