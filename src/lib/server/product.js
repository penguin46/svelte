import { database } from '$lib/server/mongodb';

export async function loadProducts() {
    const products = await database.collection('products').find().toArray();
    return products;
}

export async function getRecommends(baseId) {
    const products = await loadProducts();
    const candidates = products.filter((product) => product.id !== baseId);
    return randomSelect(candidates, 3);
}

// array 배열에서 1개 이상, n개 이하의 요소를 임의로 추출
function randomSelect(array, n) {
    const indices = Array.from({ length: array.length }, (_, i) => i);
    indices.sort(() => Math.random() - 0.5);
    const count = Math.floor(Math.random() * n + 1);
    return Array.from({ length: count }, (_, i) => array[indices[i]]);
}