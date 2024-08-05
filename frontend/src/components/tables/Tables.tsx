"use client";
import React from "react";
import styles from "../../styles/css/Tables.module.css"; // Import the CSS module

type Row = {
  key: string;
  likes: string;
  retweets: string;
  sentiments: string;
  bot: string;
  not_bot: string;
};

type Column = {
  key: keyof Row;
  label: string;
};

const Tables = () => {
  const rows: Row[] = [
    {
      key: "1",
      likes: "Tony Reichert",
      retweets: "CEO",
      sentiments: "Active",
      bot: "Active",
      not_bot: "Active",
    },
    {
      key: "2",
      likes: "Tony Reichert",
      retweets: "CEO",
      sentiments: "Active",
      bot: "Active",
      not_bot: "Active",
    },
  ];

  const columns: Column[] = [
    {
      key: "likes",
      label: "Likes",
    },
    {
      key: "retweets",
      label: "Retweets",
    },
    {
      key: "sentiments",
      label: "Sentiments",
    },
    {
      key: "bot",
      label: "Bot",
    },
    {
      key: "not_bot",
      label: "Not Bot",
    },
  ];

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className={styles.header}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.key}>
            {columns.map((column) => (
              <td key={column.key} className={styles.cell}>
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tables;
