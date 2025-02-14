import React, { useEffect, useRef, useState } from 'react';
import './Letter.css';

const Letter = () => {
    const cardRef = useRef(null);
    const containerRef = useRef(null);
    const envelopeRef = useRef(null);
    const frontRef = useRef(null);
    const shadowRef = useRef(null);
    const textRef = useRef(null);
    const heartRef = useRef(null);
    const [clickCount, setClickCount] = useState(0);
    const [isOpened, setIsOpened] = useState(false);
    const [newText, setNewText] = useState('');
    const [fade, setFade] = useState(false); // Controls fade effect

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;

        if (!card || !container) return;

        const handleMouseEnter = () => {
            if (clickCount === 0) {
                card.style.transform = 'translateY(-20px)';
                card.style.transition = 'transform 0.5s ease-in-out';
            }
        };

        const handleMouseLeave = () => {
            if (clickCount === 0) {
                card.style.transform = 'translateY(0)';
            }
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [clickCount]);

    const handleCardClick = () => {
        if (clickCount === 0) {
            if (cardRef.current) {
                cardRef.current.style.transform = 'translateY(-100px)';
                cardRef.current.style.transition = 'transform 0.5s ease-in-out';
            }
            setClickCount(1);
        } else if (clickCount === 1) {
            if (envelopeRef.current && frontRef.current) {
                envelopeRef.current.style.transform = 'translateY(100px)';
                frontRef.current.style.transform = 'translateY(100px)';
                envelopeRef.current.style.transition = 'transform 2s ease-in-out';
                frontRef.current.style.transition = 'transform 2s ease-in-out';
            }
            if (shadowRef.current) {
                shadowRef.current.style.opacity = '0';
                shadowRef.current.style.transition = 'opacity 2s ease-in-out';
            }
            setClickCount(2);
        } else if (clickCount === 2) {
            setIsOpened(true);
            updateText('Thank you for being the love of my life');
        } else if (clickCount === 3) {
            updateText('You have shown me so much love and kindness');
        } else if (clickCount === 4) {
            updateText('You have made my world shine so bright these past few years');
        } else if (clickCount === 5) {
            updateText('I will always love you');
        } else if (clickCount === 6) {
            updateText('Love, Kenny');
        }
    };

    const updateText = (text) => {
        setFade(false); // Hide text before change
        setTimeout(() => {
            setNewText(text);
            setFade(true); // Fade in new text
            setClickCount((prev) => prev + 1);
        }, 300); // Wait before changing text
    };

    return (
        <div className="container" ref={containerRef} onClick={handleCardClick}>
            <div className="letter">
                <div className="envelope" ref={envelopeRef}></div>
                <div className="front" ref={frontRef}></div>
                <div className={`card ${isOpened ? 'expand' : ''}`} ref={cardRef}>
                    <div className="text-container">
                        <div
                            className="text"
                            style={{ opacity: clickCount >= 3 ? 0 : 1 }}
                        >
                            Happy<br />Valentine's<br />Day
                        </div>
                        <div
                            className={`text-second ${fade ? 'show' : ''}`}
                            ref={textRef}
                        >
                            {newText}
                        </div>
                    </div>
                    <div className="heart" ref={heartRef}></div>
                </div>
                <div className="hearts">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                    <div className="four"></div>
                    <div className="five"></div>
                </div>
                <div className="shadow" ref={shadowRef}></div>
            </div>
        </div>
    );
};

export default Letter;
