# review-poller
Test the reviews API by requesting random reviews. 

## Quickstart

```sh
npm install
npm start
```

By default this runs against production. There are npm scripts for all the other environments.


```sh
npm run ix-dev
npm run ix-qa
npm run ix-r
npm run cwh-int
npm run cwh-qa
npm run cwh-uat
```

## What this does

It builds a list of random tire ids, and requests review summaries. First
in one version, then five seconds later in the other version. It notifies
if it sees unexpected format or errors in the response.

### Expected Output

```
$ npm run ix-qa

> review-poller@1.0.0 ix-qa
> cross-env TEST_ENVIRONMENT=ix-qa node review-poller.js

URL: https://ix-qa.firestonecompleteautocare.com/bsro/services/reviews/get-review-summaries-by-product-ids?id=BRIDGESTONEDRIVEGUARDPLUS%2CBRIDGESTONEDUELERHLALENZA001%2CTOYOEXTENSAASII%2CBRIDGESTONEDUELERHPSPORT
-- Version 2: Got 3 reviews for 4 tires
-- Version 1: Got 4 reviews for 4 tires
URL: https://ix-qa.firestonecompleteautocare.com/bsro/services/reviews/get-review-summaries-by-product-ids?id=BRIDGESTONEDRIVEGUARDPLUS%2CFIRESTONEWEATHERGRIP%2CBRIDGESTONEWEATHERPEAK%2CBRIDGESTONETURANZAEV%2CFIRESTONEDESTINATIONLE2%2CBRIDGESTONEPOTENZASPORT%2CTOYOPROXESSTIII%2CBRIDGESTONEDUELERHPSPORTAS%2CFIRESTONEDESTINATIONAT2%2CBRIDGESTONETURANZAT005%2CFIRESTONEDESTINATIONLE3%2CSUREDRIVETOURINGAS
-- Version 1: Got 10 reviews for 12 tires
-- Version 2: Got 11 reviews for 12 tires
URL: https://ix-qa.firestonecompleteautocare.com/bsro/services/reviews/get-review-summaries-by-product-ids?id=BRIDGESTONEPOTENZASPORT%2CFIRESTONEWEATHERGRIP%2CFIRESTONEDESTINATIONAT2%2CBRIDGESTONETURANZAEL440%2CBRIDGESTONEBLIZZAKWS90%2CBRIDGESTONEALENZAAS02%2CFIRESTONEDESTINATIONLE3
-- Version 2: Got 5 reviews for 7 tires
-- Version 1: Got 7 reviews for 7 tires
```

An error will show up like this:

```
URL: https://www.firestonecompleteautocare.com/bsro/services/reviews/get-review-summaries-by-product-ids?id=FIRESTONEWEATHERGRIP%2CFIRESTONEWINTERFORCE2UV%2CBRIDGESTONEPOTENZASPORT%2CBRIDGESTONETURANZAT005%2CBRIDGESTONETURANZAEV%2CBRIDGESTONEBLIZZAKWS90%2CBRIDGESTONEDUELERHPSPORT%2CBRIDGESTONEDRIVEGUARDPLUS%2CFIRESTONEDESTINATIONLE3%2CBRIDGESTONEDUELERHLALENZA001
-- Version 1: Got 8 reviews for 10 tires
-- Version 2: UNEXPECTED RESPONSE FORMAT
```
