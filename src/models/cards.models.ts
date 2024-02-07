import { readFile, writeFile } from "fs/promises";
import { Card, FormattedCard, Template } from "../types";
import { formatCardsResponse } from "../utils/utils";

export const readCards = async (): Promise<Card[]> => {
    const data = await readFile("src/data/cards.json", "utf-8");
    const cards: Card[] = JSON.parse(data);
    return cards;
};

export const readTemplates = async () => {
    const data = await readFile("src/data/templates.json", "utf-8");
    const templates = JSON.parse(data);
    return templates;
};

export const writeCards = async (cards: Card[]) => {
    await writeFile("src/data/cards.json", JSON.stringify(cards, null, 2));
};
