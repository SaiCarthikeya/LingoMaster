import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Comment } from 'react-loader-spinner';
import 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker'; // Import the worker script
import './index.css';

const views = ['NONE', 'LOADING', 'SHOW'];

const Body = () => {
  const [isOutputShown, setOutputShown] = useState(views[0]);
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
  const [teluguSummary, setTeluguSummary] = useState('');
  const [hindiSummary, setHindiSummary] = useState('');

  useEffect(() => {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${window.pdfjsLib.version}/build/pdf.worker.min.js`;
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const renderOutput = () => {
    if (isOutputShown === views[2]) {
      return (
        <div className='output-container'>
          <h2>Extracted Text:</h2>
          <p>{extractedText}</p>
          <h2>Summarized Text:</h2>
          <p>{summarizedText}</p>
          <h2>Telugu Summary:</h2>
          <p>{teluguSummary}</p>
          <h2>Hindi Summary:</h2>
          <p>{hindiSummary}</p>
        </div>
      );
    } else if (isOutputShown === views[1]) {
      return (
        <Comment
          visible={true}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="rgb(0, 166, 255)"
        />
      );
    }
    return null;
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please upload a PDF file.');
      return;
    }

    try {
      setOutputShown(views[1]);
      const text = await extractTextFromPDF(file);

      setExtractedText(text);

      await summarizeAndTranslateText(text);
    } catch (error) {
      console.error('Error processing document:', error);
    }
  };

  const extractTextFromPDF = async (pdfFile) => {
    const loadingTask = window.pdfjsLib.getDocument(URL.createObjectURL(pdfFile));
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    let text = '';

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      text += textContent.items.map((textItem) => textItem.str).join(' ');
    }

    setOutputShown(views[2]);
    return text;
  };

  const summarizeAndTranslateText = async (text) => {
    // const summary = await summarize(text);
    //   setSummarizedText(summary)  

    // const [teluguSummary, hindiSummary] = await Promise.all([
    //   translate(summary, { to: 'te' }),
    //   translate(summary, { to: 'hi' }),
    // ]);

    setTeluguSummary(teluguSummary.text);
    setHindiSummary(hindiSummary.text);
  };

  return (
    <div className='body-container'>
      <div className='input-container'>
        <h2 className='input-header'>Upload your document here...</h2>
        <div className="button-wrap">
          <label className="btn" htmlFor="upload">
            Upload File
          </label>
          <input
            id="upload"
            type="file"
            accept='application/pdf'
            onChange={handleFileChange}
          />
          <button onClick={handleUpload} className='btn'>
            Process Document
          </button>
        </div>
      </div>
      {renderOutput()}
    </div>
  );
};

export default Body;

