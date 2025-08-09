import {KmsUtilsService} from "../../src/modules/kms/kms-utils.service";
import {beforeAll, describe, expect, test} from "bun:test";

describe("KmsUtilsService - Hash Functions", () => {
    let service: KmsUtilsService;

    beforeAll(() => {
        service = new KmsUtilsService();
    });

    describe("hashPassword", () => {
        test("should hash a string password", async () => {
            const password = "mySecurePassword123!";
            const hash = await service.hashPassword(password);

            expect(hash).toBeDefined();
            expect(typeof hash).toBe("string");
            expect(hash.length).toBeGreaterThan(0);
            expect(hash.startsWith("$argon2")).toBeTruthy();
        });

        test("should hash a Buffer password", async () => {
            const password = Buffer.from("mySecurePassword123!");
            const hash = await service.hashPassword(password);

            expect(hash).toBeDefined();
            expect(typeof hash).toBe("string");
            expect(hash.length).toBeGreaterThan(0);
            expect(hash.startsWith("$argon2")).toBeTruthy();
        });

        test("should produce different hashes for same input (due to salt)", async () => {
            const password = "mySecurePassword123!";
            const hash1 = await service.hashPassword(password);
            const hash2 = await service.hashPassword(password);

            expect(hash1).not.toBe(hash2);
        });
    });

    describe("verifyPassword", () => {
        test("should verify a correct password", async () => {
            const password = "mySecurePassword123!";
            const hash = await service.hashPassword(password);
            const isValid = await service.verifyPassword(password, hash);

            expect(isValid).toBe(true);
        });

        test("should reject an incorrect password", async () => {
            const password = "mySecurePassword123!";
            const wrongPassword = "wrongPassword";
            const hash = await service.hashPassword(password);
            const isValid = await service.verifyPassword(wrongPassword, hash);

            expect(isValid).toBe(false);
        });

        test("should handle verification with Buffer input", async () => {
            const password = Buffer.from("mySecurePassword123!");
            const hash = await service.hashPassword(password);
            const isValid = await service.verifyPassword(password, hash);

            expect(isValid).toBe(true);
        });

        test("should return false for invalid hash format", async () => {
            const password = "mySecurePassword123!";
            const invalidHash = "invalidHash";
            const isValid = await service.verifyPassword(password, invalidHash);

            expect(isValid).toBe(false);
        });
    });

    describe("hash (SHA-256)", () => {
        test("should hash a string input", () => {
            const input = "test input";
            const result = service.hash(input);

            expect(result).toBeInstanceOf(Buffer);
            expect(result.length).toBe(32); // SHA-256 produces 32-byte hash
        });

        test("should hash a Buffer input", () => {
            const input = Buffer.from("test input");
            const result = service.hash(input);

            expect(result).toBeInstanceOf(Buffer);
            expect(result.length).toBe(32);
        });

        test("should produce consistent hashes for same input", () => {
            const input = "consistent input";
            const result1 = service.hash(input);
            const result2 = service.hash(input);

            expect(result1).toEqual(result2);
        });

        test("should produce different hashes for different inputs", () => {
            const input1 = "input1";
            const input2 = "input2";
            const result1 = service.hash(input1);
            const result2 = service.hash(input2);

            expect(result1).not.toEqual(result2);
        });

        test("should produce known hash for known input", () => {
            const input = "test";
            const expectedHash = Buffer.from(
                "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
                "hex",
            );
            const result = service.hash(input);

            expect(result).toEqual(expectedHash);
        });
    });
});
