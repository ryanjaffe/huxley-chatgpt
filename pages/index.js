import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

const EXPERT_OPTIONS = {
  "IT Technichian": "IT Technichian",
  "Legal Advisor": "Legal Advisor",
  "Health Advisor": "Health Advisor",
  "Business Advisor": "Business Advisor",
  "Azure Advisor": "Azure Advisor",
  "Director of Information Security": "Director of Information Security",
  "Marketing Advisor": "Marketing Advisor",
};

export default function Home() {
  const [problemInput, setProblemInput] = useState("");
  const [expertOption, setExpertOption] = useState(Object.values(EXPERT_OPTIONS)[0]);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem: problemInput, expert: expertOption }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setProblemInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Huxley</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/huxley.png" className={styles.icon} />
        <h3>Huxley</h3>
        <form onSubmit={onSubmit}>
          <select
            value={expertOption}
            onChange={(e) => setExpertOption(e.target.value)}
          >
            {Object.entries(EXPERT_OPTIONS).map(([name, id]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="problem"
            placeholder="What can I help with?"
            value={problemInput}
            onChange={(e) => setProblemInput(e.target.value)}
          />
          
          <input type="submit" value="Can you help, Huxley?" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
