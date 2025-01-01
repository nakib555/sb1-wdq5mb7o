import { useState, useEffect } from 'react';

export function useTypingAnimation(text: string, speed: number = 10) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);

    const startDelay = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          // Process multiple characters per tick for faster typing
          const chunk = text.slice(index, index + 3); // Process 3 chars at once
          setDisplayedText(prev => prev + chunk);
          index += 3;
        } else {
          setIsTyping(false);
          setDisplayedText(text); // Ensure complete text is shown
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    }, 100); // Reduced initial delay

    return () => clearTimeout(startDelay);
  }, [text, speed]);

  return { displayedText, isTyping };
}