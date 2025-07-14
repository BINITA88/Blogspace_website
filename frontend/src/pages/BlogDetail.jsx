import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Calendar, Clock, Eye, Share2,
  Globe, BookOpen, ExternalLink
} from 'lucide-react';
import blo2 from '../assets/imgg/blo2.png';

  const newsData = [
    {
      id: 1,
      title: "प्रधानमन्त्री ओलीको भारत भ्रमण सफल, नयाँ सम्झौता हस्ताक्षर",
      englishTitle: "PM Oli's India visit successful, new agreements signed",
      excerpt: "प्रधानमन्त्री केपी शर्मा ओलीको तीनदिने भारत भ्रमण सफल भएको छ। भ्रमणका क्रममा दुई देशबीच महत्वपूर्ण सम्झौताहरू भएका छन्।",
      image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=500&h=300&fit=crop&auto=format",
      category: "राजनीति",
      language: "nepali",
      date: "२०८२ असार २९",
      time: "२:४५ बजे",
      views: "२५,३४२",
      source: "eKantipur",
      sourceUrl: "https://ekantipur.com",
      fullContent: "प्रधानमन्त्री केपी शर्मा ओलीको तीनदिने भारत भ्रमण सफल भएको छ। भ्रमणका क्रममा दुई देशबीच महत्वपूर्ण सम्झौताहरू भएका छन्। विशेष गरी व्यापार, यातायात र ऊर्जा क्षेत्रमा नयाँ सहयोग सम्झौता भएको छ। प्रधानमन्त्री ओलीले भारतीय समकक्षीसँग द्विपक्षीय सम्बन्ध अझ मजबुत बनाउने विषयमा छलफल गरेका छन्। यस भ्रमणले नेपाल-भारत सम्बन्धमा नयाँ आयाम थप्ने अपेक्षा गरिएको छ।",
      sources: [
        { name: "eKantipur", url: "https://ekantipur.com" },
        { name: "Online Khabar", url: "https://onlinekhabar.com" },
        { name: "Setopati", url: "https://setopati.com" },
        { name: "Ratopati", url: "https://ratopati.com" }
      ]
    },
    {
      id: 2,
      title: "Nepal's Economy Shows Strong Recovery Signs",
      nepaliTitle: "नेपालको अर्थतन्त्रमा सुधारका संकेत",
      excerpt: "Latest economic indicators suggest Nepal's economy is showing robust recovery with GDP growth projected at 6.5% for the current fiscal year.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&h=300&fit=crop&auto=format",
      category: "Economy",
      language: "english",
      date: "July 13, 2025",
      time: "1:30 PM",
      views: "18,756",
      source: "Kathmandu Post",
      sourceUrl: "https://kathmandupost.com",
      fullContent: "Latest economic indicators suggest Nepal's economy is showing robust recovery with GDP growth projected at 6.5% for the current fiscal year. The positive trends are attributed to increased remittances, growing tourism sector, and improved agricultural production. Finance Minister expressed optimism about meeting the fiscal targets set for this year. Export figures have also shown improvement, particularly in the textile and handicraft sectors. International monetary organizations have praised Nepal's economic reform initiatives.",
      sources: [
        { name: "Kathmandu Post", url: "https://kathmandupost.com" },
        { name: "Himalayan Times", url: "https://thehimalayantimes.com" },
        { name: "My Republica", url: "https://myrepublica.nagariknetwork.com" },
        { name: "Business Standard", url: "https://www.business-standard.com" }
      ]
    },
    {
      id: 3,
      title: "काठमाडौंमा मेट्रो रेलको काम सुरु, यातायात क्रान्तिको सुरुवात",
      englishTitle: "Metro rail work begins in Kathmandu, transportation revolution starts",
      excerpt: "राजधानी काठमाडौंमा मेट्रो रेलको निर्माण कार्य औपचारिक रूपमा सुरु भएको छ। यो परियोजनाले यातायात क्षेत्रमा ठूलो परिवर्तन ल्याउने अपेक्षा गरिएको छ।",
      image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400&h=250&fit=crop",
      category: "पूर्वाधार",
      language: "nepali",
      date: "२०८२ असार २९",
      time: "११:१५ बजे",
      views: "३२,८९१",
      source: "Online Khabar",
      sourceUrl: "https://onlinekhabar.com",
      fullContent: "राजधानी काठमाडौंमा मेट्रो रेलको निर्माण कार्य औपचारिक रूपमा सुरु भएको छ। यो परियोजनाले यातायात क्षेत्रमा ठूलो परिवर्तन ल्याउने अपेक्षा गरिएको छ। मेट्रो रेलको पहिलो चरणमा काठमाडौं उपत्यकाका मुख्य स्थानहरू जोड्ने गरी निर्माण हुनेछ। यस परियोजनाले दैनिक लाखौं यात्रुहरूलाई सुविधा पुर्याउने र ट्राफिक जाम कम गर्ने अपेक्षा गरिएको छ। अन्तर्राष्ट्रिय सहयोगमा यो परियोजना सम्पन्न हुने बताइएको छ।",
      sources: [
        { name: "Online Khabar", url: "https://onlinekhabar.com" },
        { name: "Setopati", url: "https://setopati.com" },
        { name: "Nagarik News", url: "https://nagariknews.nagariknetwork.com" },
        { name: "Annapurna Post", url: "https://annapurnapost.com" }
      ]
    },
    {
      id: 4,
      title: "Mount Everest Tourism Breaks Record This Season",
      nepaliTitle: "यस सिजन सगरमाथा पर्यटनले तोड्यो कीर्तिमान",
      excerpt: "This climbing season has witnessed unprecedented number of climbers attempting to summit Mount Everest, generating significant revenue for Nepal's tourism industry.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&auto=format",
      category: "Tourism",
      language: "english",
      date: "July 13, 2025",
      time: "10:45 AM",
      views: "45,623",
      source: "Himalayan Times",
      sourceUrl: "https://thehimalayantimes.com",
      fullContent: "This climbing season has witnessed unprecedented number of climbers attempting to summit Mount Everest, generating significant revenue for Nepal's tourism industry. Over 600 climbers have successfully reached the summit this season, breaking previous records. The Tourism Ministry reported that mountaineering permits have generated over $5 million in revenue. International climbers have praised Nepal's improved safety measures and infrastructure development in the Everest region. The success has boosted confidence in Nepal's adventure tourism sector.",
      sources: [
        { name: "Himalayan Times", url: "https://thehimalayantimes.com" },
        { name: "Kathmandu Post", url: "https://kathmandupost.com" },
        { name: "My Republica", url: "https://myrepublica.nagariknetwork.com" },
        { name: "Tourism Board", url: "https://welcomenepal.com" }
      ]
    },
    {
        id: 5,
        title: "नेपाली खेलकुदको वृत्तान्त",
        englishTitle: "The Chronicle of Nepali Sports",
        excerpt: "काठमाडौं — प्रकाशक क्रियटिभ बुक्सले खेल पत्रकार नवीन अर्यालद्वारा लिखित, शरदचन्द्र शाह मेमोरियल फाउन्डेसनको सहयोगमा यसै महिना सार्वजनिक हुन लागेको, नेपाली खेलकुदको समग्र इतिहास उजागर गर्ने खोजमूलक कृति ‘नेपाली खेलकुदको वृत्तान्त’ प्रकाशन गर्न लागेको छ। पुस्तकमा नेपालको पहिलो अन्तर्राष्ट्रिय सहभागितादेखि हालसम्मको खेलकुद वृत्तान्त समेटिएको छ, जहाँ नेपाली खेल क्षेत्रले पदक जितका लागि गरेको संघर्षको कथा र खेल यात्राको वर्णन गरिएको छ। यस्तै सीमित साधन स्रोतका बाबजुद नेपालको घरेलु खेलकुदलाई संस्थागत र संरचनागत रूपमा बलियो बनाउन तत्कालीन नेतृत्वले खेलेको भूमिका र योगदानलाई पनि लिपिबद्ध गरिएको छ।",
        image: blo2,
        category: "खेलकुद",
        language: "nepali",
        date: "२०८२ असार २९",
        time: "९:०० बजे",
        views: "५८,७४२",
        source: "Setopati",
        sourceUrl: "https://setopati.com",
        fullContent:"काठमाडौं — प्रकाशक क्रियटिभ बुक्सले खेल पत्रकार नवीन अर्यालद्वारा लिखित, शरदचन्द्र शाह मेमोरियल फाउन्डेसनको सहयोगमा यसै महिना सार्वजनिक हुन लागेको, नेपाली खेलकुदको समग्र इतिहास उजागर गर्ने खोजमूलक कृति ‘नेपाली खेलकुदको वृत्तान्त’ प्रकाशन गर्न लागेको छ। पुस्तकमा नेपालको पहिलो अन्तर्राष्ट्रिय सहभागितादेखि हालसम्मको खेलकुद वृत्तान्त समेटिएको छ, जहाँ नेपाली खेल क्षेत्रले पदक जितका लागि गरेको संघर्षको कथा र खेल यात्राको वर्णन गरिएको छ। यस्तै सीमित साधन स्रोतका बाबजुद नेपालको घरेलु खेलकुदलाई संस्थागत र संरचनागत रूपमा बलियो बनाउन तत्कालीन नेतृत्वले खेलेको भूमिका र योगदानलाई पनि लिपिबद्ध गरिएको छ।",
        sources: [
          { name: "Setopati", url: "https://setopati.com" },
          { name: "Ratopati", url: "https://www.ratopati.com/story/370344/sports-book" },
          { name: "Online Khabar", url: "https://onlinekhabar.com" },
          { name: "Sports Khabar", url: "https://sportskhabar.com" }
        ]
      },
    {
      id: 6,
      title: "Tech Innovation Hub Launched in Kathmandu",
      nepaliTitle: "काठमाडौंमा प्रविधि नवाचार केन्द्र स्थापना",
      excerpt: "A new technology innovation hub has been inaugurated in Kathmandu, aimed at fostering startup ecosystem and digital innovation in Nepal.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop&auto=format",
      category: "Technology",
      language: "english",
      date: "July 13, 2025",
      time: "8:20 AM",
      views: "29,438",
      source: "My Republica",
      sourceUrl: "https://myrepublica.nagariknetwork.com",
      fullContent: "A new technology innovation hub has been inaugurated in Kathmandu, aimed at fostering startup ecosystem and digital innovation in Nepal. The hub will provide workspace, mentorship, and funding opportunities for tech entrepreneurs. Government officials emphasized the importance of digital transformation in Nepal's economic growth. The facility includes modern co-working spaces, meeting rooms, and state-of-the-art technology infrastructure. International tech companies have expressed interest in collaborating with Nepali startups through this platform.",
      sources: [
        { name: "My Republica", url: "https://myrepublica.nagariknetwork.com" },
        { name: "Kathmandu Post", url: "https://kathmandupost.com" },
        { name: "Tech Khabar", url: "https://techkhabar.com" },
        { name: "Digital Nepal", url: "https://digitalnepal.com" }
      ]
    }
  ];
