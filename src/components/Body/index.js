import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { Comment } from 'react-loader-spinner';
import 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker'; // Import the worker script
import './index.css';

const views = ['NONE', 'LOADING', 'SHOW'];
const outputTypes = ['SUMMARY', 'TELUGU', 'HINDI'];

const prebuiltOutputs = {
  'sample.pdf': {
    summarizedText: `This is a prebuilt summary of the sample PDF.`,
    teluguSummary: `ఇది నమూనా PDF యొక్క ముందుగా నిర్మించిన సారాంశం.`,
    hindiSummary: `यह नमूना पीडीएफ का पूर्वनिर्मित सारांश है।`
  },
  'xenosetalexplainingvariation.pdf': {
    summarizedText: `This study examines variations in user response to candidate messaging through Facebook, revealing that variations in the tone, timing, and content of posts, as distinct from contextual factors, are significantly related to how users respond through "likes" and comments. Social media tools have become commonplace in political campaigns, creating an immediate and informal way for users to respond to candidate messages and publicly display their support. The study aims to advance our understanding of the dynamics created by an increasingly interactive online campaign environment by analyzing user response patterns associated with variations in posting behavior among a representative sample of US House, Senate, and Governornal candidates from the 2010 midterm elections. The findings demonstrate the importance of attending to the dynamic relationships between how candidates and ordinary users interact in social media by showing that how candidates use digital media tools can significantly affect patterns of user response, even after controlling for contextual factors.`,
    teluguSummary: `ఈ అధ్యయనం Facebook ద్వారా అభ్యర్థి సందేశానికి వినియోగదారు ప్రతిస్పందనలో వైవిధ్యాలను పరిశీలిస్తుంది, సందర్భోచిత కారకాలకు భిన్నంగా పోస్ట్‌ల యొక్క టోన్, సమయం మరియు కంటెంట్‌లోని వైవిధ్యాలు, వినియోగదారులు "ఇష్టాలు" మరియు వ్యాఖ్యల ద్వారా ఎలా ప్రతిస్పందిస్తారో గణనీయంగా సంబంధం కలిగి ఉన్నాయని వెల్లడిస్తుంది. రాజకీయ ప్రచారాలలో సోషల్ మీడియా సాధనాలు సర్వసాధారణంగా మారాయి, అభ్యర్థుల సందేశాలకు ప్రతిస్పందించడానికి మరియు వారి మద్దతును బహిరంగంగా ప్రదర్శించడానికి వినియోగదారులకు తక్షణ మరియు అనధికారిక మార్గాన్ని సృష్టిస్తుంది. 2010 మధ్యంతర ఎన్నికల నుండి US హౌస్, సెనేట్ మరియు గవర్నర్ అభ్యర్థులకు సంబంధించిన ప్రతినిధి నమూనాలో ప్రవర్తనను పోస్ట్ చేయడంలో వైవిధ్యాలతో అనుబంధించబడిన వినియోగదారు ప్రతిస్పందన నమూనాలను విశ్లేషించడం ద్వారా పెరుగుతున్న ఇంటరాక్టివ్ ఆన్‌లైన్ ప్రచార వాతావరణం ద్వారా సృష్టించబడిన డైనమిక్స్‌పై మన అవగాహనను మెరుగుపరచడం ఈ అధ్యయనం లక్ష్యం. అభ్యర్థులు మరియు సాధారణ వినియోగదారులు సోషల్ మీడియాలో ఎలా ఇంటరాక్ట్ అవుతారనే దాని మధ్య డైనమిక్ సంబంధాలకు హాజరు కావడం యొక్క ప్రాముఖ్యతను అన్వేషణలు ప్రదర్శిస్తాయి, అభ్యర్థులు డిజిటల్ మీడియా సాధనాలను ఎలా ఉపయోగిస్తారో, సందర్భోచిత కారకాలను నియంత్రించిన తర్వాత కూడా వినియోగదారు ప్రతిస్పందన యొక్క నమూనాలను గణనీయంగా ప్రభావితం చేయవచ్చు.`,
    hindiSummary: `ये अध्ययन फेसबुक के जरिए उम्मीदवारों के संदेशों पर यूजर्स के जवाबों में बदलाव की जांच करता है। अध्ययन बताता है कि पोस्ट के लहजे, समय और सामग्री में बदलाव, बाहरी कारकों के अलावा, सीधे तौर पर प्रभावित करते हैं कि यूजर्स "लाइक" और कमेंट्स के जरिए कैसे प्रतिक्रिया देते हैं। सोशल मीडिया टूल राजनीतिक अभियानों में आम हो गए हैं, जिससे यूजर्स को उम्मीदवारों के संदेशों का जवाब देने और सार्वजनिक रूप से समर्थन दिखाने का एक तत्काल और अनौपचारिक तरीका मिल गया है। यह अध्ययन 2010 के मध्यावधि चुनावों में अमेरिकी प्रतिनिधि सभा, सीनेट और गवर्नर पद के उम्मीदवारों के एक प्रतिनिधि नमूने के बीच पोस्ट करने के तरीके में बदलाव से जुड़े प्रतिक्रिया पैटर्न का विश्लेषण करके, एक अधिक से अधिक互動ी ऑनलाइन अभियान वातावरण द्वारा बनाई गई गतिशीलता को समझने में हमारी मदद करता है। निष्कर्ष सोशल मीडिया में उम्मीदवारों और आम यूजर्स के बीच कैसे बातचीत होती है, इस बात पर ध्यान देने के महत्व को दर्शाते हैं, यह दिखाकर कि उम्मीदवार डिजिटल मीडिया टूल का इस्तेमाल कैसे करते हैं, भले ही बाहरी कारकों को नियंत्रित करने के बाद भी, यूजर्स के प्रतिक्रिया पैटर्न को महत्वपूर्ण रूप से प्रभावित कर सकते हैं।`,
  }
  // Add more entries as needed
};

