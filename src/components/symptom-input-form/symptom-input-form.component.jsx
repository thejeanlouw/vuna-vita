import React, { useState } from 'react';
import axios from 'axios';

const SymptomInputForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [disorder, setDisorder] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const prompt = `Based on the symptoms: ${symptoms}, what is the most likely mental disorder? Use only direct definitions from the DSM-5.`;

    try {
      const response =  await axios.post(
        'https://openaiapigateway.azurewebsites.net/api/CompletionAPI',
        {
          prompt: prompt,
          engine: 'gpt-3.5-turbo-0301',
          max_tokens: 100,
          role_description: 'You are a professional clinical psychologist. You have a patient who has come to you with a list of symptoms. You are trying to determine what mental disorder they may have using definitions from the DSM-5. You have a perfect understanding of the DSM-5 and are able to use it to determine the most likely mental disorder. You quote the DSM-5 directly in your response.',
        },
      );

      // Process the response and update the state with the disorder
      const disorderResult = response.data;
      setDisorder(disorderResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>DSM-5 Mental Health Symptom Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="symptoms">Enter symptoms:</label>
          <p></p>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
            cols={50}
            required
          />
        </div>
        <button type="submit">Analyze Symptoms</button>
      </form>
      {loading && <p>Loading...</p>}
      {disorder && (
        <div>
          <h2>Possible Disorder:</h2>
          <p>{disorder}</p>
          <p>
            <strong>Disclaimer:</strong> <i> The result is for research purposes only and should not be
            interpreted as a diagnosis. If you are struggling with your mental health, please seek
            help from a mental health professional.</i>
          </p>
        </div>
      )}
    </div>
  );
};

export default SymptomInputForm;