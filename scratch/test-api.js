const http = require('http');

function getProductsApi(page) {
    return new Promise((resolve, reject) => {
        const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: `/api/products?page=${page}&limit=20`,
            method: 'GET'
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve({
                        statusCode: res.statusCode,
                        body: JSON.parse(data)
                    });
                } catch (e) {
                    resolve({
                        statusCode: res.statusCode,
                        body: data
                    });
                }
            });
        });
        req.on('error', reject);
        req.end();
    });
}

async function run() {
    try {
        console.log('Testing Products List API for page 2...');
        const res = await getProductsApi(2);
        console.log('API Status Code:', res.statusCode);
        console.log('API Response Success:', res.body.success);
        if (res.body.success) {
            console.log('Products Count:', res.body.data.products.length);
            console.log('Pagination info:', res.body.data.pagination);
            if (res.body.data.products.length > 0) {
                console.log('First product on page 2:', res.body.data.products[0].id, res.body.data.products[0].title);
            }
        } else {
            console.log('Error message:', res.body.message);
        }
    } catch (e) {
        console.error('Request failed:', e.message);
    }
}

run();
