/** Any one owner id selects the orders; with no owner the server returns empty lists. */
export type TradingOrderGetPublicOrdersByOwnerInput = {
	countryId?: string;
	userId?: string;
	muId?: string;
	partyId?: string;
};

export type PublicTradingOrder = {
	_id: string;
	user: string;
	/** Present on country-owned orders. */
	country?: string;
	/** Present on MU-owned orders. */
	mu?: string;
	/** Expected on party-owned orders by symmetry; no party-owned order was observed live. */
	party?: string;
	itemCode: string;
	quantity: number;
	price: number;
	offerAt: string;
	type: "buy" | "sell";
	__v: number;
};

export type TradingOrderGetPublicOrdersByOwnerResponse = {
	buyOrders: PublicTradingOrder[];
	sellOrders: PublicTradingOrder[];
	allOrders: PublicTradingOrder[];
	totalBuyMoneyInvested: number;
	totalSellMoneyExpected: number;
	totalSellQuantities: Record<string, number>;
};

export type TradingOrderGetTopOrdersPerItemCodeInput = {
	itemCodes: string[];
	/** Orders per side for each code; without it the server returns one per side. */
	limit?: number;
};

/** The orders have the shape `getPublicOrdersByOwner` returns. */
export type TradingOrderBook = {
	buyOrders: PublicTradingOrder[];
	sellOrders: PublicTradingOrder[];
};

/** Every requested code is a key; a code without orders, or an unknown one, has two empty lists. */
export type TradingOrderGetTopOrdersPerItemCodeResponse = Record<string, TradingOrderBook>;

export type TradingOrderCustomEndpoints = {
	"tradingOrder.getPublicOrdersByOwner": {
		input: TradingOrderGetPublicOrdersByOwnerInput;
		output: TradingOrderGetPublicOrdersByOwnerResponse;
	};
	"tradingOrder.getTopOrdersPerItemCode": {
		input: TradingOrderGetTopOrdersPerItemCodeInput;
		output: TradingOrderGetTopOrdersPerItemCodeResponse;
	};
};
