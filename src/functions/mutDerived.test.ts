import { expect } from "@std/expect";
import { mut } from "../mod.ts";
import { fn } from "../utils/testUtils.ts";
import { mutDerived } from "./mutDerived.ts";

Deno.test("mutDerived", () => {
	Deno.test("prevSet", () => {
		const a = mut(0);
		const subscriber = fn<void, [number | undefined]>();

		const b = mutDerived<number | undefined>(($, { prev }) => {
			if ($(a) % 2 === 0) return $(a);
			return prev;
		});

		b.subscribe(subscriber);

		a.set(1);
		expect(b.get()).toBe(0);
		a.set(2);
		expect(b.get()).toBe(2);
		b.set(999);
		expect(b.get()).toBe(999);
		a.set(3);
		expect(b.get()).toBe(999);
	});
});