const getCategoryColor = (category) => {
  const colors = {
    'राजनीति': 'bg-red-100 text-red-800 border-red-200',
    'Politics': 'bg-red-100 text-red-800 border-red-200',
    'पूर्वाधार': 'bg-blue-100 text-blue-800 border-blue-200',
    'Infrastructure': 'bg-blue-100 text-blue-800 border-blue-200',
    'अर्थतन्त्र': 'bg-green-100 text-green-800 border-green-200',
    'Economy': 'bg-green-100 text-green-800 border-green-200',
    'खेलकुद': 'bg-purple-100 text-purple-800 border-purple-200',
    'Sports': 'bg-purple-100 text-purple-800 border-purple-200',
    'Tourism': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Technology': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedNews = newsData.find((news) => news.id === parseInt(id));

  if (!selectedNews) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl font-bold text-red-600">News not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Logo and Go Back */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
        
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(selectedNews.category)}`}>
                {selectedNews.category}
              </span>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{selectedNews.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{selectedNews.time}</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedNews.title}</h2>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span>स्रोत: {selectedNews.source}</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg mb-6 first-letter:text-6xl first-letter:font-bold first-letter:text-gray-900 first-letter:float-left first-letter:mr-3 first-letter:mt-2">
                {selectedNews.fullContent}
              </p>
            </div>

            {/* Additional Sources */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#179ca4]">
                <BookOpen className="w-5 h-5" />
                {selectedNews.language === 'nepali' ? 'थप स्रोतहरू' : 'Additional Sources'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedNews.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#179ca4]/10 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-[#179ca4]" />
                      </div>
                      <span className="font-medium text-gray-900">{source.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#179ca4] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
