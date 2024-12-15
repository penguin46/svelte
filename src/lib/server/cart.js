import { database } from '$lib/server/mongodb';

const dataPath = 'data/cart.json';

export async function addToCart(productId) {
    await database.collection('cart').insertOne({ productId });
}

export async function loadCart() {
    const cart = await database.collection('cart').find();
    return await cart.map((doc) => doc.productId).toArray();
}