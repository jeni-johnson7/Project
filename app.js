const { useState, useEffect } = React;

const mockData = [
  { symbol: "AAPL", price: 189.21 },
  { symbol: "GOOGL", price: 137.45 },
  { symbol: "AMZN", price: 125.76 },
  { symbol: "TSLA", price: 233.52 },
  { symbol: "MSFT", price: 329.99 },
];

function App() {
  const [stocks, setStocks] = useState(mockData);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live updates by slightly adjusting stock prices
      setStocks(prev =>
        prev.map(stock => {
          const change = (Math.random() - 0.5) * 2;
          return {
            ...stock,
            price: +(stock.price + change).toFixed(2),
          };
        })
      );
      setLastUpdated(new Date().toLocaleTimeString());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>💹 IBM FE - Real-Time Stock Ticker</h1>
        <p>Live stock prices updating every 3 seconds</p>
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Current Price ($)</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => {
            const prev = mockData.find(s => s.symbol === stock.symbol).price;
            const diff = (stock.price - prev).toFixed(2);
            const isUp = diff > 0;
            return (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={`price-change ${isUp ? "stock-up" : "stock-down"}`}>
                  {isUp ? `▲ +${diff}` : `▼ ${diff}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="updated">Last Updated: {lastUpdated}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
