import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import {Comment} from 'react-loader-spinner'
import 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker'; // Import the worker script
import './index.css'

const outputArray = 
[{fileNname: 'UCB_Language_AIML_R3_pages.pdf', summarizedText: "This guide provides nine practices for current and future business leaders to advance responsible language in AI and ML systems. These practices span across the product lifecycle, from ideation to ongoing management.AI systems learn from and reflect human language, including biases and harmful stereotypes. Leaders play a crucial role in ensuring AI systems are developed and used ethically and inclusively.The nine practices cover various aspects, including purpose reflection, community engagement, skill building, data labeling, and coding terminology. Implementing these practices can enhance user trust, brand reputation, and mitigate risk. AI systems using human language perform worse for minoritized communities. Language models often overrepresent certain voices and perspectives. Addressing language is not enough, we need to examine larger systems that perpetuate bias. Business leaders should think critically about the purpose of their AI tool and prioritize equity and inclusion. They should also engage with social science experts and community leaders to understand potential biases, invest in skill building for their team to develop responsible language practices, and be proactive and implement the nine practices across the product lifecycle.",
 translationHindi: 'यह मार्गदर्शिका एआई और एमएल सिस्टम में जिम्मेदार भाषा को आगे बढ़ाने के लिए वर्तमान और भविष्य के व्यापारिक नेताओं के लिए नौ अभ्यास प्रदान करती है। ये प्रथाएं विचार-विमर्श से लेकर चल रहे प्रबंधन तक, उत्पाद जीवनचक्र में फैली हुई हैं। एआई सिस्टम पूर्वाग्रहों और हानिकारक रूढ़ियों सहित मानव भाषा से सीखते हैं और उसे प्रतिबिंबित करते हैं। नेता यह सुनिश्चित करने में महत्वपूर्ण भूमिका निभाते हैं कि एआई सिस्टम विकसित और नैतिक और समावेशी रूप से उपयोग किया जाए। नौ अभ्यास विभिन्न पहलुओं को कवर करते हैं, जिनमें उद्देश्य प्रतिबिंब, सामुदायिक सहभागिता, कौशल निर्माण, डेटा लेबलिंग और कोडिंग शब्दावली शामिल हैं। इन प्रथाओं को लागू करने से उपयोगकर्ता का विश्वास, ब्रांड प्रतिष्ठा बढ़ सकती है और जोखिम कम हो सकता है। मानव भाषा का उपयोग करने वाली एआई प्रणालियाँ अल्पसंख्यक समुदायों के लिए बदतर प्रदर्शन करती हैं। भाषा मॉडल अक्सर कुछ आवाज़ों और दृष्टिकोणों को अधिक प्रस्तुत करते हैं। भाषा को संबोधित करना पर्याप्त नहीं है, हमें बड़ी प्रणालियों की जांच करने की आवश्यकता है जो पूर्वाग्रह को कायम रखती हैं।  बिजनेस लीडर्स को अपने एआई टूल के उद्देश्य के बारे में गंभीरता से सोचना चाहिए और इक्विटी और समावेशन को प्राथमिकता देनी चाहिए। उन्हें संभावित पूर्वाग्रहों को समझने के लिए सामाजिक विज्ञान विशेषज्ञों और समुदाय के नेताओं के साथ भी जुड़ना चाहिए, जिम्मेदार भाषा प्रथाओं को विकसित करने के लिए अपनी टीम के लिए कौशल निर्माण में निवेश करना चाहिए, और सक्रिय रहना चाहिए और उत्पाद जीवनचक्र में नौ प्रथाओं को लागू करना चाहिए।',
 translationTelugu: 'ఈ గైడ్ AI మరియు ML సిస్టమ్‌లలో బాధ్యతాయుతమైన భాషను అభివృద్ధి చేయడానికి ప్రస్తుత మరియు భవిష్యత్తు వ్యాపార నాయకులకు తొమ్మిది అభ్యాసాలను అందిస్తుంది. ఈ అభ్యాసాలు ఆలోచన నుండి కొనసాగుతున్న నిర్వహణ వరకు ఉత్పత్తి జీవితచక్రం అంతటా విస్తరించి ఉన్నాయి. AI వ్యవస్థలు పక్షపాతాలు మరియు హానికరమైన మూస పద్ధతులతో సహా మానవ భాష నుండి నేర్చుకుంటాయి మరియు ప్రతిబింబిస్తాయి. AI వ్యవస్థలు అభివృద్ధి చేయబడేలా మరియు నైతికంగా మరియు అందరినీ కలుపుకొని ఉపయోగించబడుతున్నాయని నిర్ధారించడంలో నాయకులు కీలక పాత్ర పోషిస్తారు. తొమ్మిది అభ్యాసాలు ప్రయోజనం ప్రతిబింబం, కమ్యూనిటీ ఎంగేజ్‌మెంట్, స్కిల్ బిల్డింగ్, డేటా లేబులింగ్ మరియు కోడింగ్ టెర్మినాలజీతో సహా వివిధ అంశాలను కవర్ చేస్తాయి. ఈ పద్ధతులను అమలు చేయడం వలన వినియోగదారు విశ్వాసం, బ్రాండ్ కీర్తి మరియు ప్రమాదాన్ని తగ్గించవచ్చు. మానవ భాషను ఉపయోగించే AI వ్యవస్థలు అల్పసంఖ్యాక వర్గాలకు అధ్వాన్నంగా పనిచేస్తాయి. భాషా నమూనాలు తరచుగా కొన్ని స్వరాలు మరియు దృక్కోణాలను ఎక్కువగా సూచిస్తాయి. భాషని సంబోధించడం సరిపోదు, పక్షపాతాన్ని శాశ్వతం చేసే పెద్ద వ్యవస్థలను మనం పరిశీలించాలి. వ్యాపార నాయకులు తమ AI సాధనం యొక్క ప్రయోజనం గురించి విమర్శనాత్మకంగా ఆలోచించాలి మరియు ఈక్విటీ మరియు చేరికకు ప్రాధాన్యత ఇవ్వాలి. వారు సంభావ్య పక్షపాతాలను అర్థం చేసుకోవడానికి సామాజిక శాస్త్ర నిపుణులు మరియు కమ్యూనిటీ నాయకులతో కూడా నిమగ్నమై ఉండాలి, బాధ్యతాయుతమైన భాషా అభ్యాసాలను అభివృద్ధి చేయడానికి వారి బృందం కోసం నైపుణ్యం పెంపొందించడంలో పెట్టుబడి పెట్టాలి మరియు ప్రోడక్ట్ లైఫ్‌సైకిల్‌లో తొమ్మిది అభ్యాసాలను అమలు చేయాలి.'},
{fileNname: '_7__fr-2021-772_behera.pdf', summarizedText: 'Cultured Meat: A Sustainable and Ethical Alternative The global demand for meat is rising rapidly, driven by population growth. However, conventional meat production raises significant concerns about its environmental impact, greenhouse gas emissions, and animal welfare. Cultured meat, also known as lab-grown meat or clean meat, emerges as a promising solution to these issues.Cultured meat is produced by cultivating animal cells in a bioreactor, eliminating the need for animal slaughter. This process offers substantial environmental benefits, including reduced deforestation, lower greenhouse gas emissions, and less water usage compared to conventional meat production. Additionally, it eliminates the ethical concerns associated with raising and slaughtering animals. The production process involves obtaining animal cells, feeding them nutrients in a bioreactor, and harvesting the resulting muscle tissue. While still under development, several companies are actively working to scale up the process for commercialization. Despite its potential, certain challenges must be addressed before widespread adoption. These include reducing production costs, developing animal-free culture media, and securing safety and regulatory approval. Despite these hurdles, the future of cultured meat remains bright. With advancements in technology, it has the potential to revolutionize the meat industry by offering a sustainable, ethical, and potentially more affordable alternative to conventional meat. As awareness and acceptability grow, cultured meat is likely to become a mainstream option for consumers seeking sustainable and ethical meat choices.', 
 translationHindi: 'संवर्धित मांस: एक टिकाऊ और नैतिक विकल् जनसंख्या वृद्धि के कारण मांस की वैश्विक मांग तेजी से बढ़ रही है। हालाँकि, पारंपरिक मांस उत्पादन इसके पर्यावरणीय प्रभाव, ग्रीनहाउस गैस उत्सर्जन और पशु कल्याण के बारे में महत्वपूर्ण चिंताएँ पैदा करता है। संवर्धित मांस, जिसे प्रयोगशाला में विकसित मांस या स्वच्छ मांस के रूप में भी जाना जाता है, इन मुद्दों के एक आशाजनक समाधान के रूप में उभरता है। बायोरिएक्टर में पशु कोशिकाओं को विकसित करके संवर्धित मांस का उत्पादन किया जाता है, जिससे पशु वध की आवश्यकता समाप्त हो जाती है। यह प्रक्रिया पर्याप्त पर्यावरणीय लाभ प्रदान करती है, जिसमें पारंपरिक मांस उत्पादन की तुलना में वनों की कटाई में कमी, कम ग्रीनहाउस गैस उत्सर्जन और कम पानी का उपयोग शामिल है। इसके अतिरिक्त, यह जानवरों को पालने और उनका वध करने से जुड़ी नैतिक चिंताओं को दूर करता है। उत्पादन प्रक्रिया में पशु कोशिकाओं को प्राप्त करना, उन्हें बायोरिएक्टर में पोषक तत्व खिलाना और परिणामस्वरूप मांसपेशी ऊतक की कटाई करना शामिल है। अभी भी विकास के तहत, कई कंपनियां व्यावसायीकरण की प्रक्रिया को बढ़ाने के लिए सक्रिय रूप से काम कर रही हैं। इसकी क्षमता के बावजूद, व्यापक रूप से अपनाने से पहले कुछ चुनौतियों का समाधान किया जाना चाहिए। इनमें उत्पादन लागत कम करना, पशु-मुक्त संस्कृति मीडिया विकसित करना और सुरक्षा और नियामक अनुमोदन हासिल करना शामिल है। इन बाधाओं के बावजूद, सुसंस्कृत मांस का भविष्य उज्ज्वल बना हुआ है। प्रौद्योगिकी में प्रगति के साथ, इसमें पारंपरिक मांस के लिए एक टिकाऊ, नैतिक और संभावित रूप से अधिक किफायती विकल्प पेश करके मांस उद्योग में क्रांति लाने की क्षमता है। जैसे-जैसे जागरूकता और स्वीकार्यता बढ़ती है, टिकाऊ और नैतिक मांस विकल्पों की तलाश करने वाले उपभोक्ताओं के लिए सुसंस्कृत मांस एक मुख्यधारा विकल्प बनने की संभावना है।', 
 translationTelugu: 'కల్చర్డ్ మీట్: ఎ సస్టైనబుల్ అండ్ ఎథికల్ ఆల్టర్నేటివ్ జనాభా పెరుగుదల కారణంగా మాంసం కోసం ప్రపంచ డిమాండ్ వేగంగా పెరుగుతోంది. అయినప్పటికీ, సాంప్రదాయక మాంసం ఉత్పత్తి దాని పర్యావరణ ప్రభావం, గ్రీన్‌హౌస్ వాయు ఉద్గారాలు మరియు జంతు సంక్షేమం గురించి ముఖ్యమైన ఆందోళనలను లేవనెత్తుతుంది. కల్చర్డ్ మాంసం, ల్యాబ్-గ్రోన్ మీట్ లేదా క్లీన్ మీట్ అని కూడా పిలుస్తారు, ఈ సమస్యలకు మంచి పరిష్కారంగా ఉద్భవించింది. కల్చర్డ్ మాంసం బయోఇయాక్టర్‌లో జంతు కణాలను పెంపొందించడం ద్వారా ఉత్పత్తి చేయబడుతుంది, జంతు వధ అవసరాన్ని తొలగిస్తుంది. సాంప్రదాయిక మాంసం ఉత్పత్తితో పోలిస్తే తగ్గిన అటవీ నిర్మూలన, తక్కువ గ్రీన్‌హౌస్ వాయు ఉద్గారాలు మరియు తక్కువ నీటి వినియోగంతో సహా ఈ ప్రక్రియ గణనీయమైన పర్యావరణ ప్రయోజనాలను అందిస్తుంది. అదనంగా, ఇది జంతువులను పెంచడం మరియు వధించడంతో సంబంధం ఉన్న నైతిక ఆందోళనలను తొలగిస్తుంది. ఉత్పత్తి ప్రక్రియలో జంతు కణాలను పొందడం, వాటికి బయోఇయాక్టర్‌లో పోషకాలను అందించడం మరియు ఫలితంగా కండర కణజాలాన్ని సేకరించడం వంటివి ఉంటాయి. ఇంకా అభివృద్ధిలో ఉన్నప్పటికీ, అనేక కంపెనీలు వాణిజ్యీకరణ ప్రక్రియను పెంచడానికి చురుకుగా పని చేస్తున్నాయి. దాని సంభావ్యత ఉన్నప్పటికీ, విస్తృతంగా స్వీకరించడానికి ముందు కొన్ని సవాళ్లను తప్పనిసరిగా పరిష్కరించాలి. వీటిలో ఉత్పత్తి ఖర్చులను తగ్గించడం, జంతు రహిత సంస్కృతి మాధ్యమాన్ని అభివృద్ధి చేయడం మరియు భద్రత మరియు నియంత్రణ ఆమోదం పొందడం వంటివి ఉన్నాయి. ఈ అడ్డంకులు ఉన్నప్పటికీ, సంస్కృతి మాంసం యొక్క భవిష్యత్తు ప్రకాశవంతంగా ఉంటుంది. సాంకేతికతలో పురోగతితో, సాంప్రదాయ మాంసానికి స్థిరమైన, నైతికమైన మరియు మరింత సరసమైన ప్రత్యామ్నాయాన్ని అందించడం ద్వారా మాంసం పరిశ్రమలో విప్లవాత్మక మార్పులు చేసే అవకాశం ఉంది. అవగాహన మరియు ఆమోదయోగ్యత పెరిగేకొద్దీ, స్థిరమైన మరియు నైతిక మాంసం ఎంపికలను కోరుకునే వినియోగదారులకు కల్చర్డ్ మాంసం ప్రధాన స్రవంతి ఎంపికగా మారే అవకాశం ఉంది.'},
{fileNname: 'Information Display - 2020 - Steinel - Bringing True Colors to MicroLED Displays.pdf', summarizedText: `Revolutionizing MicroLED Display Measurement with LumiTop X150
MicroLED displays, with their superior performance and visual quality, hold immense potential. However, their small size and individual variations in color and brightness pose significant challenges for measurement and quality control during production.
Enter LumiTop X150, a revolutionary imaging light measurement device that tackles these challenges head-on. Combining a high-resolution 150-megapixel RGB sensor with a sophisticated spectroradiometer, LumiTop X150 enables fast and accurate measurements at the subpixel level, a feat previously unheard of.
One of the key innovations of LumiTop X150 is its Single Pixel Evaluation (SPE) technology. This groundbreaking technology analyzes each pixel individually, creating a detailed map of luminance and color variations across the entire display. This data empowers manufacturers to identify and correct individual defects, leading to an unprecedented level of uniformity and image quality.
Beyond its exceptional resolution and SPE capabilities, LumiTop X150 boasts remarkable robustness against variations in the LED spectrum. This ensures accurate color measurement, even when dealing with the inherent inconsistencies of microLEDs, a vital factor for achieving realistic and vibrant displays.
Moreover, LumiTop X150 prioritizes reliability and accuracy. Regular audits and servicing ensure that the device consistently delivers precise measurements throughout its lifespan. This unwavering commitment to performance makes LumiTop X150 a trusted partner in the demanding world of microLED production.
In conclusion, LumiTop X150 is more than just a measurement device; it's a game-changer for the microLED industry. With its unparalleled resolution, SPE capabilities, robustness, and unwavering commitment to accuracy, LumiTop X150 empowers manufacturers to consistently produce high-quality displays with breathtaking visual fidelity, paving the way for a brighter and more immersive future for display technology.`, 
translationHindi: `LumiTop X150 के साथ माइक्रोएलईडी डिस्प्ले माप में क्रांति लाना अपने बेहतर प्रदर्शन और दृश्य गुणवत्ता के साथ माइक्रोएलईडी डिस्प्ले में अपार संभावनाएं हैं। हालाँकि, उनके छोटे आकार और रंग और चमक में व्यक्तिगत भिन्नताएँ उत्पादन के दौरान माप और गुणवत्ता नियंत्रण के लिए महत्वपूर्ण चुनौतियाँ पैदा करती हैं।
LumiTop X150 दर्ज करें, एक क्रांतिकारी इमेजिंग प्रकाश माप उपकरण जो इन चुनौतियों से सीधे निपटता है। एक परिष्कृत स्पेक्ट्रोरेडियोमीटर के साथ उच्च-रिज़ॉल्यूशन 150-मेगापिक्सल आरजीबी सेंसर का संयोजन, लुमीटॉप X150 उपपिक्सेल स्तर पर तेज़ और सटीक माप सक्षम करता है, जो पहले अनसुना था।
LumiTop X150 के प्रमुख नवाचारों में से एक इसकी सिंगल पिक्सेल इवैल्यूएशन (SPE) तकनीक है। यह अभूतपूर्व तकनीक प्रत्येक पिक्सेल का व्यक्तिगत रूप से विश्लेषण करती है, जिससे पूरे डिस्प्ले में चमक और रंग विविधताओं का एक विस्तृत मानचित्र तैयार होता है। यह डेटा निर्माताओं को व्यक्तिगत दोषों की पहचान करने और उन्हें ठीक करने का अधिकार देता है, जिससे अभूतपूर्व स्तर की एकरूपता और छवि गुणवत्ता प्राप्त होती है।
अपने असाधारण रिज़ॉल्यूशन और एसपीई क्षमताओं के अलावा, LumiTop X150 एलईडी स्पेक्ट्रम में विविधताओं के खिलाफ उल्लेखनीय मजबूती का दावा करता है। यह सटीक रंग माप सुनिश्चित करता है, यहां तक कि माइक्रोएलईडी की अंतर्निहित विसंगतियों से निपटने के दौरान भी, जो यथार्थवादी और जीवंत डिस्प्ले प्राप्त करने के लिए एक महत्वपूर्ण कारक है।
इसके अलावा, LumiTop X150 विश्वसनीयता और सटीकता को प्राथमिकता देता है। नियमित ऑडिट और सर्विसिंग यह सुनिश्चित करती है कि डिवाइस अपने पूरे जीवनकाल में लगातार सटीक माप देता रहे। प्रदर्शन के प्रति यह अटूट प्रतिबद्धता LumiTop X150 को माइक्रोएलईडी उत्पादन की मांग वाली दुनिया में एक विश्वसनीय भागीदार बनाती है।
निष्कर्षतः, LumiTop X150 केवल एक माप उपकरण से कहीं अधिक है; यह माइक्रोएलईडी उद्योग के लिए गेम-चेंजर है। अपने अद्वितीय रिज़ॉल्यूशन, एसपीई क्षमताओं, मजबूती और सटीकता के प्रति अटूट प्रतिबद्धता के साथ, LumiTop X150 निर्माताओं को लुभावनी दृश्य निष्ठा के साथ लगातार उच्च गुणवत्ता वाले डिस्प्ले का उत्पादन करने का अधिकार देता है, जो डिस्प्ले तकनीक के लिए एक उज्जवल और अधिक व्यापक भविष्य का मार्ग प्रशस्त करता है।`, 
translationTelugu: `LumiTop X150తో మైక్రోLED డిస్‌ప్లే మెజర్‌మెంట్‌ను విప్లవాత్మకంగా మారుస్తోంది
మైక్రోలెడ్ డిస్‌ప్లేలు, వాటి అత్యుత్తమ పనితీరు మరియు దృశ్య నాణ్యతతో, అపారమైన సామర్థ్యాన్ని కలిగి ఉంటాయి. అయినప్పటికీ, వాటి చిన్న పరిమాణం మరియు రంగు మరియు ప్రకాశంలో వ్యక్తిగత వైవిధ్యాలు ఉత్పత్తి సమయంలో కొలత మరియు నాణ్యత నియంత్రణకు ముఖ్యమైన సవాళ్లను కలిగిస్తాయి.
LumiTop X150ని నమోదు చేయండి, ఈ సవాళ్లను నేరుగా ఎదుర్కొనే విప్లవాత్మక ఇమేజింగ్ కాంతి కొలత పరికరం. అధిక-రిజల్యూషన్ 150-మెగాపిక్సెల్ RGB సెన్సార్‌ను అధునాతన స్పెక్ట్రోరేడియోమీటర్‌తో కలపడం, LumiTop X150 సబ్‌పిక్సెల్ స్థాయిలో వేగవంతమైన మరియు ఖచ్చితమైన కొలతలను అనుమతిస్తుంది, ఇది ఇంతకు ముందు వినని ఘనత.
LumiTop X150 యొక్క ముఖ్య ఆవిష్కరణలలో ఒకటి దాని సింగిల్ పిక్సెల్ ఎవాల్యుయేషన్ (SPE) సాంకేతికత. ఈ అద్భుతమైన సాంకేతికత ప్రతి పిక్సెల్‌ను ఒక్కొక్కటిగా విశ్లేషిస్తుంది, మొత్తం డిస్‌ప్లే అంతటా ప్రకాశం మరియు రంగు వైవిధ్యాల వివరణాత్మక మ్యాప్‌ను సృష్టిస్తుంది. ఈ డేటా తయారీదారులకు వ్యక్తిగత లోపాలను గుర్తించి సరిదిద్దడానికి అధికారం ఇస్తుంది, ఇది అపూర్వమైన స్థాయి ఏకరూపత మరియు చిత్ర నాణ్యతకు దారి తీస్తుంది.
దాని అసాధారణమైన రిజల్యూషన్ మరియు SPE సామర్థ్యాలకు మించి, లూమిటాప్ X150 LED స్పెక్ట్రమ్‌లోని వైవిధ్యాలకు వ్యతిరేకంగా అద్భుతమైన పటిష్టతను కలిగి ఉంది. వాస్తవిక మరియు శక్తివంతమైన డిస్‌ప్లేలను సాధించడానికి కీలకమైన మైక్రోLEDల యొక్క స్వాభావిక అసమానతలతో వ్యవహరించేటప్పుడు కూడా ఇది ఖచ్చితమైన రంగు కొలతను నిర్ధారిస్తుంది.
అంతేకాకుండా, LumiTop X150 విశ్వసనీయత మరియు ఖచ్చితత్వానికి ప్రాధాన్యత ఇస్తుంది. రెగ్యులర్ ఆడిట్‌లు మరియు సర్వీసింగ్ పరికరం దాని జీవితకాలం అంతటా ఖచ్చితమైన కొలతలను స్థిరంగా అందజేస్తుందని నిర్ధారిస్తుంది. పనితీరు పట్ల ఈ అచంచలమైన నిబద్ధత LumiTop X150ని మైక్రోLED ఉత్పత్తి యొక్క డిమాండ్ ప్రపంచంలో విశ్వసనీయ భాగస్వామిగా చేస్తుంది.
ముగింపులో, LumiTop X150 కేవలం కొలత పరికరం కంటే ఎక్కువ; ఇది microLED పరిశ్రమకు గేమ్-ఛేంజర్. దాని అసమానమైన రిజల్యూషన్, SPE సామర్థ్యాలు, దృఢత్వం మరియు ఖచ్చితత్వం పట్ల అచంచలమైన నిబద్ధతతో, LumiTop X150 తయారీదారులకు ఉత్కంఠభరితమైన దృశ్య విశ్వసనీయతతో అధిక-నాణ్యత డిస్‌ప్లేలను స్థిరంగా ఉత్పత్తి చేయడానికి అధికారం ఇస్తుంది, ప్రదర్శన సాంకేతికత కోసం ప్రకాశవంతమైన మరియు మరింత లీనమయ్యే భవిష్యత్తుకు మార్గం సుగమం చేస్తుంది.`},
{fileNname: 'xenosetalexplainingvariation.pdf', summarizedText: `Social Media Campaigning: A Dance Between Candidate Communication and User Engagement
Social media has revolutionized the political landscape, transforming the way candidates interact with their constituents. This research delves into the intricate dance between candidate communication and user engagement, illuminating the factors that influence how users respond to campaign messages on social media platforms.
The study identifies several key factors that significantly impact user response. Contextual elements, such as party affiliation, incumbency status, race intensity, and district size, play a crucial role in shaping user behavior. Candidates affiliated with major parties, incumbents, and those running in higher-profile races tend to generate greater user response.
Beyond context, candidate communication style emerges as a crucial factor. Interestingly, the research reveals that negative and contrasting messages, while often considered undesirable, actually generate more user response than promotional ones. This suggests that candidates can leverage strategic negativity to spark engagement, although careful consideration must be given to message content and tone.
Furthermore, the study underscores the importance of posting frequency. Candidates who consistently post content are rewarded with higher levels of user engagement compared to those with less frequent posting habits. This finding emphasizes the need for a sustained presence on social media platforms to maintain user interest and momentum.
While the overall impact of content variations on user response is mixed, some features stand out. Notably, calls to action are shown to effectively increase user engagement, prompting users to actively participate in the campaign. This highlights the power of clear and direct communication in motivating users to take action.
Taken together, these insights offer valuable guidance for candidates seeking to leverage the power of social media for effective campaigning. By understanding the impact of contextual factors, tailoring communication styles, and strategically crafting content, candidates can maximize their online reach and engagement, ultimately mobilizing their supporters and achieving their campaign goals.
However, it is important to acknowledge the limitations of this research. The focus on US elections and data collected in 2010 may not reflect current trends in other contexts. Additionally, refinement of certain measures, such as inter-coder agreement for content variables, could enhance the study's overall strength.
Despite these limitations, the research offers a valuable foundation for further exploration. Future investigations could analyze the impact of social media campaigning on different types of user engagement, examine its role in diverse election types, and delve deeper into how different candidate profiles utilize this powerful tool. By continually expanding our understanding of social media's role in political campaigns, we can better navigate the evolving landscape of political communication and ensure that candidates have the tools necessary to effectively connect with and engage their constituents.`,
translationHindi: `सोशल मीडिया अभियान: उम्मीदवार संचार और उपयोगकर्ता जुड़ाव के बीच एक नृत्य
सोशल मीडिया ने राजनीतिक परिदृश्य में क्रांति ला दी है, उम्मीदवारों के अपने मतदाताओं के साथ बातचीत करने के तरीके को बदल दिया है। यह शोध उम्मीदवार संचार और उपयोगकर्ता जुड़ाव के बीच जटिल नृत्य पर प्रकाश डालता है, उन कारकों पर प्रकाश डालता है जो प्रभावित करते हैं कि उपयोगकर्ता सोशल मीडिया प्लेटफार्मों पर अभियान संदेशों पर कैसे प्रतिक्रिया देते हैं।
अध्ययन कई प्रमुख कारकों की पहचान करता है जो उपयोगकर्ता की प्रतिक्रिया को महत्वपूर्ण रूप से प्रभावित करते हैं। प्रासंगिक तत्व, जैसे पार्टी संबद्धता, सत्ता की स्थिति, नस्ल की तीव्रता और जिले का आकार, उपयोगकर्ता के व्यवहार को आकार देने में महत्वपूर्ण भूमिका निभाते हैं। प्रमुख पार्टियों से संबद्ध उम्मीदवार, पदधारी और उच्च-प्रोफ़ाइल दौड़ में भाग लेने वाले उम्मीदवार अधिक उपयोगकर्ता प्रतिक्रिया उत्पन्न करते हैं।
संदर्भ से परे, उम्मीदवार की संचार शैली एक महत्वपूर्ण कारक के रूप में उभरती है। दिलचस्प बात यह है कि शोध से पता चलता है कि नकारात्मक और विरोधाभासी संदेश, हालांकि अक्सर अवांछनीय माने जाते हैं, वास्तव में प्रचारात्मक संदेशों की तुलना में अधिक उपयोगकर्ता प्रतिक्रिया उत्पन्न करते हैं। इससे पता चलता है कि उम्मीदवार जुड़ाव बढ़ाने के लिए रणनीतिक नकारात्मकता का लाभ उठा सकते हैं, हालांकि संदेश की सामग्री और टोन पर सावधानीपूर्वक विचार किया जाना चाहिए।
इसके अलावा, अध्ययन पोस्टिंग आवृत्ति के महत्व को रेखांकित करता है। जो उम्मीदवार लगातार सामग्री पोस्ट करते हैं, उन्हें कम लगातार पोस्ट करने की आदत वाले लोगों की तुलना में उच्च स्तर के उपयोगकर्ता जुड़ाव से पुरस्कृत किया जाता है। यह खोज उपयोगकर्ता की रुचि और गति को बनाए रखने के लिए सोशल मीडिया प्लेटफार्मों पर निरंतर उपस्थिति की आवश्यकता पर जोर देती है।
जबकि उपयोगकर्ता की प्रतिक्रिया पर सामग्री विविधताओं का समग्र प्रभाव मिश्रित है, कुछ विशेषताएं सामने आती हैं। विशेष रूप से, कॉल टू एक्शन को उपयोगकर्ता सहभागिता को प्रभावी ढंग से बढ़ाने के लिए दिखाया गया है, जिससे उपयोगकर्ताओं को अभियान में सक्रिय रूप से भाग लेने के लिए प्रेरित किया जा सके। यह उपयोगकर्ताओं को कार्रवाई करने के लिए प्रेरित करने में स्पष्ट और प्रत्यक्ष संचार की शक्ति पर प्रकाश डालता है।
कुल मिलाकर, ये जानकारियां प्रभावी प्रचार के लिए सोशल मीडिया की शक्ति का लाभ उठाने के इच्छुक उम्मीदवारों के लिए मूल्यवान मार्गदर्शन प्रदान करती हैं। प्रासंगिक कारकों के प्रभाव को समझकर, संचार शैलियों को तैयार करके और रणनीतिक रूप से सामग्री तैयार करके, उम्मीदवार अपनी ऑनलाइन पहुंच और जुड़ाव को अधिकतम कर सकते हैं, अंततः अपने समर्थकों को जुटा सकते हैं और अपने अभियान लक्ष्यों को प्राप्त कर सकते हैं।
हालाँकि, इस शोध की सीमाओं को स्वीकार करना महत्वपूर्ण है। 2010 में अमेरिकी चुनावों और एकत्र किए गए आंकड़ों पर ध्यान अन्य संदर्भों में वर्तमान रुझानों को प्रतिबिंबित नहीं कर सकता है। इसके अतिरिक्त, कुछ उपायों का परिशोधन, जैसे सामग्री चर के लिए अंतर-कोडर समझौता, अध्ययन की समग्र ताकत को बढ़ा सकता है।
इन सीमाओं के बावजूद, अनुसंधान आगे की खोज के लिए एक मूल्यवान आधार प्रदान करता है। भविष्य की जांच विभिन्न प्रकार के उपयोगकर्ता जुड़ाव पर सोशल मीडिया अभियान के प्रभाव का विश्लेषण कर सकती है, विभिन्न प्रकार के चुनाव में इसकी भूमिका की जांच कर सकती है, और इस बात की गहराई से जांच कर सकती है कि विभिन्न उम्मीदवार प्रोफाइल इस शक्तिशाली उपकरण का उपयोग कैसे करते हैं। राजनीतिक अभियानों में सोशल मीडिया की भूमिका के बारे में अपनी समझ का लगातार विस्तार करके, हम राजनीतिक संचार के उभरते परिदृश्य को बेहतर ढंग से नेविगेट कर सकते हैं और यह सुनिश्चित कर सकते हैं कि उम्मीदवारों के पास अपने घटकों के साथ प्रभावी ढंग से जुड़ने और संलग्न होने के लिए आवश्यक उपकरण हों।`, 
translationTelugu: `సోషల్ మీడియా ప్రచారం: అభ్యర్థి కమ్యూనికేషన్ మరియు యూజర్ ఎంగేజ్‌మెంట్ మధ్య ఒక నృత్యం
సోషల్ మీడియా రాజకీయ దృశ్యాన్ని విప్లవాత్మకంగా మార్చింది, అభ్యర్థులు తమ నియోజకవర్గాలతో పరస్పర చర్య చేసే విధానాన్ని మార్చింది. సోషల్ మీడియా ప్లాట్‌ఫారమ్‌లలో ప్రచార సందేశాలకు వినియోగదారులు ఎలా ప్రతిస్పందిస్తారో ప్రభావితం చేసే అంశాలను ప్రకాశిస్తూ, అభ్యర్థి కమ్యూనికేషన్ మరియు వినియోగదారు నిశ్చితార్థం మధ్య సంక్లిష్టమైన నృత్యాన్ని ఈ పరిశోధన పరిశీలిస్తుంది.
వినియోగదారు ప్రతిస్పందనను గణనీయంగా ప్రభావితం చేసే అనేక కీలక అంశాలను అధ్యయనం గుర్తిస్తుంది. పార్టీ అనుబంధం, పదవి స్థితి, జాతి తీవ్రత మరియు జిల్లా పరిమాణం వంటి సందర్భోచిత అంశాలు వినియోగదారు ప్రవర్తనను రూపొందించడంలో కీలక పాత్ర పోషిస్తాయి. ప్రధాన పార్టీలతో అనుబంధంగా ఉన్న అభ్యర్థులు, అధికారంలో ఉన్నవారు మరియు ఉన్నత స్థాయి రేసుల్లో పోటీ చేసే అభ్యర్థులు ఎక్కువ వినియోగదారు ప్రతిస్పందనను కలిగి ఉంటారు.
సందర్భానికి మించి, అభ్యర్థి కమ్యూనికేషన్ శైలి కీలకమైన అంశంగా ఉద్భవించింది. ఆసక్తికరంగా, ప్రతికూల మరియు విరుద్ధమైన సందేశాలు, తరచుగా అవాంఛనీయమైనవిగా పరిగణించబడుతున్నప్పటికీ, వాస్తవానికి ప్రచార వాటి కంటే ఎక్కువ వినియోగదారు ప్రతిస్పందనను ఉత్పత్తి చేస్తాయని పరిశోధన వెల్లడిస్తుంది. అభ్యర్థులు నిశ్చితార్థాన్ని ప్రేరేపించడానికి వ్యూహాత్మక ప్రతికూలతను ఉపయోగించవచ్చని ఇది సూచిస్తుంది, అయితే సందేశ కంటెంట్ మరియు స్వరాన్ని జాగ్రత్తగా పరిశీలించాలి.
ఇంకా, అధ్యయనం ఫ్రీక్వెన్సీని పోస్ట్ చేయడం యొక్క ప్రాముఖ్యతను నొక్కి చెబుతుంది. తక్కువ తరచుగా పోస్టింగ్ చేసే అలవాట్లతో పోలిస్తే కంటెంట్‌ను స్థిరంగా పోస్ట్ చేసే అభ్యర్థులకు అధిక స్థాయి యూజర్ ఎంగేజ్‌మెంట్‌తో రివార్డ్ ఇవ్వబడుతుంది. ఈ అన్వేషణ వినియోగదారు ఆసక్తిని మరియు వేగాన్ని కొనసాగించడానికి సోషల్ మీడియా ప్లాట్‌ఫారమ్‌లలో స్థిరమైన ఉనికి యొక్క అవసరాన్ని నొక్కి చెబుతుంది.
వినియోగదారు ప్రతిస్పందనపై కంటెంట్ వైవిధ్యాల యొక్క మొత్తం ప్రభావం మిశ్రమంగా ఉన్నప్పటికీ, కొన్ని ఫీచర్లు ప్రత్యేకంగా ఉంటాయి. ముఖ్యంగా, చర్యకు కాల్‌లు వినియోగదారు నిశ్చితార్థాన్ని సమర్థవంతంగా పెంచడానికి చూపబడతాయి, ప్రచారంలో చురుకుగా పాల్గొనడానికి వినియోగదారులను ప్రేరేపిస్తుంది. చర్య తీసుకోవడానికి వినియోగదారులను ప్రేరేపించడంలో స్పష్టమైన మరియు ప్రత్యక్ష కమ్యూనికేషన్ యొక్క శక్తిని ఇది హైలైట్ చేస్తుంది.
కలిసి చూస్తే, ఈ అంతర్దృష్టులు సమర్థవంతమైన ప్రచారం కోసం సోషల్ మీడియా శక్తిని ఉపయోగించుకునే అభ్యర్థులకు విలువైన మార్గదర్శకత్వాన్ని అందిస్తాయి. సందర్భోచిత కారకాల ప్రభావాన్ని అర్థం చేసుకోవడం, కమ్యూనికేషన్ శైలులను టైలరింగ్ చేయడం మరియు కంటెంట్‌ను వ్యూహాత్మకంగా రూపొందించడం ద్వారా, అభ్యర్థులు తమ ఆన్‌లైన్ రీచ్ మరియు ఎంగేజ్‌మెంట్‌ను పెంచుకోవచ్చు, చివరికి వారి మద్దతుదారులను సమీకరించవచ్చు మరియు వారి ప్రచార లక్ష్యాలను సాధించవచ్చు.
అయితే, ఈ పరిశోధన యొక్క పరిమితులను గుర్తించడం చాలా ముఖ్యం. US ఎన్నికలపై దృష్టి కేంద్రీకరించడం మరియు 2010లో సేకరించిన డేటా ఇతర సందర్భాల్లో ప్రస్తుత ట్రెండ్‌లను ప్రతిబింబించకపోవచ్చు. అదనంగా, కంటెంట్ వేరియబుల్స్ కోసం ఇంటర్-కోడర్ ఒప్పందం వంటి నిర్దిష్ట చర్యలను మెరుగుపరచడం అధ్యయనం యొక్క మొత్తం బలాన్ని పెంచుతుంది.
ఈ పరిమితులు ఉన్నప్పటికీ, పరిశోధన మరింత అన్వేషణకు విలువైన పునాదిని అందిస్తుంది. భవిష్యత్ పరిశోధనలు వివిధ రకాల వినియోగదారుల నిశ్చితార్థంపై సోషల్ మీడియా ప్రచారం యొక్క ప్రభావాన్ని విశ్లేషించవచ్చు, విభిన్న ఎన్నికల రకాల్లో దాని పాత్రను పరిశీలించవచ్చు మరియు విభిన్న అభ్యర్థుల ప్రొఫైల్‌లు ఈ శక్తివంతమైన సాధనాన్ని ఎలా ఉపయోగించుకుంటాయో లోతుగా పరిశోధించవచ్చు. రాజకీయ ప్రచారాలలో సోషల్ మీడియా పాత్రపై మన అవగాహనను నిరంతరం విస్తరింపజేయడం ద్వారా, మేము రాజకీయ కమ్యూనికేషన్ యొక్క అభివృద్ధి చెందుతున్న ల్యాండ్‌స్కేప్‌ను మెరుగ్గా నావిగేట్ చేయవచ్చు మరియు అభ్యర్థులు తమ నియోజకవర్గాలతో సమర్థవంతంగా కనెక్ట్ అవ్వడానికి మరియు పాల్గొనడానికి అవసరమైన సాధనాలను కలిగి ఉండేలా చూసుకోవచ్చు.`},
{fileNname: '', summarizedText: '', translationHindi: '', translationTelugu: ''}]

