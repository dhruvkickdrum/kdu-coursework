class ChartManager {
    constructor() {
        this.bars = [];
        this.maxBars = 0;
        this.chartBarsContainer = null;
        this.previousPrice = null;
        this.init();
    }

    init() {
        this.chartBarsContainer = document.getElementById(CONFIG.ELEMENTS.CHART_BARS);
        this.calculateMaxBars();
    }

    calculateMaxBars() {
        if(!this.chartBarsContainer) return;
        const containerWidth = this.chartBarsContainer.offsetWidth;
        this.maxBars = Math.floor(containerWidth / CONFIG.CHART.BAR_WIDTH);
    }

    addBar(price , type) {
        if(!this.chartBarsContainer) return;

        if(this.bars.length >= this.maxBars) {
            const oldestBar = this.bars.shift();
            if(oldestBar?.parentNode) {
                oldestBar.remove();
            }
        }

        const bar = this.createBar(price, type);
        this.bars.push(bar);
        this.chartBarsContainer.appendChild(bar);

        requestAnimationFrame(() => {
            bar.style.height = `${price}px`;
        });
    }

    createBar(price, type) {
        const bar = document.createElement('div');
        bar.className = 'chart_bar';

        if(type == 'buy') {
            bar.classList.add(CONFIG.CLASSES.BAR_BUY);
        } else if(type == 'sell') {
            bar.classList.add(CONFIG.CLASSES.BAR_SELL);
        }

        bar.style.height = '0px';

        bar.dataset.price = `${price.toFixed(CONFIG.FORMATS.PRICE_DECIMALS)}`;
        return bar;
    }

    updateChart(currentPrice) {
        let barType = 'buy';
        if(this.previousPrice !== null) {
            barType = currentPrice >= this.previousPrice ? 'buy' : 'sell';
        }
    
        this.addBar(currentPrice, barType);
        this.previousPrice = currentPrice;
    }
}

