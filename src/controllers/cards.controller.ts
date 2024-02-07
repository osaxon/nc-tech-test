import { Request, Response } from "express";
import { readCards, readTemplates, writeCards } from "../models/cards.models";
import {
    formatCard,
    formatCardsResponse,
    generateNewCardId,
} from "../utils/utils";

export const getCards = async (req: Request, res: Response) => {
    try {
        const cards = await readCards();
        const templates = await readTemplates();
        res.json({ cards: formatCardsResponse(cards, templates) });
    } catch (error) {
        res.status(500).send("There was an error getting the cards.");
    }
};

export const getCard = async (req: Request, res: Response) => {
    try {
        const cards = await readCards();
        const templates = await readTemplates();
        const formattedCards = formatCardsResponse(cards, templates);

        const card = formattedCards.find(
            (card) => card.card_id === req.params.cardId
        );
        if (!card) {
            res.status(404).send("Card not found");
        }
        res.json(card);
    } catch (error) {
        res.status(500).send("There was an error getting the card.");
    }
};

export const postCard = async (req: Request, res: Response) => {
    try {
        const cards = await readCards();

        const newCard = {
            id: generateNewCardId(cards),
            ...req.body,
        };
        const updatedCards = [...cards, newCard];
        await writeCards(updatedCards);

        const templates = await readTemplates();
        res.json(formatCard(newCard, templates));
    } catch (error) {
        res.status(500).send("There was an error creating the card.");
    }
};

export const deleteCard = async (req: Request, res: Response) => {
    try {
        const cards = await readCards();
        const updatedCards = cards.filter(
            (card) => card.id !== req.params.cardId
        );
        if (cards.length === updatedCards.length) {
            res.status(404).send("Card not found");
        } else {
            await writeCards(updatedCards);
            res.status(200).send("Card deleted");
        }
    } catch (error) {
        res.status(500).send("There was an error deleting the card.");
    }
};
