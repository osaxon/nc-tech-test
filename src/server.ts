import * as express from "express";
import {
    deleteCard,
    getCard,
    getCards,
    postCard,
} from "./controllers/cards.controller";

export const app = express();

app.use(express.json());
app.set("json spaces", 2);

app.get("/cards", getCards);
app.post("/cards", postCard);

app.get("/cards/:cardId", getCard);
app.delete("/cards/:cardId", deleteCard);

app.get("/cards/:cardId/:sizeId?", () => {
    // respond with card by id
});
