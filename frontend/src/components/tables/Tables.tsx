"use client";
import React from "react";
import styles from "../../styles/css/Tables.module.css"; // Import the CSS module

interface TableData {
  isBot: string;
  likes: number;
  replies: number;
  retweets: number;
  sentiment: string;
  shares: number;
  tweet_id: string;
}

interface TableProps {
  tableProps: TableData[];
}

const Tables: React.FC<TableProps> = ({ tableProps }) => {

  return (
     <div>
         {tableProps && 

     <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.header}>Tweet ID</th>
          <th className={styles.header}>Is Bot</th>
          <th className={styles.header}>Likes</th>
          <th className={styles.header}>Replies</th>
          <th className={styles.header}>Retweets</th>
          <th className={styles.header}>Sentiment</th>
          <th className={styles.header}>Shares</th>
        </tr>
      </thead>
      <tbody>
        {tableProps.map((row, index) => (
          <tr key={index}>
            <td className={styles.cell}>{row.tweet_id}</td>

            <td className={styles.cell}>{row.isBot}</td>
            <td className={styles.cell}>{row.likes}</td>
            <td className={styles.cell}>{row.replies}</td>
            <td className={styles.cell}>{row.retweets}</td>
            <td className={styles.cell}>{row.sentiment}</td>
            <td className={styles.cell}>{row.shares}</td>
          </tr>
        ))}
      </tbody>
    </table>
}
        </div>
  );
};

export default Tables;