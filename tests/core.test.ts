import { describe, it, expect } from "vitest";
import { Tinyllm } from "../src/core.js";
describe("Tinyllm", () => {
  it("init", () => { expect(new Tinyllm().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Tinyllm(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Tinyllm(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
