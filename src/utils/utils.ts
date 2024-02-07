import { Card, FormattedCard, Template } from "../types";

export const formatCardsResponse = (
    cards: Card[],
    templates: Template[]
): FormattedCard[] | [] => {
    // map through each card object and add the cover image to the card
    // return the new array of card objects
    if (!cards.length || !templates.length) {
        return [];
    }

    const formattedCards = cards.map((card) => {
        return formatCard(card, templates);
    });

    return formattedCards;
};

export const formatCard = (
    card: Card,
    templates: Template[]
): FormattedCard => {
    const template = templates.find((template) => {
        return template.id === card.pages[0].templateId;
    });

    return {
        title: card.title,
        imageUrl: template?.imageUrl || "",
        card_id: card.id,
    };
};

export const generateNewCardId = (cards: Card[]): string => {
    const cardIds = cards.map((card) => +card.id.substring(4));
    const maxId = Math.max(...cardIds);
    const newId = (maxId + 1).toString().padStart(3, "0");
    return `card${newId}`;
};
