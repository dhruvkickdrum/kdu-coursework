class HistoryManager {
  constructor() {
    this.historyList = [];
    this.historyContainer = null;
    
    this.init();
  }

  init() {
    this.historyContainer = document.getElementById(CONFIG.ELEMENTS.HISTORY_LIST);
    this.loadFromStorage();
    this.render();
  }

  addTransaction(action, quantity, price) {
    const transaction = {
      id: this.generateId(),
      action: action.toUpperCase(),
      quantity: quantity,
      price: price,
      timestamp: new Date().toISOString(),
      formattedTime: this.formatTimestamp(new Date()),
    };
    
    // Add to beginning of array (most recent first)
    this.historyList.unshift(transaction);
    
    if (this.historyList.length > CONFIG.UI.HISTORY_MAX_ITEMS) {
      this.historyList = this.historyList.slice(0, CONFIG.UI.HISTORY_MAX_ITEMS);
    }
    
    this.saveToStorage();
    this.render();
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  formatTimestamp(date) {
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    
    return date.toLocaleString('en-US', options).replace(',', '');
  }

  createHistoryItemHTML(transaction) {
    const actionClass = transaction.action === 'BUY' ? CONFIG.CLASSES.HISTORY_ITEM_BUY : CONFIG.CLASSES.HISTORY_ITEM_SELL;
    
    const actionLabelClass = transaction.action === 'BUY' ? 'history_item-action-buy' : 'history_item-action-sell';
    
    return `
      <div class="history_item ${actionClass}" data-id="${transaction.id}">
        <div class="history_item-header">
          <span class="history_item-quantity">${transaction.quantity} stocks</span>
          <span class="history_item-action ${actionLabelClass}">${transaction.action}</span>
        </div>
        <div class="history_item-timestamp">${transaction.formattedTime} - Price : ${transaction.price}</div>
      </div>
    `;
  }

  render() {  
    if (!this.historyContainer) return;
    
    if (this.historyList.length === 0) {
      this.historyContainer.innerHTML = `
        <div class="history_empty">
          No transactions yet. Buy or sell stocks to see your history here.
        </div>
      `;
      return;
    }
    
    this.historyContainer.innerHTML = this.historyList
      .map(transaction => this.createHistoryItemHTML(transaction))
      .join('');
  }

  saveToStorage() {
    try {
      localStorage.setItem(
        CONFIG.STORAGE.HISTORY_KEY,
        JSON.stringify(this.historyList)
      );
    } catch (error) {
      console.error('Failed to save history to storage:', error);
    }
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(CONFIG.STORAGE.HISTORY_KEY);
      if (stored) {
        this.historyList = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load history from storage:', error);
      this.historyList = [];
    }
  }
}