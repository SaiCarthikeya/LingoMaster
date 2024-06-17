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
  }, 'food research.pdf': {
    summarizedText: 'Abstract:The demand for meat is increasing due to the growing global population, leading to unsustainable use of resources and environmental impact. Cultured meat, produced through in vitro cell culture of animal cells, offers a potential solution. This review examines the production, processing, commercialization, ethical concerns, and social acceptance of cultured meat.Introduction:Cultured meat, or lab-grown meat, involves cultivating animal cells in a controlled environment rather than slaughtering animals. The concept dates back to the 1950s with advancements in tissue engineering. Despite increasing meat production, the demand is expected to reach 455 million tonnes by 2050. Meats role in human evolution and diet has shifted from necessity to preference, driving technological advancements in food production.Historical Background:1950s: Concept of cultured meat introduced by Willem van Eelen.1998: Jon Vein filed a patent for tissue-engineered meat.2002: First edible lab-grown meat sample from goldfish cells.2013: First lab-grown beef hamburger consumed in London.2020: Singapore approved the first commercial sale of cultured chicken bites by Eat Just.Factors Driving Meat Demand:Population growth, urbanization, technological advancement, economic growth, and social factors contribute to increased meat demand. Livestock production consumes significant land, water, and energy resources, leading to environmental degradation and potential health risks.Benefits of Cultured Meat:Cultured meat addresses several issues associated with conventional meat:Animal Welfare: Reduces the need for animal slaughter.Resource Efficiency: Minimizes land, water, and energy use.Environmental Impact: Lowers greenhouse gas emissions and supports reforestation.Health Benefits: Reduces contamination and antibiotic use, allows nutrient customization.Challenges and Future Prospects:While cultured meat production currently requires high energy use, scaling up could reduce emissions and improve sustainability. Overcoming ethical, social, and economic barriers is essential for widespread adoption.Conclusion:Cultured meat presents a promising alternative to traditional meat, potentially mitigating environmental and ethical issues. Continued research and development are needed to make it a viable and sustainable option for future food security.Keywords:Cultured meat, Lab-grown meat, Tissue engineering, Food technology, Food bioprocessingDOI https://doi.org/10.26656/fr.2017.7(2).772The review highlights the necessity of cultured meat in addressing the growing meat demand and its associated problems, suggesting it as a sustainable alternative with significant potential benefits.',
    teluguSummary:'నైరూప్య:పెరుగుతున్న ప్రపంచ జనాభా కారణంగా మాంసం కోసం డిమాండ్ పెరుగుతోంది, ఇది వనరులను నిలకడలేని వినియోగానికి మరియు పర్యావరణ ప్రభావానికి దారితీస్తుంది. జంతు కణాల ఇన్ విట్రో సెల్ కల్చర్ ద్వారా ఉత్పత్తి చేయబడిన కల్చర్డ్ మాంసం, సంభావ్య పరిష్కారాన్ని అందిస్తుంది. ఈ సమీక్ష కల్చర్ మాంసం యొక్క ఉత్పత్తి, ప్రాసెసింగ్, వాణిజ్యీకరణ, నైతిక ఆందోళనలు మరియు సామాజిక అంగీకారాన్ని పరిశీలిస్తుంది.పరిచయం:కల్చర్డ్ మాంసం, లేదా ల్యాబ్-పెరిగిన మాంసం, జంతువులను వధించడం కంటే నియంత్రిత వాతావరణంలో జంతు కణాలను పండించడం. టిష్యూ ఇంజనీరింగ్‌లో పురోగతితో ఈ భావన 1950ల నాటిది. మాంసం ఉత్పత్తిని పెంచుతున్నప్పటికీ, డిమాండ్ 2050 నాటికి 455 మిలియన్ టన్నులకు చేరుకుంటుందని అంచనా. మానవ పరిణామం మరియు ఆహారంలో మాంసం పాత్ర అవసరం నుండి ప్రాధాన్యతకు మారింది, ఆహార ఉత్పత్తిలో సాంకేతిక పురోగమనాలకు దారితీసింది.చారిత్రక నేపథ్యం:1950లు: విల్లెం వాన్ ఈలెన్ పరిచయం చేసిన కల్చర్డ్ మీట్ కాన్సెప్ట్.1998: జోన్ వీన్ కణజాల-ఇంజనీరింగ్ మాంసం కోసం పేటెంట్‌ను దాఖలు చేశాడు.2002: గోల్డ్ ఫిష్ కణాల నుండి మొదటి తినదగిన ల్యాబ్-పెరిగిన మాంసం నమూనా.2013: లండన్‌లో వినియోగించబడిన మొదటి ల్యాబ్-పెరిగిన బీఫ్ హాంబర్గర్.2020: సింగపూర్ ఈట్ జస్ట్ ద్వారా కల్చర్డ్ చికెన్ బైట్స్ యొక్క మొదటి వాణిజ్య విక్రయాన్ని ఆమోదించింది.మాంసం డిమాండ్‌ని ప్రేరేపించే అంశాలు:జనాభా పెరుగుదల, పట్టణీకరణ, సాంకేతిక పురోగతి, ఆర్థిక వృద్ధి మరియు సామాజిక అంశాలు మాంసం డిమాండ్ పెరగడానికి దోహదం చేస్తాయి. పశువుల ఉత్పత్తి గణనీయమైన భూమి, నీరు మరియు శక్తి వనరులను వినియోగిస్తుంది, ఇది పర్యావరణ క్షీణత మరియు సంభావ్య ఆరోగ్య ప్రమాదాలకు దారితీస్తుంది.కల్చర్డ్ మాంసం యొక్క ప్రయోజనాలు:కల్చర్డ్ మాంసం సంప్రదాయ మాంసంతో సంబంధం ఉన్న అనేక సమస్యలను పరిష్కరిస్తుంది:జంతు సంరక్షణ: జంతు వధ అవసరాన్ని తగ్గిస్తుంది.వనరుల సామర్థ్యం: భూమి, నీరు మరియు శక్తి వినియోగాన్ని తగ్గిస్తుంది.పర్యావరణ ప్రభావం: గ్రీన్‌హౌస్ వాయు ఉద్గారాలను తగ్గిస్తుంది మరియు అటవీ నిర్మూలనకు మద్దతు ఇస్తుంది.ఆరోగ్య ప్రయోజనాలు: కాలుష్యం మరియు యాంటీబయాటిక్ వినియోగాన్ని తగ్గిస్తుంది, పోషక అనుకూలీకరణను అనుమతిస్తుంది.సవాళ్లు మరియు భవిష్యత్తు అవకాశాలు:కల్చర్డ్ మాంసం ఉత్పత్తికి ప్రస్తుతం అధిక శక్తి వినియోగం అవసరం అయితే, స్కేలింగ్ అప్ ఉద్గారాలను తగ్గిస్తుంది మరియు స్థిరత్వాన్ని మెరుగుపరుస్తుంది. విస్తృతమైన దత్తత కోసం నైతిక, సామాజిక మరియు ఆర్థిక అడ్డంకులను అధిగమించడం చాలా అవసరం.ముగింపు:కల్చర్డ్ మాంసం సాంప్రదాయ మాంసానికి మంచి ప్రత్యామ్నాయాన్ని అందిస్తుంది, ఇది పర్యావరణ మరియు నైతిక సమస్యలను సమర్థవంతంగా తగ్గిస్తుంది. భవిష్యత్ ఆహార భద్రత కోసం దీనిని ఆచరణీయమైన మరియు స్థిరమైన ఎంపికగా మార్చడానికి నిరంతర పరిశోధన మరియు అభివృద్ధి అవసరం.కీలకపదాలు:కల్చర్డ్ మాంసం, ల్యాబ్-పెరిగిన మాంసం, టిష్యూ ఇంజనీరింగ్, ఫుడ్ టెక్నాలజీ, ఫుడ్ బయోప్రాసెసింగ్పెరుగుతున్న మాంసం డిమాండ్ మరియు దాని సంబంధిత సమస్యలను పరిష్కరించడంలో కల్చర్డ్ మాంసం యొక్క ఆవశ్యకతను సమీక్ష హైలైట్ చేస్తుంది, ఇది గణనీయమైన సంభావ్య ప్రయోజనాలతో స్థిరమైన ప్రత్యామ్నాయంగా సూచిస్తుంది.',
    hindiSummary:'अमूर्त:बढ़ती वैश्विक आबादी के कारण मांस की मांग बढ़ रही है, जिससे संसाधनों का अस्थिर उपयोग और पर्यावरणीय प्रभाव पड़ रहा है। पशु कोशिकाओं के इन विट्रो सेल कल्चर के माध्यम से उत्पादित संवर्धित मांस एक संभावित समाधान प्रदान करता है। यह समीक्षा सुसंस्कृत मांस के उत्पादन, प्रसंस्करण, व्यावसायीकरण, नैतिक चिंताओं और सामाजिक स्वीकृति की जांच करती है।परिचय:संवर्धित मांस, या प्रयोगशाला में विकसित मांस में जानवरों को मारने के बजाय नियंत्रित वातावरण में पशु कोशिकाओं को विकसित करना शामिल है। यह अवधारणा ऊतक इंजीनियरिंग में प्रगति के साथ 1950 के दशक की है। मांस उत्पादन में वृद्धि के बावजूद, मांग 2050 तक 455 मिलियन टन तक पहुंचने की उम्मीद है। मानव विकास और आहार में मांस की भूमिका आवश्यकता से प्राथमिकता में स्थानांतरित हो गई है, जिससे खाद्य उत्पादन में तकनीकी प्रगति हुई है।ऐतिहासिक पृष्ठभूमि:1950 का दशक: विलेम वैन एलेन द्वारा सुसंस्कृत मांस की अवधारणा पेश की गई।1998: जॉन वेन ने ऊतक-इंजीनियर्ड मांस के लिए पेटेंट दायर किया।2002: सुनहरी मछली की कोशिकाओं से पहला खाद्य प्रयोगशाला में विकसित मांस का नमूना।2013: लंदन में प्रयोगशाला में निर्मित पहला बीफ़ हैमबर्गर खाया गया।2020: सिंगापुर ने ईट जस्ट द्वारा सुसंस्कृत चिकन बाइट्स की पहली व्यावसायिक बिक्री को मंजूरी दी।मांस की मांग को बढ़ाने वाले कारक:जनसंख्या वृद्धि, शहरीकरण, तकनीकी प्रगति, आर्थिक विकास और सामाजिक कारक मांस की मांग में वृद्धि में योगदान करते हैं। पशुधन उत्पादन में महत्वपूर्ण भूमि, पानी और ऊर्जा संसाधनों की खपत होती है, जिससे पर्यावरणीय गिरावट और संभावित स्वास्थ्य जोखिम पैदा होते हैं।संवर्धित मांस के लाभ:संवर्धित मांस पारंपरिक मांस से जुड़े कई मुद्दों का समाधान करता है:पशु कल्याण: पशु वध की आवश्यकता को कम करता है।संसाधन दक्षता: भूमि, पानी और ऊर्जा के उपयोग को कम करती है।पर्यावरणीय प्रभाव: ग्रीनहाउस गैस उत्सर्जन को कम करता है और पुनर्वनीकरण का समर्थन करता है।स्वास्थ्य लाभ: संदूषण और एंटीबायोटिक उपयोग को कम करता है, पोषक तत्वों के अनुकूलन की अनुमति देता है।चुनौतियाँ और भविष्य की संभावनाएँ:जबकि सुसंस्कृत मांस उत्पादन के लिए वर्तमान में उच्च ऊर्जा उपयोग की आवश्यकता होती है, इसे बढ़ाने से उत्सर्जन में कमी आ सकती है और स्थिरता में सुधार हो सकता है। व्यापक रूप से अपनाने के लिए नैतिक, सामाजिक और आर्थिक बाधाओं पर काबू पाना आवश्यक है।निष्कर्ष:संवर्धित मांस पारंपरिक मांस का एक आशाजनक विकल्प प्रस्तुत करता है, जो संभावित रूप से पर्यावरणीय और नैतिक मुद्दों को कम करता है। इसे भविष्य की खाद्य सुरक्षा के लिए व्यवहार्य और टिकाऊ विकल्प बनाने के लिए निरंतर अनुसंधान और विकास की आवश्यकता है।कीवर्ड:संवर्धित मांस, प्रयोगशाला में विकसित मांस, ऊतक इंजीनियरिंग, खाद्य प्रौद्योगिकी, खाद्य जैव प्रसंस्करणडीओआईसमीक्षा में मांस की बढ़ती मांग और उससे जुड़ी समस्याओं के समाधान के लिए सुसंस्कृत मांस की आवश्यकता पर प्रकाश डाला गया है और इसे महत्वपूर्ण संभावित लाभों के साथ एक स्थायी विकल्प के रूप में सुझाया गया है।',
  },
  'AIML.pdf':{
    summarizedText:'Audience:This guide is intended for current and future business leaders, particularly MBA students, who will make decisions related to AI and ML research and development.Purpose:The guide aims to promote responsible innovation practices in AI and ML by focusing on language equity and inclusion. It provides management strategies across the product lifecycle to address language use in coding, data labeling, and AI outputs.Importance:Language in AI systems can perpetuate harmful biases. This guide addresses the gap in management strategies to mitigate such biases, enhancing user trust, brand reputation, and aligning with ethical principles. Responsible AI leadership offers a competitive advantage and aligns with ESG investment framings.Development:The guide was developed through reviews of real-world business challenges, academic literature, and feedback from tech practitioners and MBA students.Usage Instructions:Understand Bias in AI: Familiarize yourself with the basics of AI bias and mitigation strategies.Read and Reflect: Identify relevant practices for your role and integrate them into your work.Take Action:Business leaders should incorporate the practices into product lifecycle plans and designate responsibilities.MBA students can start conversations, share the guide with professors, and engage in activities to deepen their understanding.Why Pay Attention:Advancing responsible language in AI helps operationalize ethical AI principles, enhances trust and reputation, and mitigates risks.Key Understandings:Words in code and data labeling matter and can perpetuate bias.AI systems learn from biased data and can reflect harmful human communication issues.Inclusive practices in language can improve AI system performance and equity.Good Practices:Purpose Reflection: Critically consider the purpose of NLP tools.AI Tech to Tackle Bias: Develop AI systems to identify and mitigate language bias.Community & Social Science Expertise: Collaborate with social scientists and community leaders.Skill Building for Teams: Develop team skills for responsible language practices.Inclusive Data Labeling Guidance: Write inclusive annotation guidelines for data labelers.Inclusive and Accurate Data Labeling: Ensure familiarity with language varieties in data labeling.Responsible Language Datasets: Ensure datasets represent target populations, track creation processes, and examine for biases.Responsible Coding Terms: Replace harmful terminology in code.Language Model Limitations: Recognize and evaluate limitations of off-the-shelf language models.This guide serves as a comprehensive resource for promoting equity and inclusion in AI and ML systems through responsible language practices.',
    teluguSummary:'ప్రేక్షకులు:ఈ గైడ్  మరియు  పరిశోధన మరియు అభివృద్ధికి సంబంధించిన నిర్ణయాలు తీసుకునే ప్రస్తుత మరియు భవిష్యత్తు వ్యాపార నాయకుల కోసం, ప్రత్యేకించి  విద్యార్థుల కోసం ఉద్దేశించబడింది. ఉద్దేశ్యం: మరియు లో భాషా సమానత్వంపై దృష్టి సారించడం ద్వారా బాధ్యతాయుతమైన ఆవిష్కరణ పద్ధతులను ప్రోత్సహించడం ఈ గైడ్ లక్ష్యం. చేర్చడం. కోడింగ్, డేటా లేబులింగ్ మరియు AI అవుట్‌పుట్‌లలో భాషా వినియోగాన్ని పరిష్కరించడానికి ఇది ఉత్పత్తి జీవితచక్రం అంతటా నిర్వహణ వ్యూహాలను అందిస్తుంది. ప్రాముఖ్యత: AI సిస్టమ్‌లలోని భాష హానికరమైన పక్షపాతాలను శాశ్వతం చేస్తుంది. ఈ గైడ్ అటువంటి పక్షపాతాలను తగ్గించడానికి, వినియోగదారు విశ్వాసాన్ని, బ్రాండ్ కీర్తిని మరియు నైతిక సూత్రాలకు అనుగుణంగా మెరుగుపరచడానికి నిర్వహణ వ్యూహాలలోని అంతరాన్ని పరిష్కరిస్తుంది. బాధ్యతాయుతమైన AI నాయకత్వం పోటీ ప్రయోజనాన్ని అందిస్తుంది మరియు ESG పెట్టుబడి ఫ్రేమ్‌లతో సమలేఖనం చేస్తుంది.అభివృద్ధి:వాస్తవిక వ్యాపార సవాళ్లు, విద్యాసంబంధ సాహిత్యం మరియు టెక్ ప్రాక్టీషనర్లు మరియు MBA విద్యార్థుల నుండి ఫీడ్‌బ్యాక్‌ల సమీక్షల ద్వారా గైడ్ అభివృద్ధి చేయబడింది. వినియోగ సూచనలు: లో పక్షపాతాన్ని అర్థం చేసుకోండి:  పక్షపాతం మరియు ఉపశమన వ్యూహాల ప్రాథమిక అంశాలతో మీరే చదవండి మరియు ప్రతిబింబించండి: మీ పాత్రకు సంబంధించిన సంబంధిత అభ్యాసాలను గుర్తించండి మరియు వాటిని మీ పనిలో ఏకీకృతం చేయండి. చర్య తీసుకోండి: వ్యాపార నాయకులు ప్రాక్టీస్‌లను ఉత్పత్తి జీవితచక్ర ప్రణాళికలలో చేర్చాలి మరియు బాధ్యతలను నియమించాలి.MBA విద్యార్థులు సంభాషణలను ప్రారంభించవచ్చు , ప్రొఫెసర్‌లతో గైడ్‌ను పంచుకోండి మరియు వారి అవగాహనను మరింతగా పెంచుకోవడానికి కార్యకలాపాలలో నిమగ్నం చేయండి. ఎందుకు శ్రద్ధ వహించండి: AIలో బాధ్యతాయుతమైన భాషను అభివృద్ధి చేయడం నైతిక AI సూత్రాలను అమలు చేయడంలో సహాయపడుతుంది, విశ్వాసం మరియు కీర్తిని పెంచుతుంది మరియు ప్రమాదాలను తగ్గిస్తుంది. కీలక అవగాహనలు: కోడ్ మరియు డేటా లేబులింగ్ విషయంలో పదాలు మరియు బయాస్‌ని శాశ్వతం చేయగలదు.AI సిస్టమ్‌లు పక్షపాత డేటా నుండి నేర్చుకుంటాయి మరియు హానికరమైన మానవ కమ్యూనికేషన్ సమస్యలను ప్రతిబింబించగలవు. భాషలో కలుపుకొని ఉన్న పద్ధతులు AI సిస్టమ్ పనితీరు మరియు ఈక్విటీని మెరుగుపరుస్తాయి. మంచి పద్ధతులు:ప్రయోజన ప్రతిబింబం: పక్షపాతాన్ని అధిగమించడానికి  సాంకేతికత  సాధనాల ప్రయోజనాన్ని విమర్శనాత్మకంగా పరిగణించండి. : భాషా పక్షపాతాన్ని గుర్తించడానికి మరియు తగ్గించడానికి  సిస్టమ్‌లను అభివృద్ధి చేయండి. కమ్యూనిటీ & సోషల్ సైన్స్ నైపుణ్యం: సామాజిక శాస్త్రవేత్తలు మరియు కమ్యూనిటీ నాయకులతో కలిసి పని చేయండి. బృందాల కోసం నైపుణ్యం పెంపొందించడం: బాధ్యతాయుతమైన భాషా అభ్యాసాల కోసం జట్టు నైపుణ్యాలను అభివృద్ధి చేయండి. డేటా లేబులింగ్ మార్గదర్శకత్వం: డేటా లేబులర్‌ల కోసం సమగ్ర ఉల్లేఖన మార్గదర్శకాలను వ్రాయండి .ఇంక్లూసివ్ మరియు ఖచ్చితమైన డేటా లేబులింగ్: డేటా లేబులింగ్‌లో భాషా రకాలతో పరిచయాన్ని నిర్ధారించండి.బాధ్యతగల భాషా డేటాసెట్‌లు: డేటాసెట్‌లు లక్ష్య జనాభాను సూచిస్తాయని, సృష్టి ప్రక్రియలను ట్రాక్ చేయండి మరియు పక్షపాతాలను పరిశీలిస్తుందని నిర్ధారించుకోండి.బాధ్యతాయుతమైన కోడింగ్ నిబంధనలు: కోడ్‌లో హానికరమైన పదజాలాన్ని భర్తీ చేయండి. భాషా నమూనా లిమిట్‌లను మార్చండి మరియు ఆఫ్-ది-షెల్ఫ్ భాషా నమూనాల పరిమితులను అంచనా వేయండి. ఈ గైడ్ బాధ్యతాయుతమైన భాషా అభ్యాసాల ద్వారా AI మరియు ML సిస్టమ్‌లలో ఈక్విటీ మరియు చేరికను ప్రోత్సహించడానికి సమగ్ర వనరుగా పనిచేస్తుంది.',
    hindiSummary:'श्रोता:यह मार्गदर्शिका वर्तमान और भविष्य के व्यावसायिक नेताओं, विशेष रूप से एमबीए छात्रों के लिए है, जो एआई और एमएल अनुसंधान और विकास से संबंधित निर्णय लेंगे।उद्देश्य:गाइड का उद्देश्य भाषा समानता और समावेशन पर ध्यान केंद्रित करके एआई और एमएल में जिम्मेदार नवाचार प्रथाओं को बढ़ावा देना है। यह कोडिंग, डेटा लेबलिंग और एआई आउटपुट में भाषा के उपयोग को संबोधित करने के लिए उत्पाद जीवनचक्र में प्रबंधन रणनीतियाँ प्रदान करता है।महत्त्व:एआई सिस्टम में भाषा हानिकारक पूर्वाग्रहों को कायम रख सकती है। यह मार्गदर्शिका ऐसे पूर्वाग्रहों को कम करने, उपयोगकर्ता विश्वास, ब्रांड प्रतिष्ठा बढ़ाने और नैतिक सिद्धांतों के साथ संरेखित करने के लिए प्रबंधन रणनीतियों में अंतर को संबोधित करती है। जिम्मेदार एआई नेतृत्व प्रतिस्पर्धात्मक लाभ प्रदान करता है और ईएसजी निवेश ढांचे के साथ संरेखित होता है।विकास:गाइड को वास्तविक दुनिया की व्यावसायिक चुनौतियों, अकादमिक साहित्य और तकनीकी पेशेवरों और एमबीए छात्रों की प्रतिक्रिया की समीक्षा के माध्यम से विकसित किया गया था।उपयोग निर्देश:एआई में पूर्वाग्रह को समझें: एआई पूर्वाग्रह और शमन रणनीतियों की बुनियादी बातों से खुद को परिचित करें।पढ़ें और विचार करें: अपनी भूमिका के लिए प्रासंगिक प्रथाओं की पहचान करें और उन्हें अपने काम में एकीकृत करें।कार्यवाही करना:व्यावसायिक नेताओं को उत्पाद जीवनचक्र योजनाओं में प्रथाओं को शामिल करना चाहिए और जिम्मेदारियाँ निर्दिष्ट करनी चाहिए।एमबीए छात्र बातचीत शुरू कर सकते हैं, प्रोफेसरों के साथ गाइड साझा कर सकते हैं और अपनी समझ को गहरा करने के लिए गतिविधियों में संलग्न हो सकते हैं।ध्यान क्यों दें:एआई में जिम्मेदार भाषा को आगे बढ़ाने से नैतिक एआई सिद्धांतों को क्रियान्वित करने में मदद मिलती है, विश्वास और प्रतिष्ठा बढ़ती है और जोखिम कम होते हैं।मुख्य समझ:कोड और डेटा लेबलिंग में शब्द मायने रखते हैं और पूर्वाग्रह को कायम रख सकते हैं। सिस्टम पक्षपाती डेटा से सीखते हैं और हानिकारक मानव संचार मुद्दों को प्रतिबिंबित कर सकते हैंभाषा में समावेशी अभ्यास से एआई प्रणाली के प्रदर्शन और समानता में सुधार हो सकता है।अच्छे आचरण:उद्देश्य प्रतिबिंब: एनएलपी टूल के उद्देश्य पर गंभीरता से विचार करें।पूर्वाग्रह से निपटने के लिए एआई तकनीक: भाषा पूर्वाग्रह को पहचानने और कम करने के लिए एआई सिस्टम विकसित करें।सामुदायिक एवं सामाजिक विज्ञान विशेषज्ञता: सामाजिक वैज्ञानिकों और सामुदायिक नेताओं के साथ सहयोग करें।टीमों के लिए कौशल निर्माण: जिम्मेदार भाषा प्रथाओं के लिए टीम कौशल विकसित करें।समावेशी डेटा लेबलिंग मार्गदर्शन: डेटा लेबलर्स के लिए समावेशी एनोटेशन दिशानिर्देश लिखें।समावेशी और सटीक डेटा लेबलिंग: डेटा लेबलिंग में भाषा की किस्मों से परिचित होना सुनिश्चित करें।जिम्मेदार भाषा डेटासेट: सुनिश्चित करें कि डेटासेट लक्ष्य आबादी का प्रतिनिधित्व करते हैं, निर्माण प्रक्रियाओं को ट्रैक करते हैं और पूर्वाग्रहों की जांच करते हैं।जिम्मेदार कोडिंग शर्तें: कोड में हानिकारक शब्दावली बदलें।भाषा मॉडल की सीमाएँ: ऑफ-द-शेल्फ भाषा मॉडल की सीमाओं को पहचानें और उनका मूल्यांकन करें।यह मार्गदर्शिका जिम्मेदार भाषा प्रथाओं के माध्यम से एआई और एमएल प्रणालियों में समानता और समावेशन को बढ़ावा देने के लिए एक व्यापक संसाधन के रूप में कार्य करती है।',
  },
  'Bringing%20True%20Colors%20to%20MicroLED%20Displays.pdf': {
    summarizedText:'The article discusses the advancements and challenges in metrology for microLED displays, a promising technology in the display industry. Tobias Steinel and Martin Wolf from Instrument Systems highlight how an imaging light measurement device (ILMD) combining a 150-megapixel RGB sensor and a high-end spectroradiometer can improve the speed and accuracy of microLED measurements. MicroLED displays offer superior performance in terms of brightness, size, and power efficiency, making them ideal for high-resolution, immersive experiences in devices such as AR/VR headsets.Quality control is crucial in microLED production to ensure uniformity in color and luminance across millions of individual pixels. The solution involves combining high-resolution cameras for fast, parallel measurements with spectroradiometers for accurate color data. The LumiTop X1503 device embodies this approach, using a 150-MP RGB-CMOS camera alongside a CAS 140D spectroradiometer, enabling precise and efficient testing. This setup addresses color variation issues and supports a wide range of display types and sizes.The LumiTop system captures high-resolution images of displays, with each pixel oversampled to create detailed luminance and color maps. These maps are then processed to evaluate display quality. This method ensures accurate and rapid testing, crucial for maintaining high-quality production standards. The article includes examples of the LumiTop systems effectiveness in capturing and analyzing display data.',
    teluguSummary:'డిస్‌ప్లే పరిశ్రమలో ఆశాజనక సాంకేతికత అయిన మైక్రోఎల్‌ఈడీ డిస్‌ప్లేల కోసం మెట్రాలజీలో పురోగతి మరియు సవాళ్లను వ్యాసం చర్చిస్తుంది. ఇన్‌స్ట్రుమెంట్ సిస్టమ్స్‌కు చెందిన టోబియాస్ స్టీనెల్ మరియు మార్టిన్ వోల్ఫ్ 150-మెగాపిక్సెల్ RGB సెన్సార్ మరియు హై-ఎండ్ స్పెక్ట్రోరాడియోమీటర్‌ని కలిపి ఇమేజింగ్ లైట్ మెజర్‌మెంట్ పరికరం (ILMD) మైక్రోLED కొలతల వేగం మరియు ఖచ్చితత్వాన్ని ఎలా మెరుగుపరుస్తుంది. MicroLED డిస్‌ప్లేలు ప్రకాశం, పరిమాణం మరియు శక్తి సామర్థ్యం పరంగా అత్యుత్తమ పనితీరును అందిస్తాయి, AR/VR హెడ్‌సెట్‌ల వంటి పరికరాలలో అధిక-రిజల్యూషన్, లీనమయ్యే అనుభవాలకు అనువైనవిగా ఉంటాయి.మిలియన్ల కొద్దీ వ్యక్తిగత పిక్సెల్‌లలో రంగు మరియు ప్రకాశంలో ఏకరూపతను నిర్ధారించడానికి మైక్రోLED ఉత్పత్తిలో నాణ్యత నియంత్రణ కీలకం. ఖచ్చితమైన రంగు డేటా కోసం స్పెక్ట్రోరాడియోమీటర్‌లతో వేగవంతమైన, సమాంతర కొలతల కోసం అధిక-రిజల్యూషన్ కెమెరాలను కలపడం ఈ పరిష్కారంలో ఉంటుంది.  స్పెక్ట్రోరేడియోమీటర్‌తో పాటు  కెమెరాను ఉపయోగించి ఈ విధానాన్ని కలిగి ఉంది, ఇది ఖచ్చితమైన మరియు సమర్థవంతమైన పరీక్షను అనుమతిస్తుంది. ఈ సెటప్ రంగు వైవిధ్య సమస్యలను పరిష్కరిస్తుంది మరియు విస్తృత శ్రేణి ప్రదర్శన రకాలు మరియు పరిమాణాలకు మద్దతు ఇస్తుంది. సిస్టమ్ డిస్‌ప్లేల యొక్క అధిక-రిజల్యూషన్ చిత్రాలను క్యాప్చర్ చేస్తుంది, ప్రతి పిక్సెల్ వివరణాత్మక ప్రకాశం మరియు రంగు మ్యాప్‌లను రూపొందించడానికి ఓవర్‌సాంపిల్ చేయబడింది. ప్రదర్శన నాణ్యతను అంచనా వేయడానికి ఈ మ్యాప్‌లు ప్రాసెస్ చేయబడతాయి. ఈ పద్ధతి ఖచ్చితమైన మరియు వేగవంతమైన పరీక్షను నిర్ధారిస్తుంది, అధిక-నాణ్యత ఉత్పత్తి ప్రమాణాలను నిర్వహించడానికి కీలకమైనది. డిస్‌ప్లే డేటాను క్యాప్చర్ చేయడంలో మరియు విశ్లేషించడంలో లూమిటాప్ సిస్టమ్ ప్రభావానికి సంబంధించిన ఉదాహరణలను కథనం కలిగి ఉంది',
    hindiSummary:'लेख माइक्रोएलईडी डिस्प्ले के लिए मेट्रोलॉजी में प्रगति और चुनौतियों पर चर्चा करता है, जो डिस्प्ले उद्योग में एक आशाजनक तकनीक है। इंस्ट्रूमेंट सिस्टम्स के टोबीस स्टीनल और मार्टिन वुल्फ इस बात पर प्रकाश डालते हैं कि कैसे 150-मेगापिक्सल आरजीबी सेंसर और एक हाई-एंड स्पेक्ट्रोरेडियोमीटर को मिलाकर एक इमेजिंग लाइट माप उपकरण (आईएलएमडी) माइक्रोएलईडी माप की गति और सटीकता में सुधार कर सकता है। माइक्रोएलईडी डिस्प्ले चमक, आकार और बिजली दक्षता के मामले में बेहतर प्रदर्शन प्रदान करते हैं, जो उन्हें एआर/वीआर हेडसेट जैसे उपकरणों में उच्च-रिज़ॉल्यूशन, इमर्सिव अनुभवों के लिए आदर्श बनाते हैं।लाखों व्यक्तिगत पिक्सेल में रंग और चमक में एकरूपता सुनिश्चित करने के लिए माइक्रोएलईडी उत्पादन में गुणवत्ता नियंत्रण महत्वपूर्ण है। समाधान में सटीक रंग डेटा के लिए स्पेक्ट्रोरेडियोमीटर के साथ तेज, समानांतर माप के लिए उच्च-रिज़ॉल्यूशन कैमरों का संयोजन शामिल है। LumiTop X1503 डिवाइस इस दृष्टिकोण को अपनाता है, जिसमें CAS 140D स्पेक्ट्रोरेडोमीटर के साथ 150-MP RGB-CMOS कैमरा का उपयोग किया जाता है, जो सटीक और कुशल परीक्षण को सक्षम बनाता है। यह सेटअप रंग भिन्नता के मुद्दों को संबोधित करता है और प्रदर्शन प्रकारों और आकारों की एक विस्तृत श्रृंखला का समर्थन करता है।ल्यूमीटॉप प्रणाली डिस्प्ले की उच्च-रिज़ॉल्यूशन छवियों को कैप्चर करती है, जिसमें प्रत्येक पिक्सेल को विस्तृत चमक और रंग मानचित्र बनाने के लिए ओवरसैंपल किया जाता है। फिर इन मानचित्रों को प्रदर्शन गुणवत्ता का मूल्यांकन करने के लिए संसाधित किया जाता है। यह विधि सटीक और तीव्र परीक्षण सुनिश्चित करती है, जो उच्च गुणवत्ता वाले उत्पादन मानकों को बनाए रखने के लिए महत्वपूर्ण है। लेख में डिस्प्ले डेटा को कैप्चर करने और उसका विश्लेषण करने में ल्यूमीटॉप सिस्टम की प्रभावशीलता के उदाहरण शामिल हैं।',
  },
  'AI_and_ML_Basics_Expanded.pdf':{
    summarizedText:'1. Introduction to Artificial IntelligenceArtificial Intelligence (AI) refers to machines simulating human intelligence, capable of tasks like visual perception, speech recognition, decision-making, and language translation.History and Evolution:1950s: Turing Test proposed by Alan Turing.1960s: First AI programs developed.1997: IBMs Deep Blue defeats chess champion Garry Kasparov.2011: IBMs Watson wins Jeopardy!2010s: Rise of machine learning and deep learning.2. Key Concepts and Terminology AI is classified into:Narrow AI: Systems designed for specific tasks (e.g., facial recognition).General AI: Systems with generalized human cognitive abilities.Superintelligent AI: Systems surpassing human intelligence.Important Terms:Neural Networks: Systems inspired by the human brain.Natural Language Processing (NLP): Enables machines to understand and respond to human language.3. Types of Machine LearningMachine Learning (ML): Development of algorithms for computers to learn from and predict data.Supervised Learning: Trained on labeled data (e.g., predicting house prices).Unsupervised Learning: Used on data without labels (e.g., clustering customers).Reinforcement Learning: Learning through interaction and feedback (e.g., training a robot to navigate a maze).Semi-supervised Learning: Combines labeled and unlabeled data.4. Algorithms and TechniquesCommon ML Algorithms:Linear Regression: Predicts continuous values.Decision Trees: Used for classification and regression tasks.Neural Networks: Suitable for complex pattern recognition tasks.',
    teluguSummary:'1. ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ పరిచయంఆర్టిఫిషియల్ ఇంటెలిజెన్స్ (AI) అనేది విజువల్ పర్సెప్షన్, స్పీచ్ రికగ్నిషన్, డెసిషన్ మేకింగ్ మరియు లాంగ్వేజ్ ట్రాన్స్‌లేషన్ వంటి పనులను చేయగల మానవ మేధస్సును అనుకరించే యంత్రాలను సూచిస్తుంది.చరిత్ర మరియు పరిణామం:1950లు: అలాన్ ట్యూరింగ్ ప్రతిపాదించిన ట్యూరింగ్ టెస్ట్.1960లు: మొదటి AI ప్రోగ్రామ్‌లు అభివృద్ధి చేయబడ్డాయి.1997: IBM యొక్క డీప్ బ్లూ చెస్ ఛాంపియన్ గ్యారీ కాస్పరోవ్‌ను ఓడించింది.2011: IBM యొక్క వాట్సన్ జియోపార్డీని గెలుచుకున్నాడు!2010లు: మెషిన్ లెర్నింగ్ మరియు డీప్ లెర్నింగ్ పెరుగుదల.2. కీలక భావనలు మరియు పదజాలంAI ఇలా వర్గీకరించబడింది:ఇరుకైన AI: నిర్దిష్ట పనుల కోసం రూపొందించబడిన సిస్టమ్‌లు (ఉదా., ముఖ గుర్తింపు).సాధారణ AI: సాధారణీకరించిన మానవ అభిజ్ఞా సామర్ధ్యాలు కలిగిన వ్యవస్థలు.సూపర్ ఇంటెలిజెంట్ AI: మానవ మేధస్సును అధిగమించే వ్యవస్థలు.ముఖ్యమైన నిబంధనలు:న్యూరల్ నెట్‌వర్క్‌లు: మానవ మెదడు నుండి ప్రేరణ పొందిన వ్యవస్థలు.సహజ భాషా ప్రాసెసింగ్ : మానవ భాషను అర్థం చేసుకోవడానికి మరియు ప్రతిస్పందించడానికి యంత్రాలను అనుమతిస్తుంది.3. మెషిన్ లెర్నింగ్ రకాలుమెషిన్ లెర్నింగ్ (ML): కంప్యూటర్లు డేటా నుండి తెలుసుకోవడానికి మరియు అంచనా వేయడానికి అల్గారిథమ్‌ల అభివృద్ధి.పర్యవేక్షించబడే అభ్యాసం: లేబుల్ చేయబడిన డేటాపై శిక్షణ పొందింది (ఉదా., ఇంటి ధరలను అంచనా వేయడం).పర్యవేక్షించబడని అభ్యాసం: లేబుల్‌లు లేకుండా డేటాపై ఉపయోగించబడుతుంది (ఉదా., క్లస్టరింగ్ కస్టమర్‌లు).ఉపబల అభ్యాసం: పరస్పర చర్య మరియు ఫీడ్‌బ్యాక్ ద్వారా నేర్చుకోవడం (ఉదా., చిట్టడవిలో నావిగేట్ చేయడానికి రోబోట్‌కు శిక్షణ ఇవ్వడం).సెమీ-పర్యవేక్షించబడిన అభ్యాసం: లేబుల్ చేయబడిన మరియు లేబుల్ చేయని డేటాను మిళితం చేస్తుంది.4. అల్గోరిథంలు మరియు సాంకేతికతలుసాధారణ ML అల్గోరిథంలు:లీనియర్ రిగ్రెషన్: నిరంతర విలువలను అంచనా వేస్తుందిడెసిషన్ ట్రీస్: వర్గీకరణ మరియు రిగ్రెషన్ పనుల కోసం ఉపయోగిస్తారు.న్యూరల్ నెట్‌వర్క్‌లు: సంక్లిష్ట నమూనా గుర్తింపు పనులకు అనుకూలం.',
    hindiSummary:'1. आर्टिफिशियल इंटेलिजेंस का परिचयआर्टिफिशियल इंटेलिजेंस (एआई) मानव बुद्धि का अनुकरण करने वाली मशीनों को संदर्भित करता है, जो दृश्य धारणा, भाषण पहचान, निर्णय लेने और भाषा अनुवाद जैसे कार्यों में सक्षम हैं।इतिहास और विकास:1950 का दशक: एलन ट्यूरिंग द्वारा प्रस्तावित ट्यूरिंग टेस्ट।1960 का दशक: पहला AI प्रोग्राम विकसित हुआ।1997: आईबीएम के डीप ब्लू ने शतरंज चैंपियन गैरी कास्परोव को हराया।2011: आईबीएम के वॉटसन ने जेपार्डी में जीत हासिल की!2010 का दशक: मशीन लर्निंग और डीप लर्निंग का उदय।2. प्रमुख अवधारणाएँ और शब्दावलीAI को इसमें वर्गीकृत किया गया है:नैरो एआई: विशिष्ट कार्यों (जैसे, चेहरे की पहचान) के लिए डिज़ाइन किए गए सिस्टम।सामान्य एआई: सामान्यीकृत मानव संज्ञानात्मक क्षमताओं वाले सिस्टम।सुपरइंटेलिजेंट एआई: मानव बुद्धि से बेहतर सिस्टम।महत्वपूर्ण शर्तें:तंत्रिका नेटवर्क: मानव मस्तिष्क से प्रेरित प्रणालियाँ।प्राकृतिक भाषा प्रसंस्करण (एनएलपी): मशीनों को मानव भाषा को समझने और प्रतिक्रिया देने में सक्षम बनाता है।3. मशीन लर्निंग के प्रकारमशीन लर्निंग (एमएल): डेटा से सीखने और भविष्यवाणी करने के लिए कंप्यूटर के लिए एल्गोरिदम का विकास।पर्यवेक्षित शिक्षण: लेबल किए गए डेटा पर प्रशिक्षित (उदाहरण के लिए, घर की कीमतों की भविष्यवाणी करना)।अनसुपरवाइज्ड लर्निंग: बिना लेबल वाले डेटा पर उपयोग किया जाता है (उदाहरण के लिए, क्लस्टरिंग ग्राहक)।सुदृढीकरण सीखना: बातचीत और फीडबैक के माध्यम से सीखना (उदाहरण के लिए, भूलभुलैया में नेविगेट करने के लिए रोबोट को प्रशिक्षित करना)।अर्ध-पर्यवेक्षित शिक्षण: लेबल किए गए और बिना लेबल वाले डेटा को संयोजित करता है।4. एल्गोरिदम और तकनीकेंसामान्य एमएल एल्गोरिदम:रैखिक प्रतिगमन: निरंतर मूल्यों की भविष्यवाणी करता है।निर्णय वृक्ष: वर्गीकरण और प्रतिगमन कार्यों के लिए उपयोग किया जाता है।तंत्रिका नेटवर्क: जटिल पैटर्न पहचान कार्यों के लिए उपयुक्त।',
  },
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