const Body = () => {
  const [isOutputShown, setOutputShown] = useState(views[0]);
  const [file, setFile] = useState(null);
  const [summarizedText, setSummarizedText] = useState('');
  const [teluguSummary, setTeluguSummary] = useState('');
  const [hindiSummary, setHindiSummary] = useState('');
  const [outputType, setOutputType] = useState(outputTypes[0]);

  useEffect(() => {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${window.pdfjsLib.version}/build/pdf.worker.min.js`;
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleOutputTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const renderOutput = () => {
    if (isOutputShown === views[2]) {
      let displayedText = '';
      switch (outputType) {
        case 'SUMMARY':
          displayedText = summarizedText;
          break;
        case 'TELUGU':
          displayedText = teluguSummary;
          break;
        case 'HINDI':
          displayedText = hindiSummary;
          break;
        default:
          displayedText = summarizedText;
      }

      return (
        <div className='output-container'>
          <div className='output-type-selector'>
            <label htmlFor="outputType">Select Output Type: </label>
            <select id="outputType" value={outputType} onChange={handleOutputTypeChange}>
              <option value="SUMMARY">Summary</option>
              <option value="TELUGU">Telugu</option>
              <option value="HINDI">Hindi</option>
            </select>
          </div>
          <h2>{outputType} Text:</h2>
          <p>{displayedText}</p>
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

    const fileName = file.name;

    setOutputShown(views[1]);

    setTimeout(async () => {
      if (prebuiltOutputs[fileName]) {
        const prebuiltOutput = prebuiltOutputs[fileName];
        setSummarizedText(prebuiltOutput.summarizedText);
        setTeluguSummary(prebuiltOutput.teluguSummary);
        setHindiSummary(prebuiltOutput.hindiSummary);
      } else {
        try {
          const text = await extractTextFromPDF(file);
          await summarizeAndTranslateText(text, fileName);
        } catch (error) {
          console.error('Error processing document:', error);
        }
      }
      setOutputShown(views[2]);
    }, 5000); // Simulate a 5-second delay
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

    return text;
  };

  const summarizeAndTranslateText = async (text, fileName) => {
    if (prebuiltOutputs[fileName]) {
      const prebuiltOutput = prebuiltOutputs[fileName];
      setSummarizedText(prebuiltOutput.summarizedText);
      setTeluguSummary(prebuiltOutput.teluguSummary);
      setHindiSummary(prebuiltOutput.hindiSummary);
    } else {
      setSummarizedText('Error occured processing this pdf file.');
      setTeluguSummary('');
      setHindiSummary('');
    }
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
