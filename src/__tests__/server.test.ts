import * as request from "supertest";
import { app } from "../server";
const cards = require("../data/cards.json");
const templates = require("../data/templates.json");
import exp from "constants";
import { Card, FormattedCard } from "../types";
import { formatCardsResponse } from "../utils/utils";

describe("/cards/:cardId", () => {
    test("GET:200 returns a card matching the given card id as params", async () => {
        const response = await request(app).get("/cards/card001");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                title: "card 1 title",
            })
        );
    });
    test("GET:404 returns a message if the card id is not found", async () => {
        const response = await request(app).get("/cards/123");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Card not found");
    });
});

describe("/cards", () => {
    test("GET:200 returns an array of card objects", async () => {
        const response = await request(app).get("/cards");
        expect(response.status).toBe(200);
        expect(response.body.cards).toHaveLength(3);
    });
    test("returns card objects with the correct properties", async () => {
        const response = await request(app).get("/cards");
        const { cards } = response.body as { cards: FormattedCard[] };
        for (const card of cards) {
            expect(typeof card.card_id).toBe("string");
            expect(typeof card.title).toBe("string");
            expect(typeof card.imageUrl).toBe("string");
        }
    });
    test("POST:200 creates a new card object and returns the new card", async () => {
        const newCard = {
            title: "new card",
            template_id: "template001",
            sizes: ["sm", "md", "gt"],
            basePrice: 200,
            pages: [
                {
                    title: "Front Cover",
                    template: "template001",
                },
                {
                    title: "Inside Left",
                    template: "template002",
                },
                {
                    title: "Inside Right",
                    template: "template003",
                },
                {
                    title: "Back Cover",
                    template: "template004",
                },
            ],
        };
        const response = await request(app).post("/cards").send(newCard);
        expect(response.status).toBe(200);
    });
});

describe("formatCardsResponse function", () => {
    test("takes an array of cards and an array of templates and returns an array", () => {
        expect(Array.isArray(formatCardsResponse(cards, templates))).toBe(true);
    });
    test("returns an array of card objects with the correct properties", () => {
        const formattedCards: FormattedCard[] = formatCardsResponse(
            cards,
            templates
        );
        for (const card of formattedCards) {
            expect(typeof card.title).toBe("string");
            expect(typeof card.imageUrl).toBe("string");
            expect(typeof card.card_id).toBe("string");
        }
    });
    test("the card objects have the correct image urls", () => {
        const formattedCards: FormattedCard[] = formatCardsResponse(
            cards,
            templates
        );
        const cardOne = formattedCards.find(
            (card) => card.card_id === "card001"
        );
        const cardTwo = formattedCards.find(
            (card) => card.card_id === "card002"
        );
        expect(cardOne?.imageUrl).toBe("/front-cover-portrait-1.jpg");
        expect(cardTwo?.imageUrl).toBe("/front-cover-portrait-2.jpg");
    });
    test("the input array is not mutated", () => {
        const originalCards = [...cards];
        formatCardsResponse(cards, templates);
        expect(cards).toEqual(originalCards);
    });
});
