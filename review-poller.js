import fetch from 'node-fetch';

const testEnvironment = process.env.TEST_ENVIRONMENT || 'www';

// A list of representative tire ids to pick from
const tireIds = [
    'BRIDGESTONEALENZAAS02',
    'BRIDGESTONEALENZAASULTRA',
    'BRIDGESTONEBLIZZAKDMV2',
    'BRIDGESTONEBLIZZAKWS90',
    'BRIDGESTONEDRIVEGUARDPLUS',
    'BRIDGESTONEDUELERHLALENZA001',
    'BRIDGESTONEDUELERHPSPORT',
    'BRIDGESTONEDUELERHPSPORTAS',
    'BRIDGESTONEPOTENZASPORT',
    'BRIDGESTONETURANZAEL440',
    'BRIDGESTONETURANZAEV',
    'BRIDGESTONETURANZAQUIETTRACK',
    'BRIDGESTONETURANZAT005',
    'BRIDGESTONEWEATHERPEAK',
    'FIRESTONEALLSEASON',
    'FIRESTONEDESTINATIONAT2',
    'FIRESTONEDESTINATIONLE2',
    'FIRESTONEDESTINATIONLE3',
    'FIRESTONEWEATHERGRIP',
    'FIRESTONEWEATHERGRIP',
    'FIRESTONEWINTERFORCE2UV',
    'SUREDRIVEALLSEASON',
    'SUREDRIVETOURINGAS',
    'TOYOEXTENSAASII',
    'TOYOPROXESSTIII',
];

/**
 * Pick a random number of unique tire ids from the list.
 * @return {Array} A collection of tire ids.
 */
function pickTires() {
    // Random number between 3 and 12
    const numTires = Math.floor(Math.random() * 10) + 3;
    const picked = [];
    while (picked.length < numTires) {
        const index = Math.floor(Math.random() * tireIds.length);
        const tireId = tireIds[index];
        if (!picked.includes(tireId)) {
            picked.push(tireId);
        }
    }
    return picked;
 }

function doFetch(url, version, numTires) {
    const options = {
        headers: {
            "Content-Type": "application/json",
          },
    };
    if (version === 2) {
        options.headers['Version'] = 'v2';
    }
    return fetch(url.href, options)
      .then(response => response.json())
      .then(reviews => {
        const reviewsData = version == 2 ? reviews.data?.results : reviews.data;
        if (reviewsData?.length > 0) {
            console.log(`-- Version ${version}: Got ${reviewsData.length} reviews for ${numTires} tires`);
        } else {
            console.error(`-- Version ${version}: UNEXPECTED RESPONSE FORMAT`);
        }
      })
      .catch(err => {
        console.error(`Error fetching reviews from: ${url.href}`, err);
      });

}

function main() {
  setInterval(async () => {
    const url = new URL(`https://${testEnvironment}.firestonecompleteautocare.com/bsro/services/reviews/get-review-summaries-by-product-ids`);
    const tireIds = pickTires();
    url.searchParams.append('id', tireIds.join(','));
    // Randomly pick a version and call the API
    const version = Math.floor(Math.random() * 2) + 1;
    console.log(`URL: ${url.href}`);
    await doFetch(url, version, tireIds.length);
    // Wait 5 seconds and fetch the other version
    setTimeout(async () => {
        const otherVersion = version === 1 ? 2 : 1;
        await doFetch(url, otherVersion, tireIds.length);
    }, 5000);
  }, 10000); // Repeat every 10 seconds forever
}

main();
