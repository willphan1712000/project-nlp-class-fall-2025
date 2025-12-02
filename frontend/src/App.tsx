import { Button } from '@willphan1712000/frontend';
import { useState } from 'react';
import './App.css';
import styles from './styles.module.css';
import axios from 'axios';

const url = 'http://localhost:6001/api'

const apiClient = axios.create({
  baseURL: url,
  timeout: 10000, // Abort request after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

function App() {
  const [isAnalyze, setAnalyze] = useState<boolean>(false)
  const [heading, setHeading] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const analyzeStart = async () => {
    setAnalyze(true)

    try {
      const res = await apiClient.post('/analyze', {
        prompt: heading + " " + body
      })

      const data = res.data
      setResult(data.result)
    } catch (error) {
      console.error('Error: ', error)
    }

    setAnalyze(false)
  }

  return (
    <div className="App">
      <h1 className={styles.heading}>Misleading Headline Analysis</h1>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.formArea}>
            <label htmlFor="heading" className={styles.label}>Heading</label>
            <input type="text" id="heading" className={`${styles.input} ${styles.inputBox}`} value={heading} onChange={e => setHeading(e.target.value)} />
          </div>
          <div className={styles.formArea}>
            <label htmlFor='body' className={styles.label}>Body</label>
            <textarea id='body' className={`${styles.input} ${styles.textArea}`} onChange={e => setBody(e.target.value)} value={body} />
          </div>
          <h3 className={styles.resultLabel}>Result</h3>
          <p className={styles.result}>{result}</p>
          <Button 
            buttonType='gradient'
            content={isAnalyze ? 'Analyzing...': 'Analyze'}
            onClick={e => {
              e.preventDefault()
              analyzeStart()
            }}
            isLoading={isAnalyze}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
