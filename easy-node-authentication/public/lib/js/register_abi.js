var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_petage",
				"type": "uint256"
			},
			{
				"name": "_breed",
				"type": "string"
			},
			{
				"name": "_gender",
				"type": "string"
			},
			{
				"name": "_location",
				"type": "string"
			}
		],
		"name": "addPet",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "petage",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "breed",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "gender",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "location",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "pet",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_idx",
				"type": "uint256"
			}
		],
		"name": "getPet",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pets",
		"outputs": [
			{
				"name": "petage",
				"type": "uint256"
			},
			{
				"name": "breed",
				"type": "string"
			},
			{
				"name": "gender",
				"type": "string"
			},
			{
				"name": "location",
				"type": "string"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]