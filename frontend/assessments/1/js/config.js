const CONFIG = {
  CHART: {
    HEIGHT: 500,
    BAR_WIDTH: 20,
    GRID_WIDTH: 100,
    GRID_HEIGHT: 125,
    PRICE_MAX: 500, // Maximum price value
    PRICE_MIN: 0, // Minimum price value
    SCALE_STEP: 140, 
    UPDATE_INTERVAL: 5000, 
  },

  STOCK: {
    SYMBOL: 'Google',
    INITIAL_PRICE: 142.32,
    LOGO_URL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/500px-Google_%22G%22_logo.svg.png',
  },

  UI: {
    ANIMATION_DURATION: 300, 
    HISTORY_MAX_ITEMS: 50, // Maximum history items to display
  },

  PRICE_GENERATION: {
    MIN: 50, // Minimum price for random generation
    MAX: 500, // Maximum price for random generation
    VOLATILITY: 1.34,
  },

  STORAGE: {
    HISTORY_KEY: 'stock_transaction_history',
    PRICE_KEY: 'stock_current_price',
  },

  CLASSES: {
    BAR_BUY: 'chart_bar-buy',
    BAR_SELL: 'chart_bar-sell',
    CHANGE_POSITIVE: 'positive',
    CHANGE_NEGATIVE: 'negative',
    CHANGE_NEUTRAL: 'neutral',
    HISTORY_ITEM_BUY: 'history_item-buy',
    HISTORY_ITEM_SELL: 'history_item-sell',
  },

  // DOM Element IDs
  ELEMENTS: {
    CURRENT_PRICE: 'currentPrice',
    PRICE_CHANGE: 'priceChange',
    QUANTITY_INPUT: 'quantityInput',
    BUY_BUTTON: 'buyButton',
    SELL_BUTTON: 'sellButton',
    CHART_BARS: 'chartBars',
    CHART_GRID: 'chartGrid',
    Y_AXIS: 'yAxis',
    X_AXIS: 'xAxis',
    HISTORY_LIST: 'historyList',
  },

  FORMATS: {
    PRICE_DECIMALS: 2,
    PERCENTAGE_DECIMALS: 2,
  },
};
