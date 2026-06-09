const productService = require('../backend/services/productService');

async function run() {
    try {
        console.log('Querying productService.getProducts({ page: 2, limit: 20 })');
        const res = await productService.getProducts({ page: 2, limit: 20 });
        console.log('Products Count:', res.products.length);
        console.log('Pagination info:', res.pagination);
        if (res.products.length > 0) {
            res.products.forEach((p, idx) => {
                console.log(`[${idx + 1}] ID: ${p.id} | Slug: "${p.slug}" | Title: "${p.title}"`);
            });
        }
    } catch (e) {
        console.error('Error running productService.getProducts:', e);
    }
}

run();
