import { useEffect, useState } from 'react';

const Preloader = ({ className = '' }) => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fadeOutDelay = 400;
    const fadeDuration = 700;

    const timer1 = setTimeout(() => setOpacity(0), fadeOutDelay);
    const timer2 = setTimeout(() => setVisible(false), fadeOutDelay + fadeDuration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  const bookColor = "#1a1a1a";
  const backgroundColor = "#159e9e"
;
  const pageCount = 18;

  const pages = Array.from({ length: pageCount }, (_, i) => (
    <li key={i} style={{
      height: "4px",
      borderRadius: "2px",
      width: "48px",
      right: 0,
      top: "-10px",
      position: "absolute",
      background: bookColor,
      transform: "rotateZ(0deg) translateX(-18px)",
      animation: `page-${i} 6.8s ease infinite`,
      transformOrigin: "100% 2px"
    }} />
  ));

  const keyframes = `
    @keyframes left {
      4% { transform: rotateZ(90deg); }
      10%, 40% { transform: rotateZ(0deg); }
      46%, 54% { transform: rotateZ(90deg); }
      60%, 90% { transform: rotateZ(0deg); }
      96% { transform: rotateZ(90deg); }
    }

    @keyframes right {
      4% { transform: rotateZ(-90deg); }
      10%, 40% { transform: rotateZ(0deg); }
      46%, 54% { transform: rotateZ(-90deg); }
      60%, 90% { transform: rotateZ(0deg); }
      96% { transform: rotateZ(-90deg); }
    }

    @keyframes book {
      4% { transform: rotateZ(-90deg); }
      10%, 40% { transform: rotateZ(0deg); transform-origin: 2px 2px; }
      40.01%, 59.99% { transform-origin: 30px 2px; }
      46%, 54% { transform: rotateZ(90deg); }
      60%, 90% { transform: rotateZ(0deg); transform-origin: 2px 2px; }
      96% { transform: rotateZ(-90deg); }
    }

    ${Array.from({ length: pageCount }, (_, i) => {
      const delay = i * 1.86;
      const delayAfter = i * 1.74;
      return `
        @keyframes page-${i} {
          ${4 + delay}% { transform: rotateZ(0deg) translateX(-18px); }
          ${13 + delayAfter}%, ${37 + delay}% { transform: rotateZ(180deg) translateX(-18px); }
          ${63 + delayAfter}% { transform: rotateZ(0deg) translateX(-18px); }
          100% { transform: rotateZ(0deg) translateX(-18px); }
        }
      `;
    }).join('\n')}
  `;

  return (
    <div
      className={`preloader ${className}`}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 99999999,
        background: backgroundColor,
        opacity,
        transition: "opacity 0.7s ease"
      }}
    >
      <style>{keyframes}</style>
      <div
        className="preloader__book"
        style={{
          width: "32px",
          height: "12px",
          position: "relative",
          marginTop: "32px",
          zoom: 1.5,
          color: bookColor
        }}
      >
        <div
          className="inner"
          style={{
            width: "32px",
            height: "12px",
            position: "relative",
            transformOrigin: "2px 2px",
            transform: "rotateZ(-90deg)",
            animation: "book 6.8s ease infinite"
          }}
        >
          <div
            className="left"
            style={{
              width: "60px",
              height: "4px",
              top: 0,
              borderRadius: "2px",
              background: bookColor,
              position: "absolute",
              right: "28px",
              transformOrigin: "58px 2px",
              transform: "rotateZ(90deg)",
              animation: "left 6.8s ease infinite"
            }}
          >
            <div style={{
              width: "48px",
              height: "4px",
              borderRadius: "2px",
              background: bookColor,
              position: "absolute",
              top: "-10px",
              left: "6px"
            }} />
          </div>

          <div
            className="right"
            style={{
              width: "60px",
              height: "4px",
              top: 0,
              borderRadius: "2px",
              background: bookColor,
              position: "absolute",
              left: "28px",
              transformOrigin: "2px 2px",
              transform: "rotateZ(-90deg)",
              animation: "right 6.8s ease infinite"
            }}
          >
            <div style={{
              width: "48px",
              height: "4px",
              borderRadius: "2px",
              background: bookColor,
              position: "absolute",
              top: "-10px",
              left: "6px"
            }} />
          </div>

          <div
            className="middle"
            style={{
              width: "32px",
              height: "12px",
              border: `4px solid ${bookColor}`,
              borderTop: 0,
              borderRadius: "0 0 9px 9px",
              transform: "translateY(2px)"
            }}
          />
        </div>

        <ul style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          position: "absolute",
          left: "50%",
          top: 0
        }}>
          {pages}
        </ul>
      </div>
    </div>
  );
};

export default Preloader;
