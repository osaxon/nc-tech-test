import { Request, Response } from "express";
import { readCards } from "../models/cards.models";

export const getCards = async (req: Request, res: Response) => {
    try {
        const cards = await readCards();
        res.json({ cards });
    } catch (error) {
        res.status(500).send("There was an error getting the cards.");
    }
};

export const getCard = async (req: Request, res: Response) => {
    try {
        const cards = await readCards();
        const card = cards.find((card) => card.card_id === req.params.cardId);
        if (!card) {
            res.status(404).send("Card not found");
        }
        res.json(card);
    } catch (error) {
        res.status(500).send("There was an error getting the card.");
    }
};
