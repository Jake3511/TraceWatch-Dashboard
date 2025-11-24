import { describe } from "node:test";
// import request from "supertest";
import {abstractEmailCheck } from "@/lib/emailValidation"

beforeEach(() => {
    global.fetch = jest.fn()
});

// Two mock tests to check abstractEmailCheck function
test("returns true for valid email", async () => {
    (global.fetch as jest.Mock).mockReturnValue({
        ok: true, 
        json: async () => ({
            is_valid_format: {value: true},
            is_smtp_valid: {value: true},
            is_disposable_email: {value: false}
        })
    })
    expect(await abstractEmailCheck("jake.shick351@gmail.com")).toBe(true);
});

test("returns false for invalid email", async () => {
    (global.fetch as jest.Mock).mockReturnValue({
        json: async () => ({
            is_valid_format: {value: false},
            is_smtp_valid: {value: true},
            is_disposable_email: {value: false}
        })
    })
    expect(await abstractEmailCheck("jake.shick351@gmail.con")).toBe(false);
})



