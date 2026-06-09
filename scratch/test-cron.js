const fetch = require('node-fetch');

const CRON_JOB_TOKEN = process.env.CRON_JOB_TOKEN || 'zaX78aqKJuIH4l4RX6njoqADn77MQNJJ';
const CRON_JOB_BASE = 'https://api.cron-job.org';

async function testCron() {
    try {
        console.log('Testing connection to cron-job.org...');
        console.log('Using token:', CRON_JOB_TOKEN);
        
        const response = await fetch(`${CRON_JOB_BASE}/jobs`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${CRON_JOB_TOKEN}`,
                'Accept': 'application/json'
            }
        });
        
        console.log('Response Status:', response.status);
        const text = await response.text();
        console.log('Response Body:', text);
    } catch (error) {
        console.error('Error during test:', error);
    }
}

testCron();