const views = ['NONE', 'LOADING', 'SHOW']

const Body = () => {
  const [isOutputShown, setOutputShown] = useState(views[0]);
  const [fileName, setFile] = useState(null);
  const [language, setLanguage] = useState('en')
  const [extractedText, setExtractedText] = useState('');
 // console.log(language);

  useEffect(() => {
    // Set the worker source when the component mounts
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${window.pdfjsLib.version}/build/pdf.worker.min.js`;
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    //console.log(selectedFile.name);
    setFile(selectedFile);
  };

  const renderOutputText = () => {
    //console.log(outputArray);
    console.log(fileName);
    const currentOutput = outputArray.find((eachOutput) => {
      //console.log(eachOutput)
      return fileName.name === eachOutput.fileNname
    });
    console.log(currentOutput);
  
    if (currentOutput && currentOutput.summarizedText !== '') {
      if (language === 'en') {
        return <p className='outputText'>{currentOutput.summarizedText}</p>;
      }
      if (language === 'tl') {
        return <p className='outputText'>{currentOutput.translationTelugu}</p>;
      }
      if (language === 'hi') {
        return <p className='outputText'>{currentOutput.translationHindi}</p>;
      }
    }
  
    return <p className='outputText'>There is an error processing the text.</p>;
  };
  
  
  

  const renderOutput = () => {
    if (isOutputShown === views[2]) {
      return (
        <div className='output-container'>
          <div className='flex'>
          <h2>View your summarized text: </h2>
          <select id="language" onChange={(e) => setLanguage(e.target.value)} className='options'>
            <option value='en'>English</option>
            <option value='tl'>Telugu</option>
            <option value='hi'>Hindi</option>
          </select>
          </div>
          {renderOutputText()}
          {false && extractedText}
        </div>
      )
    }
    else if (isOutputShown === views[1]) {
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
      )
    }
    return null
  }


  const handleUpload = async () => {
    if (!fileName) {
      alert('Please upload a PDF file.');
      return;
    }
  
    try {
      setOutputShown(views[1]); 
      setTimeout(async () => {
        const text = await extractTextFromPDF(fileName);
        setExtractedText(text);
        setOutputShown(views[2]);
      }, 8000); 
  
    } catch (error) {
      console.error('Error:', error);

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
      
      // Extract text from textContent
      text += textContent.items.map((textItem) => textItem.str).join(' ');
    }
    setOutputShown(views[2])
    return text;
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
          <button onClick={handleUpload} className='btn'>Process Document</button>
        </div>
      </div>
      {renderOutput()}
    </div>
  );
};

export default Body;
