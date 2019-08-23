function donate() {
    let ethValue = prompt('How much will you donate? (ETH)')
    //var address = document.getElementById('address').value;
        if (typeof web3 !== 'undefined') {
            web3.eth.sendTransaction({
                to: '0xB08f34f896698cC5B4102cB331bad0969E545bEC',
                value: web3.toWei(ethValue, 'ether')
            }, (err) => {

            })
        }
}