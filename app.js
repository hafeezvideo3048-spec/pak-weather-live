// app.js - Daily Quotes PWA
const quotes = [
  "Success starts with self-belief.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Stay positive, work hard, make it happen.",
  "The secret of getting ahead is getting started.",
  "Dream big, start small, act now.",
  "Small steps every day lead to big changes.",
  "Consistency is what transforms average into excellence.",
  "You are stronger than your excuses.",
  "Turn your can'ts into cans and your dreams into plans.",
  "Don't watch the clock; do what it does — keep going."
];

const quoteEl = document.getElementById('quote');
const nextBtn = document.getElementById('nextBtn');
const shareBtn = document.getElementById('shareBtn');

function getRandomIndex(){
  return Math.floor(Math.random()*quotes.length);
}

function showQuote(idx){
  const q = quotes[idx ?? getRandomIndex()];
  quoteEl.textContent = q;
  // Save last quote index to localStorage so user returns see same one
  localStorage.setItem('lastQuoteIndex', idx ?? -1);
}

function newQuote(){
  const idx = getRandomIndex();
  showQuote(idx);
}

nextBtn.addEventListener('click', newQuote);

// Basic share functionality (Web Share API fallback to copying text)
shareBtn.addEventListener('click', async () => {
  const text = quoteEl.textContent;
  if (navigator.share) {
    try{
      await navigator.share({ title: 'Daily Quote', text });
    }catch(e){}
  } else {
    try{
      await navigator.clipboard.writeText(text);
      alert('Quote copied to clipboard');
    }catch(e){
      alert('Share not supported on this device');
    }
  }
});

// Load last shown quote if exists
(function init(){
  const last = parseInt(localStorage.getItem('lastQuoteIndex')||'-1', 10);
  if(last >= 0 && last < quotes.length){
    showQuote(last);
  } else {
    newQuote();
  }
})();
