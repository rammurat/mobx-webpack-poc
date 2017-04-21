
function getMatchingData(contractId) {
    const form = {contractId : contractId };

    console.log('form',form);

    return fetch('/matchingData', { 
                    method: 'GET', 
                    body: JSON.stringify(form),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(function(json){
                    console.log('JSON data',json);
                    return json;
                });
}

function getListingData(userId) {
    return "";
}

module.exports = {
    getMatchingData: getMatchingData,
    getListingData: getListingData
};
