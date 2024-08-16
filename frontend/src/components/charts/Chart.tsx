'use client'
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, BarElement } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);
export 
const LineChart: React.FC<{ dates: any, prices: any }> = ({ dates, prices }) => {
  const [page, setPage] = React.useState(0);
  const itemsPerPage = 20;

  const paginatedDates = dates;
  const paginatedPrices = prices;

  const data = {
      labels: paginatedDates,
      datasets: [
          {
              label: '',
              data: paginatedPrices,
              borderColor: 'rgba(255, 255, 255, 1)', // Change line color to white
              backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjust background color if needed
              fill: true,
              tension: 0.4,
          },
      ],
  };

  const formatNumber = (value: any) => {
      if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
      if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
      if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
      if (value % 1 !== 0) return value.toFixed(4);
      return value;
  };

  const options = {
      scales: {
          y: {
              grid: {
                  display: false, // Remove y-grid lines
              },
              ticks: {
                  color: 'white', // Change y-axis ticks color to white
                  callback: formatNumber,
              },
          },
          x: {
              grid: {
                  color: 'rgba(255, 255, 255, 0.1)', // Light grid lines for x-axis
              },
              ticks: {
                  color: 'white', // Change x-axis ticks color to white
              },
          },
      },
      plugins: {
          tooltip: {
              mode: 'index' as const,
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: 'white',
              bodyColor: 'white',
              callbacks: {
                  label: function (context: any) {
                      return `${context.dataset.label || ''}: ${formatNumber(context.parsed.y)}`;
                  },
              },
          },
      },
      responsive: true,
      maintainAspectRatio: false,
  };

  const totalPages = Math.ceil(dates.length / itemsPerPage);

    return (
        <div>
            <div className="chart-container">
                <div className="chart-shadow">
                    <Line data={data} options={options} />
                </div>
            </div>
            <div className="pagination-controls">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    className="circle-button"
                >
                    <span className="chevron left"></span>
                </button>
                
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages - 1}
                    className="circle-button"
                >
                    <span className="chevron right"></span>
                </button>
            </div>
            <style jsx>{`
                .chart-container {
                    position: relative;
                    width: 100%;
                    max-width: 1000px;
                    height: 350px;
                    background: linear-gradient(135deg, #8e44ad, #f39c12);
                    padding: 20px;
                    border-radius: 10px;
                    margin: 0 auto;
                }

                .chart-shadow {
                    width: 100%;
                    height: 100%;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .pagination-controls {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 20px;
                }

                .circle-button {
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    border: none;
                    padding: 10px;
                    margin: 0 5px;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                }

                .circle-button:disabled {
                    background-color: #95a5a6;
                    cursor: not-allowed;
                }

                .circle-button:hover:not(:disabled) {
                    background-color: #34495e;
                    transform: scale(1.1);
                }

                .chevron {
                    border: solid #ecf0f1;
                    border-width: 0 3px 3px 0;
                    display: inline-block;
                    padding: 3px;
                }

                .chevron.left {
                    transform: rotate(135deg);
                    -webkit-transform: rotate(135deg);
                }

                .chevron.right {
                    transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                }

                @media (max-width: 768px) {
                    .chart-container {
                    width: 100%;
                        height: 300px;
                        padding: 10px;
                    }

                    .circle-button {
                        width: 30px;
                        height: 30px;
                    }

                    .chevron {
                        border-width: 0 2px 2px 0;
                        padding: 2px;
                    }
                }

                @media (max-width: 480px) {
                    .chart-container {
                      width: 100%;
                        height: 250px;
                        padding: 5px;
                    }

                    .circle-button {
                        width: 25px;
                        height: 25px;
                    }

                    .chevron {
                        border-width: 0 1.5px 1.5px 0;
                        padding: 1.5px;
                    }
                }
            `}</style>
        </div>
    );
};


Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

export 
const BarChart: React.FC<{ coinData: any }> = ({ coinData }) => {
  const coin = coinData.coin;
  const data = {
      labels: ['Bot Ratio', 'Hype to Market Cap', 'Market Cap (Billions)', 'Mentions', 'One Month Prediction', 'One Year Prediction', 'Virality Score','Engagement Coefficient'],
      datasets: [
          {
              label: `${coin} Data`,
              data: [
                  coinData.bot_ratio,
                  coinData.hype_to_market_cap,
                  coinData.market_cap / 1e9, // Convert Market Cap to Billions
                  coinData.mentions,
                  coinData.one_month_prediction,
                  coinData.one_year_prediction,
                  coinData.virality_score,
                  coinData.engagement_coefficient
              ],
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 1,
              borderRadius: 10, // Rounded corners
              barThickness: 10, // Thin bars
          },
      ],
  };

  const formatNumber = (value: any) => {
      if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
      if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
      if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
      return value;
  };

  const options = {
      scales: {
          y: {
              beginAtZero: true,
              grid: {
                  display: false, // Remove grid lines
              },
              ticks: {
                  color: 'white',
                  callback: formatNumber,
              },
          },
          x: {
              grid: {
                  display: false, // Remove grid lines
              },
              ticks: {
                  color: 'white',
              },
          },
      },
      plugins: {
          legend: {
              display: false,
          },
          tooltip: {
              mode: 'index' as const,
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: 'white',
              bodyColor: 'white',
              callbacks: {
                  label: function (context: any) {
                      let label = context.dataset.label || '';
                      if (label) {
                          label += ': ';
                      }
                      if (context.parsed.y !== null) {
                          if (context.label === 'Market Cap (Billions)') {
                              label += `${context.parsed.y}B`; // Display Market Cap in Billions
                          } else {
                              label += formatNumber(context.parsed.y);
                          }
                      }
                      return label;
                  },
              },
          },
      },
      responsive: true,
      maintainAspectRatio: false,
  };

    return (
        <div className="chart-container">
            <div className="chart-shadow">
                <Bar data={data} options={options} />
            </div>
            <style jsx>{`
                .chart-container {
                    position: relative;
                    width: 400px;
                    max-width: 400px;
                    height: 350px;
                    background: linear-gradient(135deg, #8e44ad, #f39c12);
                    padding: 20px;
                    border-radius: 10px;
                    margin: 0 auto;
                }

                .chart-shadow {
                    width: 100%;
                    height: 100%;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                    overflow: hidden;
                }

                @media (max-width: 768px) {
                    .chart-container {
                    width:100%;
                        height: 300px;
                        padding: 10px;
                    }
                }

                @media (max-width: 480px) {
                    .chart-container {
                    width:100%;
                        height: 250px;
                        padding: 5px;
                    }
                }
            `}</style>
        </div>
    );
};
