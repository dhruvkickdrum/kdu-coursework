class StockDashboard {
  constructor() {
    this.currentPrice = CONFIG.STOCK.INITIAL_PRICE;
    this.previousPrice = CONFIG.STOCK.INITIAL_PRICE;
    this.priceUpdateInterval = null;
    
    this.chartManager = new ChartManager();
    this.historyManager = new HistoryManager();
    
    // DOM elements
    this.elements = {
      currentPrice: document.getElementById(CONFIG.ELEMENTS.CURRENT_PRICE),
      priceChange: document.getElementById(CONFIG.ELEMENTS.PRICE_CHANGE),
      quantityInput: document.getElementById(CONFIG.ELEMENTS.QUANTITY_INPUT),
      buyButton: document.getElementById(CONFIG.ELEMENTS.BUY_BUTTON),
      sellButton: document.getElementById(CONFIG.ELEMENTS.SELL_BUTTON),
    };
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updatePriceDisplay();
    this.startPriceUpdates();
  }

  setupEventListeners() {
    // Buy button
    this.elements.buyButton.addEventListener('click', () => {
      this.handleTransaction('BUY');
    });
    
    // Sell button
    this.elements.sellButton.addEventListener('click', () => {
      this.handleTransaction('SELL');
    });
    
    // Quantity input, prevent negative values
    this.elements.quantityInput.addEventListener('input', (e) => {
      if (e.target.value < 1) {
        e.target.value = 1;
      }
    });
  }


  handleTransaction(action) {
    const quantity = parseInt(this.elements.quantityInput.value) || 1;
    
    if (quantity < 1) {
      this.showError('Please enter a valid quantity');
      return;
    }
    
    // Add to history
    this.historyManager.addTransaction(action, quantity, this.currentPrice);
    this.showTransactionFeedback(action);
    
    // Reset quantity input
    this.elements.quantityInput.value = 1;
  }

  showTransactionFeedback(action) {
    const button = action === 'BUY' ? this.elements.buyButton : this.elements.sellButton;
    const originalText = button.textContent;
    
    button.textContent = action === 'BUY' ? '✓ BOUGHT' : '✓ SOLD';
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, CONFIG.UI.ANIMATION_DURATION * 2);
  }

  showError(message) {
    console.error(message);
  }

  startPriceUpdates() {
    this.updatePrice();
    
    this.priceUpdateInterval = setInterval(() => {
      this.updatePrice();
    }, CONFIG.CHART.UPDATE_INTERVAL);
  }

  generateRandomPrice() {
    let newPrice = Math.random() * (CONFIG.CHART.PRICE_MAX - CONFIG.CHART.PRICE_MIN) + CONFIG.CHART.PRICE_MIN ;
    return Math.round(newPrice * 100) / 100;
  }

  updatePrice() {
    this.previousPrice = this.currentPrice;
    this.currentPrice = this.generateRandomPrice();
    
    this.updatePriceDisplay();
    this.chartManager.updateChart(this.currentPrice);
  }

  updatePriceDisplay() {
    if (!this.elements.currentPrice || !this.elements.priceChange) return;
    
    // Update price value
    this.elements.currentPrice.textContent = this.currentPrice.toFixed(CONFIG.FORMATS.PRICE_DECIMALS);
    
    // Calculate and update price change
    const change = this.currentPrice - this.previousPrice;
    const changePercent = this.previousPrice !== 0 ? (change / this.previousPrice) * 100 : 0;
    
    // Update change display
    this.elements.priceChange.textContent = `${Math.abs(changePercent).toFixed(CONFIG.FORMATS.PERCENTAGE_DECIMALS)}%`;
    
    // Update change class
    this.elements.priceChange.classList.remove(
      CONFIG.CLASSES.CHANGE_POSITIVE,
      CONFIG.CLASSES.CHANGE_NEGATIVE,
      CONFIG.CLASSES.CHANGE_NEUTRAL
    );
    
    if (changePercent > 0) {
      this.elements.priceChange.classList.add(CONFIG.CLASSES.CHANGE_POSITIVE);
    } else if (changePercent < 0) {
      this.elements.priceChange.classList.add(CONFIG.CLASSES.CHANGE_NEGATIVE);
    } else {
      this.elements.priceChange.classList.add(CONFIG.CLASSES.CHANGE_NEUTRAL);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const dashboard = new StockDashboard();
  window.dashboard = dashboard;
  
  console.log('Stock Dashboard initialized successfully');
});